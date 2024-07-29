import pandas as pd
import numpy as np
import joblib

# Load models
scaler = joblib.load('AI Models/scaler.pkl')
kmeans = joblib.load('AI Models/kmeans.pkl')
gbr_model = joblib.load('AI Models/gbr_model.pkl')

def get_prediction(input_data):
    print("Received input data:", input_data)
    
    # Convert input_data dictionary to DataFrame
    new_data = pd.DataFrame(input_data)
    print("DataFrame:", new_data)

    new_data[['age', 'bmi']] = scaler.transform(new_data[['age', 'bmi']])
    new_data['cluster'] = kmeans.predict(new_data)

    prediction = gbr_model.predict(new_data)
    prediction = np.exp(prediction) 
    
    print("Prediction:", prediction)
    
    return prediction.tolist()
