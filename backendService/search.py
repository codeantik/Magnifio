import os
import re
import time
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity 
from summ import summ
from nltk.stem.porter import PorterStemmer
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
# from summarizer import Summarizer
# model = Summarizer()
### import database config 
from pymongo import MongoClient
import certifi
import ssl
### Connect to the mongoclient 
client=MongoClient()

### Connect to the right collection
db = client["upload_files"]
files = db.files

ps=PorterStemmer()
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
    text = re.sub("</?.*?>"," <> ", text)

    # remove special characters and digits
    text = re.sub("(\\d|\\W)+"," ", text).strip()
    
    text=ps.stem(text)
    
    return text

def preprocessData(text):
    #remove punctuation
    text = re.sub(r'[^\w\s]','',text)
    #remove stopwords
    stop_words = set(stopwords.words('english'))
    text = [w for w in text.split() if not w in stop_words]
    #lemmatize
    lemmatizer = WordNetLemmatizer()
    text = [lemmatizer.lemmatize(w) for w in text]
    return text

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
    cosine_similarities = cosine_similarity(X,query_vec).flatten()
    # Sort the similar documents from the most similar to less similar and return the indices
    most_similar_doc_indices = np.argsort(cosine_similarities, axis=0)[:-top_k-1:-1]
    return (most_similar_doc_indices, cosine_similarities)


def show_similar_documents(df, cosine_similarities, similar_doc_indices):
    """ Prints the most similar documents using indices in the `similar_doc_indices` vector."""
    counter = 1
    newDict={}
    for index in similar_doc_indices:
        newDict[str(counter)]={"similarity_index":cosine_similarities[index],"body":df[index]}
        counter += 1
    # print(newDict)
    return newDict
      


