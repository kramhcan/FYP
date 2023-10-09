import joblib
from sklearn import preprocessing
import numpy as np
import json

##Standard Scores for the feature
def standardize_age(age):
    return ((age - 54.542088) / 9.049736)
def standardize_trestbps(trestbps):
    return ((trestbps - 131.693603) / 17.762806)
def standardize_oldpeak(oldpeak):
    return ((oldpeak - 1.055556) / 1.166123)
def standardize_thalach(thalach):
    return ((thalach - 149.599237) / 22.941562)

def load_model(model_path):
    model = joblib.load(model_path)
    return model

def input_data_scaling(input_data):
    # Assuming your model takes a numpy array as input
    input_data = np.array(input_data)
    input_data[0]=standardize_age(input_data[0])
    input_data[8]=standardize_oldpeak(input_data[8])
    input_data[14]=standardize_thalach(input_data[14])
    # input_data[12]=standardize_trestbps(input_data[12])
    return input_data

def predict(model_path, input_data):
    # Assuming your model takes a numpy array as input
    model = load_model(model_path)
    input_data = input_data_scaling(input_data)
    input_data = input_data.reshape(1, -1)
    prediction = model.predict(input_data)
    return prediction.tolist()

# prediction_json = '{"age": 43,"ca_0": 0,"ca_1": 1,"ca_2": 0,"cp_1": 0,"cp_2": 1,"cp_3": 0,"exang": 0,"oldpeak": 1.9,"sex": 1,"slope_0": 0,"slope_1": 0,"thal_0": 0,"thal_2": 0,"thalach": 162}'

# values = list(json.loads(prediction_json).values())
# input_data = np.array(values)

# print(input_data)

# prediction = predict('../Jupyter/my_model.pkl', input_data)
# print(prediction)