from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    
    # MySQL database configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:SuperPowerMelon3!@127.0.0.1:3306/lifequest'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'your_secret_key_here'
    
    # Enable CORS for all routes and allow requests from 'http://localhost:3000'
    CORS(app, resources={r"/*": {"origins": "*"}})
    
    # Initialize the database with the app
    db.init_app(app)
    
    # Initialize Flask-Migrate with the app and database
    migrate.init_app(app, db)

    # Import and register the Blueprint
    from app.routes.predict import predict_bp
    app.register_blueprint(predict_bp)

    with app.app_context():
        db.create_all()  # Create database tables if they don't exist

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
