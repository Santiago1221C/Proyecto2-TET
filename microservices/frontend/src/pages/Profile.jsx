import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap'
import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import userService from '../services/userService'
import paymentService from '../services/paymentService'

function Profile() {
  const { user } = useContext(AuthContext)
  const [profileData, setProfileData] = useState(null)
  const [payments, setPayments] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({})
  const [alert, setAlert] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProfile()
    loadPayments()
  }, [])

  const loadProfile = async () => {
    try {
      const data = await userService.getProfile()
      setProfileData(data)
      setFormData({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        phone: data.phone || '',
        address: data.address || ''
      })
    } catch (error) {
      console.error('Error loading profile:', error)
      setAlert({ type: 'danger', message: 'Error loading profile data' })
    } finally {
      setLoading(false)
    }
  }

  const loadPayments = async () => {
    if (!user) return
    
    try {
      const response = await paymentService.getUserPayments(user.userId)
      setPayments(response.payments || [])
    } catch (error) {
      console.error('Error loading payments:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await userService.updateProfile(user.userId, formData)
      setAlert({ type: 'success', message: 'Profile updated successfully!' })
      setIsEditing(false)
      loadProfile()
    } catch (error) {
      setAlert({ type: 'danger', message: 'Error updating profile' })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (loading && !profileData) {
    return <Container className="py-5"><p>Loading...</p></Container>
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">My Profile</h1>

      {alert && (
        <Alert variant={alert.type} dismissible onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

      <Row>
        <Col lg={8} className="mb-4">
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Personal Information</h5>
              {!isEditing && (
                <Button variant="primary" size="sm" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </Card.Header>
            <Card.Body>
              {isEditing ? (
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button type="submit" variant="primary" disabled={loading}>
                      {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button 
                      variant="secondary" 
                      onClick={() => {
                        setIsEditing(false)
                        loadProfile()
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              ) : (
                <div>
                  <p><strong>Username:</strong> {profileData?.username}</p>
                  <p><strong>Email:</strong> {profileData?.email}</p>
                  <p><strong>Name:</strong> {profileData?.firstName} {profileData?.lastName}</p>
                  <p><strong>Phone:</strong> {profileData?.phone || 'Not provided'}</p>
                  <p><strong>Address:</strong> {profileData?.address || 'Not provided'}</p>
                  <p><strong>Member Since:</strong> {new Date(profileData?.createdAt).toLocaleDateString()}</p>
                  <p><strong>Account Status:</strong> {profileData?.active ? 'Active' : 'Inactive'}</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4} className="mb-4">
          <Card className="mb-3">
            <Card.Header>
              <h5 className="mb-0">Quick Stats</h5>
            </Card.Header>
            <Card.Body>
              <p><strong>Total Orders:</strong> {payments.length}</p>
              <p><strong>Total Spent:</strong> ${payments.reduce((sum, p) => sum + (p.amount || 0), 0).toFixed(2)}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Recent Payments</h5>
            </Card.Header>
            <Card.Body>
              {payments.length > 0 ? (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Payment ID</th>
                        <th>Order ID</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map(payment => (
                        <tr key={payment.payment_id}>
                          <td>{payment.payment_id}</td>
                          <td>{payment.order_id}</td>
                          <td>${payment.amount} {payment.currency}</td>
                          <td>
                            <span className={`badge bg-${payment.status === 'completed' ? 'success' : 'warning'}`}>
                              {payment.status}
                            </span>
                          </td>
                          <td>{new Date(payment.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted">No payments yet</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Profile



