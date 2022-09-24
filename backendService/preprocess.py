import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.stem.porter import PorterStemmer
import re

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

def create_tfidf_features(corpus, features, max_df=1.0, min_df=0.0):
    try:
        max_features = len(features)
        """ Creates a tf-idf matrix for the `corpus` using sklearn. """
        tfidf_vectorizor = TfidfVectorizer(decode_error='replace', strip_accents='unicode', analyzer='word',
                                           ngram_range=(1, 1), max_features=max_features,
                                           norm='l2', use_idf=True, smooth_idf=True, sublinear_tf=True,
                                           max_df=max_df, min_df=min_df)
        X = tfidf_vectorizor.fit_transform(corpus)
        # print('tfidf matrix successfully created.')
        return X, tfidf_vectorizor
    except:
        return create_tfidf_features(corpus, features, 0.8, 2)


def calculate_similarity(X, vectorizor, query, top_k=5):
    """ Vectorizes the `query` via `vectorizor` and calculates the cosine similarity of
    the `query` and `X` (all the documents) and returns the `top_k` similar documents."""

    # Vectorize the query to the same length as documents
    query_vec = vectorizor.transform(query)
    # Compute the cosine similarity between query_vec and all the documents
    cosine_similarities = cosine_similarity(X, query_vec).flatten()
    # Sort the similar documents from the most similar to less similar and return the indices
    most_similar_doc_indices = np.argsort(
        cosine_similarities, axis=0)[:-top_k-1:-1]
    return (most_similar_doc_indices, cosine_similarities)


def show_similar_documents(df, cosine_similarities, similar_doc_indices):
    """ Prints the most similar documents using indices in the `similar_doc_indices` vector."""
    counter = 1
    newDict = {}
    for index in similar_doc_indices:
        newDict[str(counter)] = {
            "similarity_index": cosine_similarities[index], "body": df[index]}
        counter += 1
    # print(newDict)
    return newDict
