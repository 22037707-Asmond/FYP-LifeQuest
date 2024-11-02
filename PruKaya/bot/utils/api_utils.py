from dotenv import load_dotenv
import os
import requests
import re

load_dotenv()

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

user_conversations = {}  

def clean_output(text):
    cleaned_text = re.sub(r'[*#]', '', text)
    return cleaned_text.strip()

def call_openai_api(prompt, user_id):
    if not prompt:
        return "No prompt provided."
    
    if user_id not in user_conversations:
        user_conversations[user_id] = []

    user_conversations[user_id].append(f"User: {prompt}")

    try:
        API_URL = "http://localhost:3005/api/v1/prediction/f824b8ba-9e75-48d3-9944-db00683fb461"
        
        def query(payload):
            response = requests.post(API_URL, json=payload)
            response.raise_for_status()
            return response.json()
        
        conversation = "\n".join(user_conversations[user_id])  
        output = query({
            "question": conversation
        })
        
        cleaned_output = clean_output(output['text'])
        
        user_conversations[user_id].append(f"AI: {cleaned_output}")
        
        return cleaned_output

    except requests.exceptions.RequestException as e:
        return f"Error contacting Flowise API: {str(e)}"
    except Exception as e:
        return f"Error: {str(e)}"