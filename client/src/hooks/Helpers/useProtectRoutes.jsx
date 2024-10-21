import { React, useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../../../context/userContext'

const useProtectRoutes = () => {
    const { user } = useContext(UserContext);
    const PageRouteProtection = ({ providedRole }) => {
        if(user !== undefined) {
            return user === null ? (
                <Navigate to='/'/>
            ) : user.role === providedRole ? (
                <Outlet/>
            ) : user.role != providedRole && (
                <Navigate to='/restriction'/>
            )
        }
    }

    const AuthPageProtection = () => {
        if(user !== undefined) {
            return user === null ? (
                <Outlet/>
            ) : user.role === 'user' ? (
                <Navigate to='/home'/>
            ) : user.role === 'admin' ? (
                <Navigate to='/admin/home'/>
            ) : null
        }
    }

    return { PageRouteProtection, AuthPageProtection }
}



export default useProtectRoutes
