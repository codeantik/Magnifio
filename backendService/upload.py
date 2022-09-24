from pathlib import Path
from fastapi import UploadFile
from tempfile import NamedTemporaryFile
import shutil

# from nltk.corpus import stopwords
import re
from nltk.stem import WordNetLemmatizer
import nltk
import pandas as pd
from nltk.stem.porter import PorterStemmer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np


from pymongo import MongoClient


client = MongoClient()
### Connect to the right collection
db = client["upload_files"]
files = db["files"]
cache = db.cache

stop_words = {'having', 't', 'down', 'other', 'the', 'now', 'ma', 'above', 'of', 'being', "needn't", 'with', "don't", 'him', 'out', "mustn't", 'same', 'who', "doesn't", 'hers', "didn't", "should've", 'until', 'itself', 'both', 'weren', 'in', 'has', 'will', 'had', 'during', 'wouldn', 'we', 'aren', "haven't", 'is', 've', 'which', 'few', 'them', 'shouldn', 'if', "she's", 'll', 'most', 'ain', 'into', 'than', 'over', 'been', 'after', 'doing', 'my', "you're", 'couldn', 'don', 'once', 'does', 'just', "you'll", "wasn't", 'when', 'did', 'how', "that'll", 'o', 'doesn', "you've", 'was', 'have', 'against', "couldn't", 'where', 'wasn', 'for', 'from', 'again', 'an', 'yours', 'only', 'do', 'they', 'these', 'too', 'mightn', 'nor', "weren't", 'or', 'isn',
    're', "you'd", 'its', 'some', 'own', 'her', 'your', 'be', 'whom', 'didn', "wouldn't", 'so', 'me', 'his', 'why', 'm', 'shan', 'each', 'there', 'no', 'himself', 's', 'our', 'won', 'what', 'under', 'y', 'you', 'while', 'but', 'a', 'off', 'through', 'between', 'can', "won't", 'myself', 'should', "hasn't", 'all', 'not', "shan't", 'here', 'he', 'those', 'by', "hadn't", 'hasn', 'theirs', 'up', 'to', 'before', 'any', 'haven', "aren't", 'very', 'this', 'mustn', 'such', "it's", 'are', 'd', 'on', 'their', "shouldn't", 'yourself', 'that', 'needn', 'as', "isn't", 'herself', 'themselves', 'ourselves', 'yourselves', 'about', 'further', 'she', 'were', 'at', 'i', "mightn't", 'then', 'and', 'because', 'ours', 'it', 'am', 'below', 'hadn', 'more'}

ps = PorterStemmer()
def preprocess(title, body=None):
    """ Preprocess the input, i.e. lowercase, remove html tags, special character and digits."""
    text = ''
    if body is None:
        text = title
    else:
        text = title + body
    # to lower case
    text = text.lower()

    # remove tags
    text = re.sub("</?.*?>", " <> ", text)

    # remove special characters and digits
    text = re.sub("(\\d|\\W)+", " ", text).strip()

    text = ps.stem(text)

    return text

def preprocessData(text):
    #remove punctuation
    text = re.sub(r'[^\w\s]', '', text)
    #remove stopwords
    # stop_words = set(stopwords.words('english'))
    text = [w for w in text.split() if not w in stop_words]
    #lemmatize
    lemmatizer = WordNetLemmatizer()
    text = [lemmatizer.lemmatize(w) for w in text]
    return text


def most_common_words(words, n=10):
    return nltk.FreqDist(words).most_common(n)

def readFile(fileObject, path, company):
    topics = []
    for topic in fileObject:
        if topic != "":
            newDict = {
                "text": topic,
                "meta": str(path).split("/")[-1],
                "company": company
            }
            ### Preprocess the text
            text = preprocessData(topic)
            topics.extend([i[0] for i in most_common_words(text)])

            ### Extract the most common words TODO: Change algorithm to extract topics instead of phrases

            files.insert_one(newDict)

    return topics


