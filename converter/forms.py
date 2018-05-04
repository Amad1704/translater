from django import forms
from .models import TextField
from .models import Post

class TextFieldForm(forms.ModelForm):

    class Meta:
        model = TextField
        fields = ('text',)

class PostForm(forms.ModelForm):

    class Meta:
        model = Post
        fields = ('title', 'text',)