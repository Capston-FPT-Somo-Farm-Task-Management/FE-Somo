import { Navigate } from 'react-router'
import { authServices } from 'services/authServices'

const PrivateRoute = ({ children }) => {
  return authServices.getRole() === 'Manager' ? (
    children
  ) : authServices.getRole() === 'Admin' ? (
    children
  ) : (
    <Navigate to="/login" />
  )
}
export default PrivateRoute
