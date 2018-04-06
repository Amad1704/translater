from django import forms
from .models import TextField

class TextFieldForm(forms.ModelForm):

    class Meta:
        model = TextField
        fields = ('text',)