from flask import Flask, jsonify, request
from flask_restful import Api
import numpy as np
import predictor
  
# creating the flask app
app = Flask(__name__)
# creating an API object
api = Api(app)

model_path = '../Jupyter/my_model.pkl'

@app.route('/predict', methods=['POST'])
def predict():
    print(request.json)
    if request.method == 'POST':
        data = request.json
        values = list(data.values())
        input_data = np.array(values)
        result = predictor.predict(input_data, model_path)
        return jsonify(result.tolist())   

@app.route('/test', methods=['GET'])
def test():
    return jsonify({'test': 'test'})

@app.route('/', methods=['GET'])
def index():
    return jsonify({'default': 'Hello World!'})
  
# driver function
if __name__ == '__main__':
    app.run(debug = True)
