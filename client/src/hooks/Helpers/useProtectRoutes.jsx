import { React, useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../../../context/userContext'

const useProtectRoutes = () => {
    const { role, user } = useContext(UserContext);

    const PageRouteProtection = ({ providedRole }) => {
        if(role !== undefined) {
            return user === null ? <Navigate to='/'/> : <>{role === providedRole ? <Outlet/> : <>{role != providedRole && <Navigate to='/restriction'/>}</>}</>
        }
    }

    const AuthPageProtection = () => {
        return user === null ? <Outlet/> : <>{role === 'faculty' ? <Navigate to='/home'/> : <>{role === 'director' && <Navigate to='/admin/home'/> }</>}</>
    }


    return { PageRouteProtection, AuthPageProtection }
}



export default useProtectRoutes
