import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import BookCard from '../components/BookCard'
import { booksData, categories, getBooksByCategory, searchBooks } from '../data/booksData'

function Books() {
  const [filteredBooks, setFilteredBooks] = useState(booksData)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    let books = booksData

    // Filter by category
    if (selectedCategory !== 'All') {
      books = getBooksByCategory(selectedCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      books = books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredBooks(books)
  }, [selectedCategory, searchQuery])

  return (
    <Container className="py-4">
      <h1 className="mb-4">Browse Books</h1>

      <Row className="mb-4">
        <Col md={6} className="mb-3">
          <InputGroup>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={6} className="mb-3">
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      <div className="mb-3">
        <p className="text-muted">
          Showing {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
        </p>
      </div>

      {filteredBooks.length > 0 ? (
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {filteredBooks.map(book => (
            <Col key={book.id}>
              <BookCard book={book} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center py-5">
          <h3>No books found</h3>
          <p className="text-muted">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </Container>
  )
}

export default Books



