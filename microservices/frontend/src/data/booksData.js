// Mock book data for the bookstore
// In a real application, this would come from a Book Service API

export const booksData = [
  {
    id: 'book-001',
    title: 'The Great Adventure',
    author: 'John Smith',
    price: 24.99,
    category: 'Fiction',
    description: 'An epic tale of courage, friendship, and discovery in a world full of wonder and danger.',
    isbn: '978-1234567890',
    publisher: 'Adventure Books Publishing',
    publishYear: 2023,
    pages: 450,
    language: 'English',
    stock: 45,
    imageUrl: 'https://via.placeholder.com/300x450/4A90E2/ffffff?text=The+Great+Adventure'
  },
  {
    id: 'book-002',
    title: 'Mastering Microservices',
    author: 'Sarah Johnson',
    price: 49.99,
    category: 'Technology',
    description: 'A comprehensive guide to building scalable microservices architectures with modern technologies.',
    isbn: '978-2345678901',
    publisher: 'Tech Press',
    publishYear: 2024,
    pages: 580,
    language: 'English',
    stock: 32,
    imageUrl: 'https://via.placeholder.com/300x450/50C878/ffffff?text=Mastering+Microservices'
  },
  {
    id: 'book-003',
    title: 'The Art of Cooking',
    author: 'Maria Garcia',
    price: 34.99,
    category: 'Cooking',
    description: 'Discover the secrets of culinary excellence with over 200 delicious recipes from around the world.',
    isbn: '978-3456789012',
    publisher: 'Culinary World',
    publishYear: 2023,
    pages: 380,
    language: 'English',
    stock: 28,
    imageUrl: 'https://via.placeholder.com/300x450/FF6B6B/ffffff?text=The+Art+of+Cooking'
  },
  {
    id: 'book-004',
    title: 'Journey Through Time',
    author: 'Michael Brown',
    price: 29.99,
    category: 'History',
    description: 'An engaging exploration of world history from ancient civilizations to the modern era.',
    isbn: '978-4567890123',
    publisher: 'History House',
    publishYear: 2022,
    pages: 520,
    language: 'English',
    stock: 18,
    imageUrl: 'https://via.placeholder.com/300x450/9B59B6/ffffff?text=Journey+Through+Time'
  },
  {
    id: 'book-005',
    title: 'Modern Web Development',
    author: 'David Lee',
    price: 44.99,
    category: 'Technology',
    description: 'Master React, Node.js, and cloud technologies to build modern full-stack applications.',
    isbn: '978-5678901234',
    publisher: 'Web Dev Press',
    publishYear: 2024,
    pages: 640,
    language: 'English',
    stock: 55,
    imageUrl: 'https://via.placeholder.com/300x450/3498DB/ffffff?text=Modern+Web+Development'
  },
  {
    id: 'book-006',
    title: 'The Mystery of Shadows',
    author: 'Emily Watson',
    price: 19.99,
    category: 'Mystery',
    description: 'A thrilling detective story that will keep you guessing until the very last page.',
    isbn: '978-6789012345',
    publisher: 'Mystery Lane Publishing',
    publishYear: 2023,
    pages: 340,
    language: 'English',
    stock: 42,
    imageUrl: 'https://via.placeholder.com/300x450/2C3E50/ffffff?text=The+Mystery+of+Shadows'
  },
  {
    id: 'book-007',
    title: 'Healthy Living Guide',
    author: 'Dr. Robert Chen',
    price: 27.99,
    category: 'Health',
    description: 'Evidence-based strategies for optimal health, fitness, and well-being in the modern world.',
    isbn: '978-7890123456',
    publisher: 'Health First Books',
    publishYear: 2024,
    pages: 295,
    language: 'English',
    stock: 37,
    imageUrl: 'https://via.placeholder.com/300x450/27AE60/ffffff?text=Healthy+Living+Guide'
  },
  {
    id: 'book-008',
    title: 'Space Odyssey 2050',
    author: 'James Anderson',
    price: 32.99,
    category: 'Science Fiction',
    description: 'A visionary tale of humanity\'s future among the stars and the challenges that await.',
    isbn: '978-8901234567',
    publisher: 'Sci-Fi Universe',
    publishYear: 2023,
    pages: 485,
    language: 'English',
    stock: 29,
    imageUrl: 'https://via.placeholder.com/300x450/E74C3C/ffffff?text=Space+Odyssey+2050'
  },
  {
    id: 'book-009',
    title: 'The Business Mindset',
    author: 'Lisa Martinez',
    price: 39.99,
    category: 'Business',
    description: 'Transform your entrepreneurial vision into reality with proven strategies and insights.',
    isbn: '978-9012345678',
    publisher: 'Business Excellence',
    publishYear: 2024,
    pages: 410,
    language: 'English',
    stock: 41,
    imageUrl: 'https://via.placeholder.com/300x450/F39C12/ffffff?text=The+Business+Mindset'
  },
  {
    id: 'book-010',
    title: 'Romantic Escape',
    author: 'Jennifer White',
    price: 16.99,
    category: 'Romance',
    description: 'A heartwarming love story set against the backdrop of a charming European village.',
    isbn: '978-0123456789',
    publisher: 'Romance Reads',
    publishYear: 2023,
    pages: 315,
    language: 'English',
    stock: 52,
    imageUrl: 'https://via.placeholder.com/300x450/E91E63/ffffff?text=Romantic+Escape'
  },
  {
    id: 'book-011',
    title: 'Cloud Computing Essentials',
    author: 'Kevin Park',
    price: 54.99,
    category: 'Technology',
    description: 'Master AWS, Azure, and GCP with hands-on projects and real-world scenarios.',
    isbn: '978-1234567891',
    publisher: 'Cloud Tech Publishing',
    publishYear: 2024,
    pages: 720,
    language: 'English',
    stock: 24,
    imageUrl: 'https://via.placeholder.com/300x450/1ABC9C/ffffff?text=Cloud+Computing+Essentials'
  },
  {
    id: 'book-012',
    title: 'The Wisdom Path',
    author: 'Daniel Kumar',
    price: 22.99,
    category: 'Philosophy',
    description: 'Ancient wisdom meets modern life in this profound exploration of meaning and purpose.',
    isbn: '978-2345678902',
    publisher: 'Wisdom House',
    publishYear: 2023,
    pages: 280,
    language: 'English',
    stock: 35,
    imageUrl: 'https://via.placeholder.com/300x450/8E44AD/ffffff?text=The+Wisdom+Path'
  }
]

export const categories = [
  'All',
  'Fiction',
  'Technology',
  'Cooking',
  'History',
  'Mystery',
  'Health',
  'Science Fiction',
  'Business',
  'Romance',
  'Philosophy'
]

export const getBookById = (id) => {
  return booksData.find(book => book.id === id)
}

export const getBooksByCategory = (category) => {
  if (category === 'All') return booksData
  return booksData.filter(book => book.category === category)
}

export const searchBooks = (query) => {
  const lowerQuery = query.toLowerCase()
  return booksData.filter(book =>
    book.title.toLowerCase().includes(lowerQuery) ||
    book.author.toLowerCase().includes(lowerQuery) ||
    book.description.toLowerCase().includes(lowerQuery)
  )
}



