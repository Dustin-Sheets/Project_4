import os
from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np


os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'





app = Flask(__name__)

# Load trained model
current_dir = os.path.dirname(os.path.realpath(__file__))

model_path = os.path.join(current_dir, '..', 'Models','Heart_Disease_Pred.h5')
model = tf.keras.models.load_model(model_path)

@app.route('/')
def home():
    return 'Welcome to the Heart Disease Prediction API!'



@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Extract JSON data from POST request (Array data)
        data = request.get_json()

        # Ensure data is in the correct format as a 2-D array
        if not isinstance(data, list) or not all(isinstance(row, list) for row in data):
            raise ValueError("Input data must be a list of lists.")
        
        # Convert data to NumPy array for compatibility with TensorFlow
        data = np.array(data)

        # Check the shape of the data
        if data.shape[1] != 16:  # Assuming the model expects 16 features
            raise ValueError("Each data sample should contain 16 features.")
        
        # Make a prediction
        prediction = model.predict(data)

        # Convert the prediction to a useful format
        response = {
            'prediction': prediction.tolist()
        }
        
        # Return the response as JSON
        return jsonify(response), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=False)  # Set debug to False for production