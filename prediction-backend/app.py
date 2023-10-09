from flask import Flask, jsonify, request
from flask_restful import Api
import numpy as np
import predictor
import json
  
# creating the flask app
app = Flask(__name__)
# creating an API object
api = Api(app)

model_path = '../Jupyter/my_model.pkl'

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        try:
            # Parse the JSON input
            data = request.json
            data = json.dumps(data)
            values = list(json.loads(data).values())
            input_data = np.array(values)
            # Make the prediction
            result = predictor.predict(model_path, input_data)
        # Error Handling    
        except json.JSONDecodeError as e:
            return("Error decoding JSON: ", e)
        except Exception as e:
            return("Error: ", e) 
        # Return the result
        return jsonify({'result': result})

@app.route('/test', methods=['GET'])
def test():
    return jsonify({'test': 'test'})

@app.route('/', methods=['GET'])
def index():
    return jsonify({'default': 'Hello World!'})
  
# driver function
if __name__ == '__main__':
    app.run(debug = True)
