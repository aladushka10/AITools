# other_folder/python_functions.py
import g4f

def process_user_request(prompt):
    # Используем g4f для отправки запроса
    response = g4f.ChatCompletion.create(
        model="gpt-4o-mini",  # или "gpt-3.5-turbo", в зависимости от возможностей
        messages=[{"role": "user", "content": prompt}]
    )
    ans = ""
    #print(prompt)
    for message in response:
        #print(message, flush=True, end='')
        ans += message
    # Возвращаем ответ
    return ans

#print(process_user_request("Can you write code that will multiply 2 matrices on C++?"))

"""import g4f

prompt = 'Highest mountain in the world'

response = g4f.ChatCompletion.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": prompt}],
    stream=True
)

for message in response:
    print(message, flush=True, end='')


prompt = 'Напиши код на Python, который изображает график зменения цены биткоина'

response = g4f.ChatCompletion.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": prompt}],
    stream=True,
)

for message in response:
    print(message, flush=True, end='')
"""