import speech_recognition as sr
from os import path
from pydub import AudioSegment
import sys


print("File Url of Audio file module : ")
# fileUrl = sys.argv[1]

# convert mp3 file to wav
sound = AudioSegment.from_mp3(
    "D:\\projects\\SpreechToTextPOC\\server\\uploads\\1hUpug0BkDHTb9M6yEibkAjg.mp3")
sound.export(
    "D:\\projects\\SpreechToTextPOC\\server\\uploads\\1hUpug0BkDHTb9M6yEibkAjg.wav", format="wav")


# # transcribe audio file
AUDIO_FILE = "D:\\projects\\SpreechToTextPOC\\server\\uploads\\8KRnOMi8HuwgxVGfrEBJRNbZ.wav"

# use the audio file as the audio source
r = sr.Recognizer()
with sr.AudioFile(AUDIO_FILE) as source:
    audio = r.record(source)  # read the entire audio file

    print("Transcription: " + r.recognize_google(audio))

# # return r.recognize_google(audio)
