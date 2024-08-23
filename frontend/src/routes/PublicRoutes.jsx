import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useSelector } from 'react-redux'

function PublicRoutes() {
    const token = useSelector((state) => state.auth.token);
    return token ? <Navigate to='/' /> : <Outlet />
}

export default PublicRoutes