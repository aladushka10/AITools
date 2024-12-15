from flask import Flask, jsonify, request, render_template
import python.functions as functions

app = Flask(__name__)

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
            url = functions.process_user_request_image_answer(user_input)
            print("Generated image URL: {url}")
            return jsonify({"model": "image", "response": url})

        return jsonify({"response": "Error occured. Try again!"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
