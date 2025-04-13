from flask import Flask, jsonify, request, render_template
import python.functions as functions
import os
from pydub import AudioSegment
import speech_recognition as sr
from werkzeug.utils import secure_filename
from pydub import AudioSegment
from gtts import gTTS
import tempfile
import uuid

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
    
# Главная страница
@app.route('/')
def index():
    return render_template('index.html')

# API для вызова Python функции
@app.route('/api/g4f_query', methods=['POST'])
def g4f_query():
    try:
        # Получаем запрос от клиента
        data = request.get_json()
        user_input = data.get('prompt', '')
        print(data)
        print("user input:")
        print(user_input)
        # Передаем запрос в g4f
        model_type = functions.determine_model(user_input)
        response = ""
        if model_type == "1":
            response = functions.process_user_request_text_answer(user_input)
            return jsonify({"model": "text", "response": response})
        if model_type == "2":
            eng_user_input = functions.translate_user_request_to_english(user_input)
            print(f"Translated to english user input: {eng_user_input}")
            url = functions.process_user_request_image_answer(eng_user_input)
            print("Generated image URL: {url}")
            return jsonify({"model": "image", "response": url})
        if model_type == "3":
            print("Audio answer...")
            audio_url = functions.process_user_request_audio_answer(user_input)
            print(audio_url)
            return jsonify({"model": "audio", "response": f"{audio_url}"})
        if model_type == "4":
            print("Diagram...")
            diagram_code = functions.generate_diagram_code(user_input)
            return jsonify({"model": "diagram", "response": diagram_code})
        return jsonify({"response": "Error occured. Try again!"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/audio_query", methods=["POST"])
def handle_audio():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file uploaded'}), 400

    file = request.files['audio']
    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)

    # Преобразование в WAV
    wav_path = file_path + ".wav"
    audio = AudioSegment.from_file(file_path)
    audio.export(wav_path, format="wav")

    recognizer = sr.Recognizer()
    try:
        with sr.AudioFile(wav_path) as source:
            audio_data = recognizer.record(source)
            text = recognizer.recognize_google(audio_data, language="ru-RU")
    except sr.UnknownValueError:
        return jsonify({'error': 'Speech was unintelligible'}), 400
    except sr.RequestError as e:
        return jsonify({'error': f'Service error: {str(e)}'}), 500
    finally:
        os.remove(file_path)
        os.remove(wav_path)

    return jsonify({'text': text})

if __name__ == '__main__':
    app.run(debug=True)
