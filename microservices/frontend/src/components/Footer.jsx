import { Container, Row, Col } from 'react-bootstrap'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <h5>Bookstore</h5>
            <p>Your online destination for books of all genres. Find your next great read!</p>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/books" className="text-light text-decoration-none">Browse Books</a></li>
              <li><a href="/about" className="text-light text-decoration-none">About Us</a></li>
              <li><a href="/contact" className="text-light text-decoration-none">Contact</a></li>
              <li><a href="/faq" className="text-light text-decoration-none">FAQ</a></li>
            </ul>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Follow Us</h5>
            <div className="d-flex gap-3">
              <a href="#" className="text-light"><FaFacebook size={24} /></a>
              <a href="#" className="text-light"><FaTwitter size={24} /></a>
              <a href="#" className="text-light"><FaInstagram size={24} /></a>
              <a href="#" className="text-light"><FaLinkedin size={24} /></a>
            </div>
          </Col>
        </Row>
        <hr className="bg-light" />
        <Row>
          <Col className="text-center">
            <p className="mb-0">&copy; 2024 Bookstore. All rights reserved. | Microservices Architecture Project</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer



