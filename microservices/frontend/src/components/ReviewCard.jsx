import { Card, Badge, Button } from 'react-bootstrap'
import { FaStar, FaThumbsUp } from 'react-icons/fa'
import { useState } from 'react'

function ReviewCard({ review, onMarkHelpful, onDelete, canDelete = false }) {
  const [helpful, setHelpful] = useState(false)

  const handleHelpful = () => {
    if (!helpful && onMarkHelpful) {
      onMarkHelpful(review.review_id)
      setHelpful(true)
    }
  }

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <FaStar 
        key={i} 
        className={i < rating ? 'text-warning' : 'text-muted'}
      />
    ))
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <div className="mb-1">{renderStars(review.rating)}</div>
            <Card.Title className="h6 mb-1">{review.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted small">
              {formatDate(review.created_at)}
              {review.verified_purchase && (
                <Badge bg="success" className="ms-2">Verified Purchase</Badge>
              )}
            </Card.Subtitle>
          </div>
          {canDelete && onDelete && (
            <Button 
              variant="outline-danger" 
              size="sm"
              onClick={() => onDelete(review.review_id)}
            >
              Delete
            </Button>
          )}
        </div>
        <Card.Text>{review.comment}</Card.Text>
        <div className="d-flex align-items-center gap-2">
          <Button 
            variant={helpful ? "success" : "outline-secondary"} 
            size="sm"
            onClick={handleHelpful}
            disabled={helpful}
          >
            <FaThumbsUp className="me-1" />
            Helpful {review.helpful_count > 0 && `(${review.helpful_count})`}
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ReviewCard



