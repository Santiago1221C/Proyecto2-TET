import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'
import paymentService from '../services/paymentService'

function Checkout() {
  const { cart, clearCart } = useContext(CartContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  
  const [paymentMethod, setPaymentMethod] = useState({
    card_number: '',
    cvv: '',
    expiry_date: '',
    cardholder_name: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const calculateTotal = () => {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    return subtotal + 5 + (subtotal * 0.1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Validate payment method
      const validation = await paymentService.validatePaymentMethod(paymentMethod)
      
      if (!validation.valid) {
        setError('Invalid payment method')
        setLoading(false)
        return
      }

      // Process payment
      const paymentData = {
        user_id: user.userId,
        order_id: `ORD-${Date.now()}`,
        amount: calculateTotal(),
        currency: 'USD',
        payment_method: 'credit_card',
        items: cart.map(item => ({
          book_id: item.id,
          title: item.title,
          quantity: item.quantity,
          price: item.price
        }))
      }

      const result = await paymentService.processPayment(paymentData)

      if (result.status === 'completed') {
        setSuccess(true)
        setTimeout(() => {
          clearCart()
          navigate('/profile')
        }, 2000)
      } else {
        setError('Payment failed. Please try again.')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Payment processing failed')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setPaymentMethod({
      ...paymentMethod,
      [e.target.name]: e.target.value
    })
  }

  if (cart.length === 0) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="warning">Your cart is empty</Alert>
        <Button onClick={() => navigate('/books')}>Browse Books</Button>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">Checkout</h1>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Payment successful! Redirecting...</Alert>}

      <Row>
        <Col lg={8} className="mb-4">
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Payment Information</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Cardholder Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="cardholder_name"
                    value={paymentMethod.cardholder_name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="card_number"
                    value={paymentMethod.card_number}
                    onChange={handleChange}
                    required
                    placeholder="1234 5678 9012 3456"
                    pattern="\d{13,19}"
                  />
                  <Form.Text className="text-muted">
                    Enter 13-19 digit card number
                  </Form.Text>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Expiry Date</Form.Label>
                      <Form.Control
                        type="text"
                        name="expiry_date"
                        value={paymentMethod.expiry_date}
                        onChange={handleChange}
                        required
                        placeholder="MM/YY"
                        pattern="\d{2}/\d{2}"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>CVV</Form.Label>
                      <Form.Control
                        type="text"
                        name="cvv"
                        value={paymentMethod.cvv}
                        onChange={handleChange}
                        required
                        placeholder="123"
                        pattern="\d{3,4}"
                        maxLength="4"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Alert variant="info">
                  <strong>Test Mode:</strong> This is a simulated payment gateway. 
                  Your payment will be processed with a random success/failure for demonstration purposes.
                </Alert>

                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  className="w-100"
                  disabled={loading || success}
                >
                  {loading ? 'Processing...' : `Pay $${calculateTotal().toFixed(2)}`}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            <Card.Body>
              {cart.map(item => (
                <div key={item.id} className="d-flex justify-content-between mb-2">
                  <span className="text-truncate me-2">
                    {item.title} x{item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>
                  ${cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>$5.00</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax (10%):</span>
                <span>
                  ${(cart.reduce((total, item) => total + (item.price * item.quantity), 0) * 0.1).toFixed(2)}
                </span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total:</strong>
                <strong className="text-primary">${calculateTotal().toFixed(2)}</strong>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Checkout



