import { Navigate } from 'react-router-dom'
import { userAuth } from '../context/AuthContext'

export default function PrivateRoute({ children }) {
    const { session } = userAuth()

    if (session === undefined) return null  // still loading
    if (session === null) return <Navigate to='/signin' />

    return children
}