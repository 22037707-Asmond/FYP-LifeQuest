from . import db

class PremiumPredictions(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    age = db.Column(db.Integer, nullable=False)
    sex = db.Column(db.Integer, nullable=False)
    bmi = db.Column(db.Float, nullable=False)
    children = db.Column(db.Integer, nullable=False)
    smoker = db.Column(db.Integer, nullable=False)
    prediction_result = db.Column(db.Text, nullable=False)

