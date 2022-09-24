import time					
import moviepy.editor as mp
import librosa
from mutagen.wave import WAVE
from multiprocessing.pool import ThreadPool as Pool
pool_size = 8
pool = Pool(pool_size)
import speech_recognition as sr 
import os 
from pydub import AudioSegment
from pydub.silence import split_on_silence
import moviepy.editor as mp

# create a speech recognition object
r = sr.Recognizer()

texts =[0 for i in range(7300)]
length_audio_chunks=[0 for i in range(7300)]

# to convert video to audio   
def audio_extract(video_file,audio_file):
    my_clip = mp.VideoFileClip(str(video_file))
    my_clip.audio.write_audiofile(audio_file)
    #print("Converted to audio")

# function that finds the length of audio chunk
def length(chunk_filename,i):
    
    length_audio_chunks[i]=WAVE(chunk_filename).info.length
    
    return 

#function that prints whole text along with timestamps of audio chunk
def printing_whole_text(i):
    newText=""
    newDict = {}
    var=0
    for j in range(1,i+1):
        newDict[var]=texts[j]
        newText+=(" {}".format(texts[j]))
        # print(var,"::",texts[j])
        var+=length_audio_chunks[j]
    return newDict,newText
    


# a function that splits the audio file into chunks
# and applies speech recognition
def asyncException(audio_listened,chunk_filename,i):
    try:
        text = r.recognize_google(audio_listened)
    except sr.UnknownValueError as e:
        print("Error:", str(e))
    else:
        text = f"{text.capitalize()}. "
        texts[i]=text
        #for finding length of chunk
        length(chunk_filename,i)
        
        

def get_large_audio_transcription(path):
    """
    Splitting the large audio file into chunks
    and apply speech recognition on each of these chunks
    """
    
    # open the audio file using pydub
    sound = AudioSegment.from_wav(path)  
    # split audio sound where silence is 700 miliseconds or more and get chunks
    chunks = split_on_silence(sound,
        # experiment with this value for your target audio file
        min_silence_len = 500,
        # adjust this per requirement
        silence_thresh = sound.dBFS-14,
        # keep the silence for 1 second, adjustable as well
        keep_silence=500,
    )
    folder_name = "audio-chunks"
    # create a directory to store the audio chunks
    if not os.path.isdir(folder_name):
        os.mkdir(folder_name)
    
    # process each chunk 
    for i, audio_chunk in enumerate(chunks, start=1):
        # export audio chunk and save it in
        # the `folder_name` directory.
        
        chunk_filename = os.path.join(folder_name, f"chunk{i}.wav")
        audio_chunk.export(chunk_filename, format="wav")
        # recognize the chunk
        with sr.AudioFile(chunk_filename) as source:
            audio_listened = r.record(source)
            # try converting it to text
            
            pool.apply_async(asyncException, (audio_listened,chunk_filename,i))
    # return the text for all chunks detected
    pool.close()
    pool.join()
    #for printing the whole text along with timestamp

    
    return printing_whole_text(i)
    