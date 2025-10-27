import axios from 'axios'
import { API_ENDPOINTS, getAuthHeader } from '../config/api'

const paymentService = {
  processPayment: async (paymentData) => {
    const response = await axios.post(
      `${API_ENDPOINTS.PAYMENT_SERVICE}/payments`,
      paymentData,
      { headers: getAuthHeader() }
    )
    return response.data
  },

  getPaymentStatus: async (paymentId) => {
    const response = await axios.get(
      `${API_ENDPOINTS.PAYMENT_SERVICE}/payments/${paymentId}`,
      { headers: getAuthHeader() }
    )
    return response.data
  },

  getUserPayments: async (userId) => {
    const response = await axios.get(
      `${API_ENDPOINTS.PAYMENT_SERVICE}/payments/user/${userId}`,
      { headers: getAuthHeader() }
    )
    return response.data
  },

  validatePaymentMethod: async (paymentMethod) => {
    const response = await axios.post(
      `${API_ENDPOINTS.PAYMENT_SERVICE}/payments/validate`,
      paymentMethod
    )
    return response.data
  }
}

export default paymentService



