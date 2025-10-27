import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NavigationBar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Books from './pages/Books'
import BookDetail from './pages/BookDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import MyReviews from './pages/MyReviews'
import { AuthContext } from './context/AuthContext'
import { CartContext } from './context/CartContext'

function App() {
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
    }

    // Load cart from localStorage
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  const login = (userData, token) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', token)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const addToCart = (book, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === book.id)
      let newCart
      
      if (existingItem) {
        newCart = prevCart.map(item =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        newCart = [...prevCart, { ...book, quantity }]
      }
      
      localStorage.setItem('cart', JSON.stringify(newCart))
      return newCart
    })
  }

  const removeFromCart = (bookId) => {
    setCart(prevCart => {
      const newCart = prevCart.filter(item => item.id !== bookId)
      localStorage.setItem('cart', JSON.stringify(newCart))
      return newCart
    })
  }

  const updateCartQuantity = (bookId, quantity) => {
    setCart(prevCart => {
      const newCart = prevCart.map(item =>
        item.id === bookId ? { ...item, quantity } : item
      )
      localStorage.setItem('cart', JSON.stringify(newCart))
      return newCart
    })
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem('cart')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartQuantity, clearCart }}>
        <Router>
          <div className="d-flex flex-column min-vh-100">
            <NavigationBar />
            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<Books />} />
                <Route path="/books/:id" element={<BookDetail />} />
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/profile" />} />
                <Route path="/register" element={!user ? <Register /> : <Navigate to="/profile" />} />
                <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={user ? <Checkout /> : <Navigate to="/login" />} />
                <Route path="/my-reviews" element={user ? <MyReviews /> : <Navigate to="/login" />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartContext.Provider>
    </AuthContext.Provider>
  )
}

export default App



