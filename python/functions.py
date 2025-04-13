# other_folder/python_functions.py
import g4f
from g4f.client import Client
import os
from pydub import AudioSegment
import speech_recognition as sr
from werkzeug.utils import secure_filename
from pydub import AudioSegment
from gtts import gTTS
import tempfile
import uuid

def determine_model(prompt):
    # Используем g4f для отправки запроса
    query = "Что пользователь ожидает увидеть, если он отправляет запрос:\n" \
        + prompt + "\n1. Текст/код (любой ответ в текстовом виде)"\
        + "\n2.	Изображение/Рисунок/Картинку и так далее." \
        + "\n3. Аудиозапись/Аудиофайл/Аудиосообщение/Озвучку чего-либо/Какой-либо звук и так далее" \
        + "\n4. Диаграмму"\
        + "\nВыдай ответ в формате «1» или «2» или «3» или «4» без кавычек, который соответствует номеру одного из указанных вариантов."
    response = g4f.ChatCompletion.create(
        model="gpt-4o-mini", 
        messages=[{"role": "user", "content": query}]
    )
    ans = ""
    for message in response:
        ans += message
    return ans 

def process_user_request_text_answer(prompt):
    # Используем g4f для отправки запроса
    response = g4f.ChatCompletion.create(
        model="gpt-4o-mini", 
        messages=[{"role": "user", "content": prompt}]
    )
    ans = ""
    for message in response:
        ans += message
    return ans 

def translate_user_request_to_english(prompt):
    prompt = "Я отправлю тебе текст. Переведи его на английский язык. В качестве ответа\
          верни только переведённую часть этого текста.\nВот текст:\n" + prompt 
    response = response = g4f.ChatCompletion.create(
        model="gpt-4o-mini", 
        messages=[{"role": "user", "content": prompt}]
    )
    ans = ""
    for message in response:
        ans += message
    return ans 

def process_user_request_image_answer(userPrompt):
    # Используем g4f для отправки запроса
    client = Client()
    response = client.images.generate(
        model="midjourney", 
        prompt=userPrompt,
        response_format="url"
    )
    image_url = response.data[0].url
    return image_url

def process_user_request_audio_answer(prompt):
    prompt = "Какой текст ответит на этот запрос?\n Вот запрос (Мне нужен только текст!!! Даже если в запросе хотят звук, не пиши, что ты не можешь дать звук, дай текст, отвечающий на него): " + prompt + \
        "\nВ качестве ответа верни только полный текст, или хотя бы часть, если не можешь весь, который пользователь ожидает увидеть, отвечающий на предоставленный мною запрос. Не надо писать ничего лишнего"
    response = process_user_request_text_answer(prompt)
    tts = gTTS(response, lang='ru')
    filename = f"{uuid.uuid4().hex}.mp3"
    static_audio_path = os.path.join("static", "generated", filename)
    tts.save(static_audio_path)
    return f"/static/generated/{filename}"

def generate_diagram_code(prompt):
    prompt = "Напиши код на MERMAID для диаграммы, удовлетворяющей запросу: " + prompt \
        + "В качестве ответа верни только код. Ничего лишнего."
    response = process_user_request_text_answer(prompt)
    return response