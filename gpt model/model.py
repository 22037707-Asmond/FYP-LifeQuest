import openai
openai.api_key="sk-proj-ZhbLilhrSBD724dnXeIMT3BlbkFJ3PrjY0YOnhpteG6BrjAg"

def chat(prompt):
    response = openai.completions.create(
    model="gpt-3.5-turbo",
    prompt=prompt,
    max_tokens=100
    )
    return response.choices[0].text.strip()

while True:
    userInput = input("You: ")
    print("Bot:", chat(userInput))
