import React from 'react'
import { useContext } from "react";
import { UserContext } from "../../../../context/userContext.jsx";

const ProfileFields = () => {
  const {user} = useContext(UserContext);

  return (
    <div className='w-full bg-white shadow-lg rounded-xl'>
      <div className="border-b-2 px-12 py-6 border-[#4b538f] ">
        <h1 className='text-2xl font-bold text-[#35408e] '>ABOUT ME</h1>
      </div>
      <div className="px-12 py-8 flex font-Poppins">
        <div className='mr-20'>
          <div className="profileFields">
            <p className='label'>Last Name:</p>
            {!!user && (<span className='w-50'><p>{user.lastName}</p></span>)}
          </div>
    
          <div className="profileFields">
            <p className='label'>First Name:</p>
            {!!user && (<span className='w-50'><p>{user.firstName}</p></span>)}
          </div>
    
          <div className="profileFields">
            <p className='label'>Middle Name:</p>
            {!!user && (<span className='w-50'><p>{user.middleName}</p></span>)}
          </div>
    
          <div className="profileFields">
            <p className='label'>Work Email:</p>
            {!!user && (<span className='w-50'><p>{user.email}</p></span>)}
          </div>
    
          <div className="profileFields">
            <p className='label'>Work Email:</p>
            {!!user && (<span className='w-50'><p>{user.employeeID}</p></span>)}
          </div>
        </div>

        <div>
          <div className="profileFields">
            <p className='label'>Gender:</p>
            <p>Female?</p>
          </div>
    
          <div className="profileFields">
            <p className='label'>Position:</p>
            {!!user && (<span className='w-50'><p>{user.position}</p></span>)}
          </div>

          <div className="profileFields">
            <p className='label'>Department:</p>
            {!!user && (<span className='w-50'><p>{user.department}</p></span>)}
          </div>
    
          <div className="profileFields">
            <p className='label'>Track:</p>
            {!!user && (<span className='w-50'><p>{user.track}</p></span>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileFields
