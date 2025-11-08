// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost'

export const API_ENDPOINTS = {
  USER_SERVICE: `${API_BASE_URL}:8080/api`,
  PAYMENT_SERVICE: `${API_BASE_URL}:5000/api`,
  REVIEW_SERVICE: `${API_BASE_URL}:5002/api`
}

export const getAuthHeader = () => {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}



