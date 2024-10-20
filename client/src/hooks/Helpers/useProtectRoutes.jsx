import { React, useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../../../context/userContext'

const useProtectRoutes = () => {
    const { role, user } = useContext(UserContext);
console.log(user)
    const PageRouteProtection = ({ providedRole }) => {
        if(role !== undefined) {
            if (user === 'No data') {
                return <Navigate to='/profileregistration' />;
            }

            return user === null ? (
                <Navigate to='/'/>
            ) : role === providedRole ? (
                <Outlet/>
            ) : role != providedRole && (
                <Navigate to='/restriction'/>
            )
        }
    }

    const AuthPageProtection = () => {
        if(user !== undefined) {
            if (user === 'No data' && role !== null) {
                return <Navigate to='/profileregistration' />;
            }

            return user === null ? (
                <Outlet/>
            ) : role === 'user' ? (
                <Navigate to='/home'/>
            ) : role === 'admin' ? (
                <Navigate to='/admin/home'/>
            ) : null
        }
    }

    /* const AuthRegistration = () => {
        if(user !== undefined) {
            console.log('tae')
            return user === 'No data' && role !== null ? <Navigate to='/profileregistration' /> : <Navigate to ='/'/>
        }
    } */


    return { AuthRegistration, PageRouteProtection, AuthPageProtection }
}



export default useProtectRoutes
