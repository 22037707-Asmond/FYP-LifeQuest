from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:SuperPowerMelon3!@127.0.0.1:3306/lifequest'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'your_secret_key_here'
    
    CORS(app, resources={r"/*": {"origins": "*"}})
    
    db.init_app(app)
    

    migrate.init_app(app, db)

   
    from app.routes.predict import predict_bp
    app.register_blueprint(predict_bp)

    with app.app_context():
        db.create_all()  

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
