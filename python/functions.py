# other_folder/python_functions.py
import g4f

def process_user_request(prompt):
    # Используем g4f для отправки запроса
    response = g4f.ChatCompletion.create(
        model="gpt-4o-mini",  # или "gpt-3.5-turbo", в зависимости от возможностей
        messages=[{"role": "user", "content": prompt}]
    )
    ans = ""
    manyStrings = True
    if isinstance(response, str): 
        manyStrings = False
    for message in response:
        ans += message
        if manyStrings:
            ans += '\n'
    # Возвращаем ответ
    return ans