import React, { useContext } from 'react'
import Header from '../../components/Tools/Header.jsx';
import ProfileRegistrationForm from '../../components/AuthComponents/ProfileRegistrationForm.jsx';
import { UserContext } from '../../../context/userContext.jsx';
import { Navigate, useNavigate } from 'react-router-dom';

const ProfileRegistration = () => {
    const { user, role } = useContext(UserContext);

    if(user === undefined) {
        return (
            <div className="flex justify-center items-center min-h-screen">
               <div className="cssloader">
                    <div className="triangle1"></div>
                    <div className="triangle2"></div>
                    <p className="text">Please Wait</p>
                </div>
            </div>
        )
    }
    /* if(user !== 'No data' && role === null || user !== 'No data' && role !== null) {
        return user === null ? <Navigate to='/'/> : role === 'user' ? <Navigate to='/home'/> : role === 'admin' && <Navigate to ='/admin/home'/>
    } */
    
    return (
        <div className='bg-[#f4f7f9] h-full max-sm:h-full'>
            <Header/> 
            <div className="px-24 py-12 max-sm:px-10 font-Poppins">
                <div className="text-center mb-4">
                    <h1 className='text-5xl font-bold mb-2 text-NuButton'>Almost there!</h1>
                    <p className='text-gray-500'>Kindly fill up all the necessary fields to continue.</p>
                </div>
                <div className="bg-white py-4 rounded-xl shadow-md overflow-hidden">
                    <ProfileRegistrationForm/> 
                </div>
            </div>
        </div>
    )
}

export default ProfileRegistration
