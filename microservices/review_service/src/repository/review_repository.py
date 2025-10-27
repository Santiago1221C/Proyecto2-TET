"""
Review Repository - Data Access Layer
Handles MongoDB operations for reviews
"""
from pymongo import MongoClient
from datetime import datetime
import logging
from config.config import Config

logger = logging.getLogger(__name__)

class ReviewRepository:
    def __init__(self):
        """Initialize MongoDB connection"""
        self.config = Config()
        try:
            self.client = MongoClient(self.config.MONGO_URI)
            self.db = self.client[self.config.MONGO_DB]
            self.reviews = self.db.reviews
            
            # Create indexes
            self.reviews.create_index('review_id', unique=True)
            self.reviews.create_index('book_id')
            self.reviews.create_index('user_id')
            self.reviews.create_index('rating')
            self.reviews.create_index([('book_id', 1), ('user_id', 1)])
            
            logger.info("MongoDB connection established for Review Service")
        except Exception as e:
            logger.error(f"Error connecting to MongoDB: {str(e)}")
            raise
    
    def create_review(self, review_data):
        """Create a new review"""
        try:
            result = self.reviews.insert_one(review_data)
            logger.info(f"Review created with ID: {review_data['review_id']}")
            return str(result.inserted_id)
        except Exception as e:
            logger.error(f"Error creating review: {str(e)}")
            raise
    
    def get_review_by_id(self, review_id):
        """Get review by review_id"""
        try:
            return self.reviews.find_one({'review_id': review_id, 'status': 'active'})
        except Exception as e:
            logger.error(f"Error getting review: {str(e)}")
            return None
    
    def get_reviews_by_book(self, book_id, limit=50, skip=0):
        """Get all reviews for a book"""
        try:
            return list(
                self.reviews.find({'book_id': book_id, 'status': 'active'})
                .sort('created_at', -1)
                .skip(skip)
                .limit(limit)
            )
        except Exception as e:
            logger.error(f"Error getting book reviews: {str(e)}")
            return []
    
    def get_reviews_by_user(self, user_id, limit=50, skip=0):
        """Get all reviews by a user"""
        try:
            return list(
                self.reviews.find({'user_id': user_id, 'status': 'active'})
                .sort('created_at', -1)
                .skip(skip)
                .limit(limit)
            )
        except Exception as e:
            logger.error(f"Error getting user reviews: {str(e)}")
            return []
    
    def get_user_review_for_book(self, user_id, book_id):
        """Check if user already reviewed a book"""
        try:
            return self.reviews.find_one({
                'user_id': user_id,
                'book_id': book_id,
                'status': 'active'
            })
        except Exception as e:
            logger.error(f"Error checking user review: {str(e)}")
            return None
    
    def update_review(self, review_id, update_data):
        """Update a review"""
        try:
            update_data['updated_at'] = datetime.utcnow()
            result = self.reviews.update_one(
                {'review_id': review_id},
                {'$set': update_data}
            )
            logger.info(f"Review {review_id} updated")
            return result.modified_count > 0
        except Exception as e:
            logger.error(f"Error updating review: {str(e)}")
            return False
    
    def delete_review(self, review_id):
        """Soft delete a review"""
        try:
            result = self.reviews.update_one(
                {'review_id': review_id},
                {
                    '$set': {
                        'status': 'deleted',
                        'updated_at': datetime.utcnow()
                    }
                }
            )
            logger.info(f"Review {review_id} deleted")
            return result.modified_count > 0
        except Exception as e:
            logger.error(f"Error deleting review: {str(e)}")
            return False
    
    def increment_helpful_count(self, review_id):
        """Increment helpful count"""
        try:
            result = self.reviews.update_one(
                {'review_id': review_id},
                {
                    '$inc': {'helpful_count': 1},
                    '$set': {'updated_at': datetime.utcnow()}
                }
            )
            return result.modified_count > 0
        except Exception as e:
            logger.error(f"Error incrementing helpful count: {str(e)}")
            return False
    
    def get_book_rating_stats(self, book_id):
        """Get rating statistics for a book"""
        try:
            pipeline = [
                {'$match': {'book_id': book_id, 'status': 'active'}},
                {
                    '$group': {
                        '_id': '$book_id',
                        'average_rating': {'$avg': '$rating'},
                        'total_reviews': {'$sum': 1},
                        'rating_distribution': {
                            '$push': '$rating'
                        }
                    }
                }
            ]
            
            result = list(self.reviews.aggregate(pipeline))
            if result:
                stats = result[0]
                
                # Calculate rating distribution
                distribution = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
                for rating in stats.get('rating_distribution', []):
                    distribution[rating] = distribution.get(rating, 0) + 1
                
                return {
                    'book_id': book_id,
                    'average_rating': round(stats.get('average_rating', 0), 2),
                    'total_reviews': stats.get('total_reviews', 0),
                    'rating_distribution': distribution
                }
            
            return {
                'book_id': book_id,
                'average_rating': 0,
                'total_reviews': 0,
                'rating_distribution': {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
            }
            
        except Exception as e:
            logger.error(f"Error getting rating stats: {str(e)}")
            return None



