from flask import Flask
from tensorflow.keras.models import load_model



app = Flask(__name__)

MODEL_PATH = '../Heart_disease_prediction.h5'
model = load_model(MODEL_PATH)

@app.route('/predict', methods=['POST'])
def predict():
    # Data
    pass

if __name__ == '__main__':
    app.run(debug=True)