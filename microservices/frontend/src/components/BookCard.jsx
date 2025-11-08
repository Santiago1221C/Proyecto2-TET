import { Card, Button, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaStar, FaShoppingCart } from 'react-icons/fa'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

function BookCard({ book }) {
  const { addToCart } = useContext(CartContext)

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(book)
  }

  return (
    <Card className="h-100 shadow-sm hover-shadow">
      <Link to={`/books/${book.id}`} className="text-decoration-none">
        <Card.Img 
          variant="top" 
          src={book.imageUrl} 
          alt={book.title}
          style={{ height: '300px', objectFit: 'cover' }}
        />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Badge bg="secondary" className="mb-2 align-self-start">
          {book.category}
        </Badge>
        <Card.Title className="text-truncate">
          <Link to={`/books/${book.id}`} className="text-dark text-decoration-none">
            {book.title}
          </Link>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          by {book.author}
        </Card.Subtitle>
        <Card.Text className="text-truncate-2">
          {book.description}
        </Card.Text>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="h5 mb-0 text-primary">${book.price.toFixed(2)}</span>
            <div>
              <FaStar className="text-warning me-1" />
              <span>4.5</span>
            </div>
          </div>
          <div className="d-flex gap-2">
            <Button 
              as={Link} 
              to={`/books/${book.id}`} 
              variant="outline-primary" 
              size="sm"
              className="flex-grow-1"
            >
              View Details
            </Button>
            <Button 
              variant="primary" 
              size="sm"
              onClick={handleAddToCart}
            >
              <FaShoppingCart />
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default BookCard



