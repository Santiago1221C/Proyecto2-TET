import axios from 'axios'
import { API_ENDPOINTS, getAuthHeader } from '../config/api'

const reviewService = {
  createReview: async (reviewData) => {
    const response = await axios.post(
      `${API_ENDPOINTS.REVIEW_SERVICE}/reviews`,
      reviewData,
      { headers: getAuthHeader() }
    )
    return response.data
  },

  getBookReviews: async (bookId, page = 1, limit = 20) => {
    const response = await axios.get(
      `${API_ENDPOINTS.REVIEW_SERVICE}/reviews/book/${bookId}?page=${page}&limit=${limit}`
    )
    return response.data
  },

  getUserReviews: async (userId, page = 1, limit = 20) => {
    const response = await axios.get(
      `${API_ENDPOINTS.REVIEW_SERVICE}/reviews/user/${userId}?page=${page}&limit=${limit}`,
      { headers: getAuthHeader() }
    )
    return response.data
  },

  getBookRatingStats: async (bookId) => {
    const response = await axios.get(
      `${API_ENDPOINTS.REVIEW_SERVICE}/reviews/book/${bookId}/stats`
    )
    return response.data
  },

  updateReview: async (reviewId, userId, reviewData) => {
    const response = await axios.put(
      `${API_ENDPOINTS.REVIEW_SERVICE}/reviews/${reviewId}`,
      { ...reviewData, user_id: userId },
      { headers: getAuthHeader() }
    )
    return response.data
  },

  deleteReview: async (reviewId, userId) => {
    const response = await axios.delete(
      `${API_ENDPOINTS.REVIEW_SERVICE}/reviews/${reviewId}?user_id=${userId}`,
      { headers: getAuthHeader() }
    )
    return response.data
  },

  markReviewHelpful: async (reviewId) => {
    const response = await axios.post(
      `${API_ENDPOINTS.REVIEW_SERVICE}/reviews/${reviewId}/helpful`,
      {},
      { headers: getAuthHeader() }
    )
    return response.data
  }
}

export default reviewService



