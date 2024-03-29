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
    """Predict the result from the input data"""
    if request.method == 'POST':
        try:
            # Parse the JSON input
            data = request.json
            print("Request ::: ", data)
            data = json.dumps(data)
            values = list(json.loads(data).values())
            input_data = np.array(values)
            # Make the prediction
            result = predictor.predict(model_path, input_data)
        # Error Handling    
        except json.JSONDecodeError as e:
            print(f"Exception: {e}")
            error_response = jsonify({'error': 'Internal Server Error'})
            error_response.status_code = 500
            return error_response
        except Exception as e:
            print(f"Exception: {e}")
            error_response = jsonify({'error': 'Internal Server Error'})
            error_response.status_code = 500
            return error_response
        # Return the result
        return jsonify(result)

# Default route
@app.errorhandler(404)
def handle_404(e):
    """ Default 404 route handler """
    # handle all other routes here
    return 'Not Found, but we HANDLED IT'
  
# driver function
if __name__ == '__main__':
    app.run(debug = True)
