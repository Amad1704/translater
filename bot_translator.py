from telegram.ext import Updater, CommandHandler, MessageHandler, Filters
import logging
import requests
from yandex import Translater


logging.basicConfig(format="%(name)s - %(levelname)s - %(message)s",
                    level=logging.INFO,
                    filename="bot.log")


KEY = "trnsl.1.1.20180323T190702Z.6f17dac41b4158a7.b49e8ad2094d112c0005087f1553da919ceec82b"

#url = "https://translate.yandex.net/api/v1.5/tr.json/translate"

lang_list = "en,de,sv,az,sq,af,ba,eu,be,bg,bs,cy,hu,nl,el,da,ga,is,es,lv,lt,et,cs,hr,fr,uk,tr,sl,sr,sk,ru,ro,pt,pl,no,it"


def detect_lang(text):
    URL = "https://translate.yandex.net/api/v1.5/tr.json/detect?key={KEY}&text={text}&hint={lang_list}&format=plain"
    lang_detection = URL.format(KEY=KEY, text=text, lang_list=lang_list)
    print(lang_detection)
    result = requests.get(lang_detection)
    print(result.text)
    if result.status_code == 200:
        print(result.json())
        return result.json().get("lang")
    else:
        print("Out of service!")


def translate(source_lang, target_lang, text):
    URL = "https://translate.yandex.net/api/v1.5/tr.json/translate?key={KEY}&text={text}&lang={source_lang}-{target_lang}&format=plain"
    translation = URL.format(KEY=KEY, text=text, source_lang=source_lang, target_lang=target_lang)
    print(translation)
    result = requests.get(translation)
    print(result.text)
    if result.status_code == 200:
        return result.json()


def translation(bot, update):
    source_text = update.message.text
    source_text = source_text.replace("/translate ", "")
    print(source_text)
    result_lang = detect_lang(source_text)
    print(result_lang)
    result_text = translate(result_lang, "ru", source_text)
    print(result_text)
    update.message.reply_text(result_text.get("text")[0])


def main():
    updater = Updater("498747935:AAHANRICU65KYR1E-tcXjpMUMqrj47whGR8")
    dp = updater.dispatcher
    dp.add_handler(CommandHandler("translate", translation))
    updater.start_polling()
    updater.idle()

main()