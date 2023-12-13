import os
from flask import Flask, render_template, request, jsonify
import xgboost as xgb



app = Flask(__name__)

# Load the model
current_dir = os.path.dirname(os.path.realpath(__file__))
model_path = os.path.join(current_dir, '..','Machine_learning_prediction','Models','xgboost_best_model.model')
xgboost_model = xgb.Booster()
xgboost_model.load_model(model_path)



# Route to the home page
@app.route('/')
def home():
    return render_template('dashboard.html')



# Route executed when the user clicks the "Predict" button
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


        # Make a prediction
        data_prediction = xgboost_model.predict(data_dmatrix)


        # Convert the prediction to a useful format
        response = {'prediction': data_prediction.tolist()}


        
        # Return the response as JSON with error handling
        return jsonify(response), 200
    except ValueError as ve:
        return jsonify({'error': 'ValueError: ' + str(ve)}), 400
    except Exception as e:
        return jsonify({'error': 'Exception: ' + str(e)}), 500
    
    
# to run the app
if __name__ == '__main__':
    app.run(debug=False)  # Set debug to False for production
    
