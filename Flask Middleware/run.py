from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  
scaler = joblib.load('AI Models/scaler.pkl')
kmeans = joblib.load('AI Models/kmeans.pkl')
gbr_model = joblib.load('AI Models/gbr_model.pkl')


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)
        print("Received data:", data)
        
        new_data = pd.DataFrame(data)
        print("DataFrame:", new_data)

        new_data[['age', 'bmi']] = scaler.transform(new_data[['age', 'bmi']])
        new_data['cluster'] = kmeans.predict(new_data)

        prediction = gbr_model.predict(new_data)
        prediction = np.exp(prediction) 
        
        print("Prediction:", prediction)
        
        return jsonify({'prediction': prediction.tolist()})
    except Exception as e:
        print("Error:", e)
        return jsonify({'error': str(e)})

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)
