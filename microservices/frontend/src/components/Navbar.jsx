import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { CartContext } from '../context/CartContext'
import { FaShoppingCart, FaUser, FaBook } from 'react-icons/fa'

function NavigationBar() {
  const { user, logout } = useContext(AuthContext)
  const { cart } = useContext(CartContext)

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FaBook className="me-2" />
          Bookstore
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/books">Browse Books</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/cart" className="position-relative">
              <FaShoppingCart className="me-1" />
              Cart
              {cartItemCount > 0 && (
                <Badge bg="danger" className="ms-2">
                  {cartItemCount}
                </Badge>
              )}
            </Nav.Link>
            
            {user ? (
              <NavDropdown title={<><FaUser className="me-1" />{user.username}</>} id="user-dropdown">
                <NavDropdown.Item as={Link} to="/profile">My Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/my-reviews">My Reviews</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register" className="btn btn-light text-primary ms-2">
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar



