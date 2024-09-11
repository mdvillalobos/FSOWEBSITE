import React from 'react'
import Header from '../../components/Tools/Header.jsx';
import ProfileRegistrationForm from '../../components/AuthComponents/ProfileRegistrationForm.jsx';


const ProfileRegistration = () => {
  return (
    <div className='bg-[#f4f7f9] h-screen max-sm:h-full'>
      <Header/> 
      <div className="px-20 py-10 max-sm:px-10">
          <div className="text-center ">
            <h1>Enter your basic account information</h1>
            <p>Please fill in your basic account information so we know who you are.</p>
          </div>
        <ProfileRegistrationForm/> 
      </div>
    </div>

  )
}

export default ProfileRegistration
