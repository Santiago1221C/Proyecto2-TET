import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaBook, FaShippingFast, FaLock, FaHeadset } from 'react-icons/fa'
import BookCard from '../components/BookCard'
import { booksData } from '../data/booksData'

function Home() {
  const featuredBooks = booksData.slice(0, 4)

  return (
    <>
      {/* Hero Section */}
      <div className="bg-primary text-white py-5 mb-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold mb-3">
                Welcome to Bookstore
              </h1>
              <p className="lead mb-4">
                Discover your next favorite book from our extensive collection. 
                From bestsellers to hidden gems, we have something for every reader.
              </p>
              <Button as={Link} to="/books" variant="light" size="lg">
                Browse Books
              </Button>
            </Col>
            <Col lg={6}>
              <img 
                src="https://via.placeholder.com/600x400/ffffff/4A90E2?text=Books+Collection" 
                alt="Books" 
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </div>

      <Container>
        {/* Featured Books */}
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Featured Books</h2>
            <Button as={Link} to="/books" variant="outline-primary">
              View All
            </Button>
          </div>
          <Row xs={1} md={2} lg={4} className="g-4">
            {featuredBooks.map(book => (
              <Col key={book.id}>
                <BookCard book={book} />
              </Col>
            ))}
          </Row>
        </section>

        {/* Features */}
        <section className="mb-5">
          <h2 className="text-center mb-4">Why Choose Us</h2>
          <Row xs={1} md={2} lg={4} className="g-4">
            <Col>
              <Card className="text-center h-100 border-0 shadow-sm">
                <Card.Body>
                  <FaBook size={48} className="text-primary mb-3" />
                  <Card.Title>Vast Collection</Card.Title>
                  <Card.Text>
                    Thousands of books across all genres and categories
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="text-center h-100 border-0 shadow-sm">
                <Card.Body>
                  <FaShippingFast size={48} className="text-primary mb-3" />
                  <Card.Title>Fast Shipping</Card.Title>
                  <Card.Text>
                    Quick and reliable delivery to your doorstep
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="text-center h-100 border-0 shadow-sm">
                <Card.Body>
                  <FaLock size={48} className="text-primary mb-3" />
                  <Card.Title>Secure Payment</Card.Title>
                  <Card.Text>
                    Safe and encrypted payment processing
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="text-center h-100 border-0 shadow-sm">
                <Card.Body>
                  <FaHeadset size={48} className="text-primary mb-3" />
                  <Card.Title>24/7 Support</Card.Title>
                  <Card.Text>
                    Always here to help with your questions
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        {/* CTA Section */}
        <section className="text-center py-5 bg-light rounded mb-5">
          <h2 className="mb-3">Start Your Reading Journey Today</h2>
          <p className="lead mb-4">
            Join thousands of happy readers and discover your next favorite book
          </p>
          <Button as={Link} to="/register" variant="primary" size="lg">
            Sign Up Now
          </Button>
        </section>
      </Container>
    </>
  )
}

export default Home



