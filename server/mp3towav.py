from pydub import AudioSegment
import sys

fileUrl = sys.argv[1]
sound = AudioSegment.from_mp3(fileUrl)
sound.export(".uploads/file.wav", format="wav")
print("file Url :", fileUrl)


sys.stdout.flush()
