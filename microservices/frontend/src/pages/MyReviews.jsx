import { Container, Alert } from 'react-bootstrap'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import ReviewCard from '../components/ReviewCard'
import reviewService from '../services/reviewService'

function MyReviews() {
  const { user } = useContext(AuthContext)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    loadReviews()
  }, [])

  const loadReviews = async () => {
    try {
      const response = await reviewService.getUserReviews(user.userId)
      setReviews(response.reviews || [])
    } catch (error) {
      console.error('Error loading reviews:', error)
      setAlert({ type: 'danger', message: 'Error loading your reviews' })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return
    }

    try {
      await reviewService.deleteReview(reviewId, user.userId)
      setAlert({ type: 'success', message: 'Review deleted successfully' })
      loadReviews()
    } catch (error) {
      setAlert({ type: 'danger', message: 'Error deleting review' })
    }
  }

  if (loading) {
    return <Container className="py-5"><p>Loading...</p></Container>
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">My Reviews</h1>

      {alert && (
        <Alert variant={alert.type} dismissible onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

      {reviews.length > 0 ? (
        reviews.map(review => (
          <ReviewCard 
            key={review.review_id} 
            review={review}
            onDelete={handleDelete}
            canDelete={true}
          />
        ))
      ) : (
        <Alert variant="info">
          You haven't written any reviews yet. Start by browsing books and sharing your thoughts!
        </Alert>
      )}
    </Container>
  )
}

export default MyReviews



