# Import fastapi and relevent dependencies
from fastapi import FastAPI
from fastapi.params import Body
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import pandas as pd
# from scrape import getText
from pydantic import BaseModel
from fastapi import UploadFile, File
from upload import save_upload_file_tmp, handler
from preprocess import create_tfidf_features, calculate_similarity, show_similar_documents, preprocess

# Import standard libraries
import os

# Import MongodDB and relvent dependencies
from pymongo import MongoClient

# import packages
import nltk
# from summarizer import Summarizer

# Import from related files
from search import preprocessData

# from transcription import get_large_audio_transcription, audio_extract


os.environ["MKL_NUM_THREADS"] = "8"
os.environ["NUMEXPR_NUM_THREADS"] = "8"
os.environ["OMP_NUM_THREADS"] = "8"

client = MongoClient("mongodb://magnifio_dbaUser:xyz123@52.90.163.49:27017")
db = client["upload_files"]
files = db["files"]
cache = db["cache"]


app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# model = Summarizer()


# def textToSum(text):
#     sentCount = model.calculate_optimal_k(text, k_max=10)
#     result = model(text, ratio=0.3, num_sentences=sentCount)
#     return {"data": result, "length": len(result)}


def sort_search(list_of_tuples):  # sort the list by the similarity index of each tuple
    list_of_tuples.sort(
        key=lambda x: x[1], reverse=True
    )  # earse the "reverse" part to sort in small to big.
    return list_of_tuples


def most_common_words(words, n):
    return nltk.FreqDist(words).most_common(n)


class Payload(BaseModel):
    url: str = ""
    
class Key(BaseModel):
    company: str
    topics: list


@app.get("/")
def home():
    return "FastApi Backend!"


# @app.post("/")
# def read_root(url: Payload):
#     print(url)
#     text = getText(str(url.url))
#     return textToSum(text)

@app.post('/uploadText', status_code=200)
async def create_upload_file(file: UploadFile = File(...), company: str = Body(...)):

    tmp_path = save_upload_file_tmp(file)
    print(tmp_path)
    data = handler(tmp_path, company)  # Do something with the saved temp file
    if not data:
        return{"message": "failed"}
    return data

@app.post("/answer")
def answerQuestions(question: str = Body(...), company: str = Body(...)):

    # text = preprocessData(question)
    # Extract the most common words TODO: Change algorithm to extract topics instead of phrases
    topics = question.split(" ")
    
    search_results = []
    for topic in topics:
        data = cache.find_one({"keyword": topic})
        if data:
            search_results.extend(
                [
                    (
                        data["search_results"][i]["body"],
                        data["search_results"][i]["similarity_index"],
                    )
                    for i in data["search_results"]
                ]
            )

    search_results = sort_search(search_results)

    return {"message": "success", "body": search_results}


@app.post("/retrieve")
def retrieve(company: str = Body(...), keyword: str = Body(...)):
    data = files.find({"company": company}, {"meta": 1, "_id": 0})

    return {
        "body": list(data)
    }

@app.post('/common')
def read(body: Key):
    output = files.find({"company": body.company})
    df = pd.DataFrame(list(output))
    data = [preprocess(title, content) for title, content in zip([""]*len(df["text"]), df['text'])]
    X,v = create_tfidf_features(data,df)
    
    for topic in body.topics:
        print(topic[0])
        user_question = [topic[0]]
        sim_vecs, cosine_similarities = calculate_similarity(X,v, user_question)
        output = show_similar_documents(data, cosine_similarities, sim_vecs)
        newDict={
            "company":body.company,
            "keyword":topic[0],
            "search_results":output
            }
        cache.insert_one(newDict)
    print("cache done")
    return {"message":"success"}
# @app.route("/uploadAudio",methods=["GET","POST"])
# def uploadAudio():
#     if request.method == "POST":
#         link = request.get_json()
#         path = (link['path'])
#         text = get_large_audio_transcription(path)
#         print(text)
#         return 201

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=80)
