from django.shortcuts import render
import requests
from .forms import TextFieldForm


def index(request):
    if request.method == "POST":
#        form = TextFieldForm(request.POST)
        pass
    else:
        form = TextFieldForm()
        return render(request, 'index.html', {'form': form})


KEY = "trnsl.1.1.20180323T190702Z.6f17dac41b4158a7.b49e8ad2094d112c0005087f1553da919ceec82b"

lang_list = "en,de,sv,az,sq,ba,be,bg,bs,cy,hu,nl,el,da,ga,is,es,lv,lt,et,cs,hr,fr,fi,uk,tr,sl,sr,sk,ru,ro,pt,pl,no,it"

text = input('Enter text for translation ')

def detect_lang(text):
    URL = "https://translate.yandex.net/api/v1.5/tr.json/detect?key={KEY}&text={text}&hint={lang_list}&format=plain"
    lang_detection = URL.format(KEY=KEY, text=text, lang_list=lang_list)
#    print(lang_detection)
    result = requests.get(lang_detection)
    print(result.text)
    if result.status_code == 200:
        print(result.json())
        return result.json().get("lang")
    else:
        print("Out of service!")


result_lang = detect_lang(text)
print(result_lang)


def translate(source_lang, target_lang, text):
    URL = "https://translate.yandex.net/api/v1.5/tr.json/translate?key={KEY}&text={text}&lang={source_lang}-{target_lang}&format=plain"
    translation = URL.format(KEY=KEY, text=text, source_lang=source_lang, target_lang=target_lang)
    print(translation)
    result = requests.get(translation)
    print(result.text)
    if result.status_code == 200:
        return result.json()


result_text = translate(result_lang, "ru", text)
print(result_text)