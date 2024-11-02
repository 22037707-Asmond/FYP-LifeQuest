# PruKaya/bot/init.py
from telebot import TeleBot
from bot.config import BOT_TOKEN

telebot_bot = TeleBot(BOT_TOKEN, parse_mode=None, threaded=False)
