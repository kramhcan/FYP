# using flask_restful
from flask import Flask, jsonify, request
from flask_restful import Resource, Api
import joblib
  
# creating the flask app
app = Flask(__name__)
# creating an API object
api = Api(app)

model_directory = '../Jupyrter/my_model.pkl'
def load_model():
    model = joblib.load(model_directory)
    return model
  
@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        data = request.json
        print(data)
        return data

@app.route('/test', methods=['GET'])
def test():
    return jsonify({'test': 'test'})

@app.route('/', methods=['GET'])
def index():
    return jsonify({'default': 'Hello World!'})
  
# driver function
if __name__ == '__main__':
    app.run(debug = True)