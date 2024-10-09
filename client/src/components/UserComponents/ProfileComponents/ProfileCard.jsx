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
              {!!user && user.gender === 'Male' ? (
                <div className="overflow-hidden h-52 w-52 flex justify-center rounded-full pointer-events-none">
                  <img src={maleProfile} alt="" className='h-auto w-full object-contain'/>
                </div>
              ) : (
                <div className="overflow-hidden h-52 w-52 flex justify-center rounded-full pointer-events-none">
                  <img src={femaleProfile} alt="" className='h-auto w-full object-contain'/>
                </div>
              )}
            </div>
            <div className="px-2.5 ">
              <h1 className='text-base font-medium mt-6 text-center w-[288px]'>{user.firstName} {user.lastName}</h1>
              <p className='mx-auto w-[180px] text-center text-white py-1.5 font-medium rounded-lg text-sm mt-2 bg-[#41518d]'>Faculty Service Office</p>
            </div>
        </div>

    </div>
  )
}

export default ProfileCard
