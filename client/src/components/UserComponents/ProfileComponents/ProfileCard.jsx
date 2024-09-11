import React, { useContext } from 'react';
import { UserContext } from '../../../../context/userContext';
import maleProfile from '../../../assets/images/male.png';
import femaleProfile from '../../../assets/images/female.png';

const ProfileCard = () => {
  const {user} = useContext(UserContext);
  
  return (
    <div className='min-w-fit w-[20vw]'>
        <div className="py-6 rounded-xl overflow-hidden bg-white shadow-lg font-Poppins">
            <div className="flex justify-center">
              {user.gender === 'Male' ? (
                <img src={maleProfile} alt="" className='w-[65%] h-52 rounded-full'/>
              ) : (
                <img src={femaleProfile} alt="" className='w-[65%] h-52 rounded-full'/>
              )}
            </div>
            <div className="px-2.5">
              <h1 className='text-base font-medium mt-6 text-center w-[288px]'>{user.firstName} {user.lastName}</h1>
              <p className='mx-auto w-[180px] text-center text-white py-1.5 font-medium rounded-lg text-sm mt-2 bg-[#35408e]'>Faculty Service Office</p>
            </div>
        </div>

    </div>
  )
}

export default ProfileCard
