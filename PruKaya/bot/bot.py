from bot.init import telebot_bot
from bot.handlers import insuranceHandler, agent_handler, modules_handlers
from telebot.types import InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo
from .utils.api_utils import call_openai_api



def main():
    @telebot_bot.message_handler(commands=['buyinsurance'])
    def send_welcome(message):
        web_app_url = 'https://profound-gingersnap-339331.netlify.app/' 
        markup = InlineKeyboardMarkup()
        web_app_button = InlineKeyboardButton("Shop for Microinsurance", web_app=WebAppInfo(url=web_app_url))
        markup.add(web_app_button)
        
        telebot_bot.send_message(message.chat.id, "Click the button below to start shopping for microinsurance.", reply_markup=markup)

    @telebot_bot.message_handler(func=lambda message: True)
    def handle_message(message):
        if message.text.startswith('/'):
            return  
        
        user_message = message.text
        user_id = message.chat.id 
        telebot_bot.send_chat_action(user_id, 'typing')
        
        response = call_openai_api(user_message, user_id)
        telebot_bot.send_message(user_id, response)
        
    telebot_bot.polling(none_stop=True)

if __name__ == "__main__":
    main()
