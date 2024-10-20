import React, { useContext } from 'react';
import { UserContext } from '../../../../context/userContext';
import maleProfile from '../../../assets/images/male.webp';
import femaleProfile from '../../../assets/images/female.webp';

const ProfileCard = () => {
  const { user } = useContext(UserContext);
  
  return (
    <div className="h-full"> 
      <div className="max-sm:flex max-sm:justify-center max-sm:space-x-6">
        <div className="flex justify-center select-none">
          {!!user && user.profilePicture ? (
            <div className="flex items-center justify-center w-52 h-52 overflow-hidden p-1 border-2 border-[#93adc2] rounded-full max-sm:h-32 max-sm:w-32">
              <img src={user.profilePicture} alt="Profile Picture" className='w-full h-full object-cover rounded-full'/>
            </div>
          ) : (
            user.sex === 'Male' ? (
              <div className="flex items-center justify-center w-48 h-48 overflow-hidden rounded-full max-sm:h-32 max-sm:w-32">
                <img src={maleProfile} alt="Profile Picture" className='w-full h-auto object-cover'/>
              </div>
            ) : (
              <div className="flex items-center justify-center w-48 h-48 overflow-hidden rounded-full max-sm:h-32 max-sm:w-32">
                <img src={femaleProfile} alt="Profile Picture" className='w-full h-auto object-cover'/>
              </div>
            )
          )}
        </div>
        <div className="px-2.5 mt-4 max-sm:px-0 max-sm:my-auto">
          <h1 className='text-base font-medium text-center w-full'>{user.firstName} {user.lastName}</h1>
          <p className='mx-auto w-[180px] text-center text-white py-2 font-medium rounded-lg text-xs mt-2 bg-NuButton'>{user.rank}</p>
        </div>
      </div>
      <div className="px-6 space-y-2.5 mt-6">
        <div className="border-2 bg-[#f9fafc] rounded-xl px-4 py-2 space-y-1">
          <p className='text-xs text-gray-400'>Email</p>
          <p className='text-sm'>{user.email}</p>
        </div>
        <div className="border-2 bg-[#f9fafc] rounded-xl px-4 py-2 space-y-1">
          <p className='text-xs text-gray-400'>Employee ID</p>
          <p className='text-sm'>{user.employeeID}</p>
        </div>
        <div className="border-2 bg-[#f9fafc] rounded-xl px-4 py-2 space-y-1">
          <p className='text-xs text-gray-400'>Track</p>
          <p className='text-sm'>{user.track}</p>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
