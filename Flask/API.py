import os
import joblib
from flask import Flask, render_template, request, jsonify
#from tensorflow import keras
import tensorflow as tf
import xgboost as xgb
import numpy as np




# Load Scaled and  Trained model
#current_dir = os.path.dirname(os.path.realpath(__file__))
#scaler_path = os.path.join(current_dir, '..','Machine_learning_prediction','Models','scaler_model.save')
#model_path = os.path.join(current_dir, '..','Machine_learning_prediction','Models','Heart_Disease_Pred.h5')

#scaler = joblib.load(scaler_path)
#model = tf.keras.models.load_model(model_path)



#def predict_heart_disease(model, new_data):
#    prediction = model.predict(new_data)
#    return prediction.tolist()




app = Flask(__name__)

############ now to use xgboost model

current_dir = os.path.dirname(os.path.realpath(__file__))
model_path = os.path.join(current_dir, '..','Machine_learning_prediction','Models','xgboost_best_model.model')

xgboost_model = xgb.Booster()
xgboost_model.load_model(model_path)







@app.route('/')
def home():
    return render_template('dashboard.html')




@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Extract JSON data from POST request (Array data)
        data = request.get_json()

        # Ensure data is in the correct format as a 2-D array
        if not isinstance(data, list) or not all(isinstance(row, list) for row in data):
            raise ValueError("Input data must be a list of lists.")
        
        # Convert data to DMatrix object (XGBoost format)
        data_dmatrix = xgb.DMatrix(data)

        # Check the shape of the data
        #if data.shape[1] != 16: 
        #    raise ValueError("Each data sample should contain 16 features.")
        
        
        # Scale input data
        #new_data_scaled = scaler.transform(data)

        # Make a prediction
        #data_prediction = predict_heart_disease(model, new_data_scaled)
        data_prediction = xgboost_model.predict(data_dmatrix)



        # Convert the prediction to a useful format
        #response = {
       #     'prediction': data_prediction.tolist()
        #}
        response = {'prediction': data_prediction.tolist()}


        
        # Return the response as JSON
        #return jsonify({'prediction': data_prediction}), 200
        return jsonify(response), 200
    except ValueError as ve:
        return jsonify({'error': 'ValueError: ' + str(ve)}), 400
    except Exception as e:
        return jsonify({'error': 'Exception: ' + str(e)}), 500

if __name__ == '__main__':
    app.run(debug=False)  # Set debug to False for production