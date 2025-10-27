"""
Review Service - Microservice for handling book reviews and ratings
Author: Bookstore Microservices Architecture
Description: Manages customer reviews with RabbitMQ notifications
"""

from flask import Flask, jsonify
from flask_cors import CORS
from config.config import Config
from routes.review_routes import review_bp
from routes.health_routes import health_bp
from events.review_producer import ReviewProducer
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def create_app():
    """Application factory pattern"""
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Enable CORS for all routes
    CORS(app, resources={
        r"/api/*": {
            "origins": "*",
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })
    
    # Register blueprints
    app.register_blueprint(health_bp, url_prefix='/api/health')
    app.register_blueprint(review_bp, url_prefix='/api/reviews')
    
    logger.info(f"Review Service started on port {app.config['PORT']}")
    
    return app

app = create_app()

if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=app.config['PORT'],
        debug=app.config['DEBUG']
    )



