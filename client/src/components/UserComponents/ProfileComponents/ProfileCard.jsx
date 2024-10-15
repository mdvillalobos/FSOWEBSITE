import React, { useContext } from 'react';
import { UserContext } from '../../../../context/userContext';
import maleProfile from '../../../assets/images/male.webp';
import femaleProfile from '../../../assets/images/female.webp';

const ProfileCard = () => {
  const { user } = useContext(UserContext);
  
  return (
    <div className='min-w-fit w-[20vw]'>
        <div className="py-6 rounded-xl overflow-hidden bg-white shadow-lg font-Poppins"> 
            <div className="flex justify-center select-none">
              {!!user && user.profilePicture ? (
                <div className="flex items-center justify-center w-52 h-52 overflow-hidden rounded-full">
                  <img src={user.profilePicture} alt="Profile Picture" className='w-full h-full object-fill'/>
                </div>
              ) : (
                user.sex === 'Male' ? (
                  <div className="w-52 h-52 overflow-hidden rounded-full flex items-center justify-center">
                    <img src={maleProfile} alt="Profile Picture" className='w-full h-auto object-cover'/>
                  </div>
                ) : (
                  <div className="w-52 h-52 overflow-hidden rounded-full flex items-center justify-center">
                    <img src={femaleProfile} alt="Profile Picture" className='w-full h-auto object-cover'/>
                  </div>
                )
              )}
            </div>
            <div className="px-2.5 ">
              <h1 className='text-base font-medium mt-6 text-center w-[288px]'>{user.firstName} {user.lastName}</h1>
              <p className='mx-auto w-[180px] text-center text-white py-1.5 font-medium rounded-lg text-sm mt-2 bg-NuBlue'>Faculty Service Office</p>
            </div>
        </div>

    </div>
  )
}

export default ProfileCard
