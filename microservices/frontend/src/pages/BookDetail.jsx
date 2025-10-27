import { Container, Row, Col, Button, Badge, Form, Alert } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { FaStar, FaShoppingCart } from 'react-icons/fa'
import { getBookById } from '../data/booksData'
import { CartContext } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'
import ReviewCard from '../components/ReviewCard'
import reviewService from '../services/reviewService'

function BookDetail() {
  const { id } = useParams()
  const book = getBookById(id)
  const { addToCart } = useContext(CartContext)
  const { user } = useContext(AuthContext)
  const [quantity, setQuantity] = useState(1)
  const [reviews, setReviews] = useState([])
  const [ratingStats, setRatingStats] = useState(null)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    title: '',
    comment: ''
  })
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    if (book) {
      loadReviews()
      loadRatingStats()
    }
  }, [book])

  const loadReviews = async () => {
    try {
      const response = await reviewService.getBookReviews(id)
      setReviews(response.reviews || [])
    } catch (error) {
      console.error('Error loading reviews:', error)
    }
  }

  const loadRatingStats = async () => {
    try {
      const stats = await reviewService.getBookRatingStats(id)
      setRatingStats(stats)
    } catch (error) {
      console.error('Error loading rating stats:', error)
    }
  }

  const handleAddToCart = () => {
    addToCart(book, quantity)
    setAlert({ type: 'success', message: 'Book added to cart successfully!' })
    setTimeout(() => setAlert(null), 3000)
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    
    if (!user) {
      setAlert({ type: 'danger', message: 'Please login to write a review' })
      return
    }

    try {
      await reviewService.createReview({
        book_id: id,
        user_id: user.userId,
        ...reviewForm
      })
      setAlert({ type: 'success', message: 'Review submitted successfully!' })
      setShowReviewForm(false)
      setReviewForm({ rating: 5, title: '', comment: '' })
      loadReviews()
      loadRatingStats()
    } catch (error) {
      setAlert({ type: 'danger', message: 'Error submitting review. You may have already reviewed this book.' })
    }
  }

  const handleMarkHelpful = async (reviewId) => {
    try {
      await reviewService.markReviewHelpful(reviewId)
      loadReviews()
    } catch (error) {
      console.error('Error marking review as helpful:', error)
    }
  }

  if (!book) {
    return (
      <Container className="py-5">
        <Alert variant="warning">Book not found</Alert>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      {alert && (
        <Alert variant={alert.type} dismissible onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

      <Row>
        <Col md={4} className="mb-4">
          <img 
            src={book.imageUrl} 
            alt={book.title} 
            className="img-fluid rounded shadow"
          />
        </Col>
        <Col md={8}>
          <Badge bg="secondary" className="mb-2">{book.category}</Badge>
          <h1>{book.title}</h1>
          <h5 className="text-muted mb-3">by {book.author}</h5>
          
          {ratingStats && (
            <div className="mb-3">
              <div className="d-flex align-items-center">
                {Array(5).fill(0).map((_, i) => (
                  <FaStar 
                    key={i} 
                    className={i < Math.round(ratingStats.average_rating) ? 'text-warning' : 'text-muted'}
                  />
                ))}
                <span className="ms-2">
                  {ratingStats.average_rating.toFixed(1)} ({ratingStats.total_reviews} reviews)
                </span>
              </div>
            </div>
          )}

          <h3 className="text-primary mb-3">${book.price.toFixed(2)}</h3>
          
          <p className="lead">{book.description}</p>
          
          <div className="mb-4">
            <h6>Book Details:</h6>
            <ul>
              <li><strong>ISBN:</strong> {book.isbn}</li>
              <li><strong>Publisher:</strong> {book.publisher}</li>
              <li><strong>Published:</strong> {book.publishYear}</li>
              <li><strong>Pages:</strong> {book.pages}</li>
              <li><strong>Language:</strong> {book.language}</li>
              <li><strong>Stock:</strong> {book.stock} available</li>
            </ul>
          </div>

          <Row className="align-items-center mb-4">
            <Col xs={4} sm={3}>
              <Form.Control
                type="number"
                min="1"
                max={book.stock}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </Col>
            <Col xs={8} sm={9}>
              <Button 
                variant="primary" 
                size="lg" 
                onClick={handleAddToCart}
                disabled={book.stock === 0}
              >
                <FaShoppingCart className="me-2" />
                Add to Cart
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Reviews Section */}
      <Row className="mt-5">
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3>Customer Reviews</h3>
            {user && !showReviewForm && (
              <Button variant="primary" onClick={() => setShowReviewForm(true)}>
                Write a Review
              </Button>
            )}
          </div>

          {showReviewForm && (
            <Form onSubmit={handleSubmitReview} className="mb-4 p-4 border rounded">
              <h5>Write Your Review</h5>
              <Form.Group className="mb-3">
                <Form.Label>Rating</Form.Label>
                <Form.Select
                  value={reviewForm.rating}
                  onChange={(e) => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) })}
                >
                  <option value="5">5 Stars - Excellent</option>
                  <option value="4">4 Stars - Very Good</option>
                  <option value="3">3 Stars - Good</option>
                  <option value="2">2 Stars - Fair</option>
                  <option value="1">1 Star - Poor</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={reviewForm.title}
                  onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                  placeholder="Summarize your review"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Review</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  required
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  placeholder="Share your thoughts about this book"
                />
              </Form.Group>
              <div className="d-flex gap-2">
                <Button type="submit" variant="primary">Submit Review</Button>
                <Button variant="secondary" onClick={() => setShowReviewForm(false)}>
                  Cancel
                </Button>
              </div>
            </Form>
          )}

          {reviews.length > 0 ? (
            reviews.map(review => (
              <ReviewCard 
                key={review.review_id} 
                review={review}
                onMarkHelpful={handleMarkHelpful}
              />
            ))
          ) : (
            <p className="text-muted">No reviews yet. Be the first to review this book!</p>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default BookDetail



