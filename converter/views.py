from django.shortcuts import render, get_object_or_404
from django.utils.http import urlquote
import requests
from .forms import TextFieldForm
from django.http import JsonResponse
from .models import Post
from django.utils import timezone
import random
from yandex import Translater
import urllib
from urllib.parse import urlparse


KEY = "trnsl.1.1.20180323T190702Z.6f17dac41b4158a7.b49e8ad2094d112c0005087f1553da919ceec82b"

lang_list = "en,de,sv,az,sq,af,ba,be,bg,bs,cy,hu,nl,el,da,ga,is,es,lv,lt,et,cs,hr,fr,fi,uk,tr,sl,sr,sk,ro,pt,pl,no,it,ru,en"


def detect_lang(text):
    URL = "https://translate.yandex.net/api/v1.5/tr.json/detect?key={KEY}&text={text}&hint={lang_list}&format=plain"
    lang_detection = URL.format(KEY=KEY, text=text, lang_list=lang_list)
#    print(lang_detection)
    result = requests.get(lang_detection)
#    print(result.text)
    if result.status_code == 200:
#        print(result.json())
        return result.json().get("lang")
    else:
        print("Out of service!")


def translate(source_lang, target_lang, text):
    URL = "https://translate.yandex.net/api/v1.5/tr.json/translate?key={KEY}&text={text}&lang={source_lang}-{target_lang}&format=plain"
    translation = URL.format(KEY=KEY, text=text, source_lang=source_lang, target_lang=target_lang)
#    print(translation)
    result = requests.get(translation)
#    print(result.text)
    if result.status_code == 200:
        return result.json()


def index(request):
    if request.method == "POST":
        text = request.POST["text"]
        result_lang = detect_lang(text)
        print(result_lang)
        result_text = translate(result_lang, "ru", text)
        print(result_text)
        print(result_text.get("text")[0])
        return render(request, "converter/index.html", {"text": result_text.get("text")[0]})
    else:
        form = TextFieldForm()
        return render(request, "converter/index.html", {})


def api(request):
    source_text = request.GET.get('text')
    source_lang = request.GET.get('source_lang', 'en')
    target_lang = request.GET.get('target_lang', 'ru')
    result_text = translate(source_lang, target_lang, source_text)
    print(result_text.get("text")[0])
    return JsonResponse({"status": "okey", "answer": result_text.get('text')[0], "target_lang": target_lang})


def post_list(request):
    posts = Post.objects.filter(published_date__lte=timezone.now()).order_by('published_date')
    return render(request, 'converter/post_list.html', {'posts': posts})

def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    return render(request, 'converter/post_detail.html', {'post': post})


languages = lang_list.split(',')

for x in range(1, len(languages)):
    source_lang = languages[x]
    target_lang = languages[x-1]
#    print(languages[x-1:x+1])


def bad_translator(request):
    if request.method == "POST":
        text = request.POST["text"]
        for x, lang in enumerate(languages):
        #    print(x, '-->', lang)
            source_lang = languages[x]
            target_lang = random.choice(languages)
        #    print(target_lang)
            try:
                new_result = translate(source_lang, target_lang, result_text.get("text")[0])
        #        print(new_result)
                print(new_result.get("text")[0])
            except UnicodeEncodeError:
                print("Sorry! Translation to this language cannot be performed")
                continue
        return render(request, "converter/bad_translator.html", {'form':form})
    else:
        form = TextFieldForm()
        return render(request, "converter/bad_translator.html", {})


def bad(request):
    source_text = request.GET.get('text')
    source_lang = request.GET.get('source_lang', 'en')
    target_lang = request.GET.get('target_lang', 'ru')
    result_text = translate(source_lang, target_lang, source_text)
    print(result_text.get("text")[0])
    return JsonResponse({"status": "okey", "answer": result_text.get('text')[0], "target_lang": target_lang})


