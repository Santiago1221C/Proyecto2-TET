import axios from 'axios'
import { API_ENDPOINTS, getAuthHeader } from '../config/api'

const userService = {
  register: async (userData) => {
    const response = await axios.post(
      `${API_ENDPOINTS.USER_SERVICE}/auth/register`,
      userData
    )
    return response.data
  },

  login: async (credentials) => {
    const response = await axios.post(
      `${API_ENDPOINTS.USER_SERVICE}/auth/login`,
      credentials
    )
    return response.data
  },

  getProfile: async () => {
    const response = await axios.get(
      `${API_ENDPOINTS.USER_SERVICE}/users/me`,
      { headers: getAuthHeader() }
    )
    return response.data
  },

  updateProfile: async (userId, userData) => {
    const response = await axios.put(
      `${API_ENDPOINTS.USER_SERVICE}/users/${userId}`,
      userData,
      { headers: getAuthHeader() }
    )
    return response.data
  }
}

export default userService



