from flask import Flask, jsonify, request, render_template
from python import functions

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
        response = functions.process_user_request(user_input)

        # Возвращаем ответ как JSON
        return jsonify({"response": response})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
