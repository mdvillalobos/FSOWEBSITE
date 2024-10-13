import React from 'react'
import Header from '../../components/Tools/Header.jsx';
import ProfileRegistrationForm from '../../components/AuthComponents/ProfileRegistrationForm.jsx';

const ProfileRegistration = () => {
    return (
        <div className='bg-[#f4f7f9] h-full max-sm:h-full'>
            <Header/> 
            <div className="px-20 py-10 max-sm:px-10 font-Poppins">
                <div className="text-center">
                    <h1 className='text-4xl font-bold'></h1>
                    <p className='text-gray-400'>Enter the your details to get going.</p>
                </div>
                <ProfileRegistrationForm/> 
            </div>
        </div>
    )
}

export default ProfileRegistration
