import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { FaTrash, FaShoppingCart } from 'react-icons/fa'

function Cart() {
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useContext(CartContext)

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const handleQuantityChange = (bookId, newQuantity) => {
    if (newQuantity > 0) {
      updateCartQuantity(bookId, newQuantity)
    }
  }

  if (cart.length === 0) {
    return (
      <Container className="py-5 text-center">
        <FaShoppingCart size={64} className="text-muted mb-3" />
        <h2>Your cart is empty</h2>
        <p className="text-muted mb-4">Start shopping to add items to your cart</p>
        <Button as={Link} to="/books" variant="primary">
          Browse Books
        </Button>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Shopping Cart</h1>
        <Button variant="outline-danger" size="sm" onClick={clearCart}>
          Clear Cart
        </Button>
      </div>

      <Row>
        <Col lg={8} className="mb-4">
          {cart.map(item => (
            <Card key={item.id} className="mb-3">
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={2}>
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="img-fluid rounded"
                    />
                  </Col>
                  <Col md={4}>
                    <h5>{item.title}</h5>
                    <p className="text-muted mb-0">by {item.author}</p>
                  </Col>
                  <Col md={2}>
                    <p className="mb-0 text-primary fw-bold">${item.price.toFixed(2)}</p>
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      type="number"
                      min="1"
                      max={item.stock}
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    />
                  </Col>
                  <Col md={2} className="text-end">
                    <p className="mb-2 fw-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Col>

        <Col lg={4}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>$5.00</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax (10%):</span>
                <span>${(calculateTotal() * 0.1).toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong className="text-primary">
                  ${(calculateTotal() + 5 + (calculateTotal() * 0.1)).toFixed(2)}
                </strong>
              </div>
              <Button 
                as={Link} 
                to="/checkout" 
                variant="primary" 
                className="w-100 mb-2"
              >
                Proceed to Checkout
              </Button>
              <Button 
                as={Link} 
                to="/books" 
                variant="outline-primary" 
                className="w-100"
              >
                Continue Shopping
              </Button>
            </Card.Body>
          </Card>

          <Alert variant="info" className="mt-3">
            <strong>Free Shipping</strong> on orders over $50!
          </Alert>
        </Col>
      </Row>
    </Container>
  )
}

export default Cart



