import speech_recognition as sr
from os import path
from pydub import AudioSegment
import sys


fileUrl = sys.argv[1]

# convert mp3 file to wav
sound = AudioSegment.from_mp3(fileUrl)
sound.export("./uploads/file1.wav", format="wav")


# # transcribe audio file
AUDIO_FILE = "./uploads/file1.wav"

# use the audio file as the audio source
r = sr.Recognizer()
with sr.AudioFile(AUDIO_FILE) as source:
    audio = r.record(source)  # read the entire audio file

    print(r.recognize_google(audio))

# # return r.recognize_google(audio)
