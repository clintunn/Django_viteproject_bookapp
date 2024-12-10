from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'


# A serializer converts python objects e.g models (basically data), into json or other format for api response.
# Basically when using the django rest framework to make an api. communication is basicall done on the web through json format or objects 
# Hence the need for conversion

# A Deserializer validates and converts incoming data e.g json payloads, into python objects for further processing or saving to the database