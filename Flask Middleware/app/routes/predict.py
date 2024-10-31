from flask import request, jsonify, Blueprint
from app.controllers.prediction_controller import get_prediction
from app.models import db, PremiumPredictions
import requests
import math

predict_bp = Blueprint('predict', __name__)


@predict_bp.route('/report', methods=['POST'])
def getReport():
    API_URL = "http://localhost:3005/api/v1/prediction/83038015-e890-47bd-aabe-992a4195cb4a"
    data = request.get_json(force=True)
    
    # Assuming get_prediction returns a list, get the first element
    prediction_result = math.ceil(get_prediction(data)[0])
    monthly_premium = math.ceil(prediction_result / 12)

    prediction_result_str = str(prediction_result)
    monthly_premium_str = str(monthly_premium)
    
    data_string = f"age={data['age'][0]}, sex={data['sex'][0]}, bmi={data['bmi'][0]}, children={data['children'][0]}, smoker={data['smoker'][0]}, prediction_result={prediction_result_str}"

    def query(payload):
        response = requests.post(API_URL, json=payload)
        return response.json()
    
    output = query({"question": data_string})
    
    try:
        main_message = output['assistant']['messages'][0]['content'][0]['text']['value']
    except (KeyError, IndexError):
        return jsonify({"error": "Unexpected response format"}), 500
    
    return jsonify({"yearly": prediction_result_str, "monthly": monthly_premium_str, "message": main_message})


@predict_bp.route('/predictMonthly', methods=['POST'])
def getMonthly():
    data = request.get_json(force=True)
    prediction_result = math.ceil(get_prediction(data)[0])
    monthly_premium = math.ceil(prediction_result / 12)
    
    return jsonify({"monthly": str(monthly_premium)})