def create_tfidf_features(corpus, features, max_df=0.8, min_df=2):
    max_features = len(features)
    """ Creates a tf-idf matrix for the `corpus` using sklearn. """
    tfidf_vectorizor = TfidfVectorizer(decode_error='replace', strip_accents='unicode', analyzer='word',
                                       ngram_range=(1, 1), max_features=max_features,
                                       norm='l2', use_idf=True, smooth_idf=True, sublinear_tf=True,
                                       max_df=max_df, min_df=min_df)
    X = tfidf_vectorizor.fit_transform(corpus)
    # print('tfidf matrix successfully created.')
    return X, tfidf_vectorizor


def calculate_similarity(X, vectorizor, query, top_k=5):
    """ Vectorizes the `query` via `vectorizor` and calculates the cosine similarity of
    the `query` and `X` (all the documents) and returns the `top_k` similar documents."""

    # Vectorize the query to the same length as documents
    query_vec = vectorizor.transform(query)
    # Compute the cosine similarity between query_vec and all the documents
    cosine_similarities = cosine_similarity(X, query_vec).flatten()
    # Sort the similar documents from the most similar to less similar and return the indices
    most_similar_doc_indices = np.argsort(cosine_similarities, axis=0)[:-top_k-1:-1]
    return (most_similar_doc_indices, cosine_similarities)


def show_similar_documents(df, cosine_similarities, similar_doc_indices):
    """ Prints the most similar documents using indices in the `similar_doc_indices` vector."""
    counter = 1
    newDict = {}
    for index in similar_doc_indices:
        newDict[str(counter)] = {"similarity_index": cosine_similarities[index], "body": df[index]}
        counter += 1
    # print(newDict)
    return newDict


def handler(path, company):
    topics = []
    if ".csv" in str(path):
        fileObject = open(path, "r", encoding="utf-8")
        topics.extend(readFile(fileObject.readlines(), path, company))

    # elif ".pdf" in str(path):
    #     raw = parser.from_file(str(path))
    #     data = raw['content'].split("\n")
    #     topics.extend(readFile(data, path, company))
    #     # topics = Parallel(n_jobs=10)(delayed(readCSV)(i,path,company) for i in data)

    # elif ".txt" in str(path):
    #     fileObject = open(path, "r")
    #     # print(fileObject.read())
    #     topics.extend(readFile(fileObject.readlines(), path, company))

    #     # topics = Parallel(n_jobs=10)(delayed(readCSV)(i,path,company) for i in fileObject.readlines())
    # elif "docx" in str(path):
    #     my_text = docx2txt.process(path).split("\n")
    #     topics.extend(readFile(my_text, path, company))

        # topics = Parallel(n_jobs=10)(delayed(readCSV)(i,path,company) for i in my_text)
    else:
        return{"message:error"}
    topics = set(topics)
    df = pd.DataFrame(list(files.find({"company": company})))
    data = [preprocess(title, content) for title, content in zip([""]*len(df["text"]), df['text'])]
    X, v = create_tfidf_features(data, df)

    for topic in topics:
        user_question = [topic]
        sim_vecs, cosine_similarities = calculate_similarity(X, v, user_question)
        output = show_similar_documents(data, cosine_similarities, sim_vecs)
        newDict = {
            "company": company,
            "keyword": topic,
            "search_results": output
        }

        cache.insert_one(newDict)
    return{"message:success"}


def save_upload_file_tmp(upload_file: UploadFile) -> Path:
    try:
        print(upload_file.filename.split(".")[0])
        suffix = Path(upload_file.filename).suffix
        with NamedTemporaryFile(delete=False, suffix=suffix, prefix=upload_file.filename.split(".")[0]) as tmp:
            shutil.copyfileobj(upload_file.file, tmp)
            tmp_path = Path(tmp.name)
    finally:
        upload_file.file.close()
    return tmp_path
