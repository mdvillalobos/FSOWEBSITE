import React, { useContext, useState } from 'react'
import useRegisterProfile from '../../hooks/AuthHooks/useRegisterProfile';
import Box from '@mui/material/Box';
import { RankContext } from '../../../context/rankContext';
import { HiMiniPencil } from "react-icons/hi2";

const ProfileRegistrationForm = () => {
  const { ranks } = useContext(RankContext)
  const { registerProfile } = useRegisterProfile();

  const [ data, setData ] = useState({
    profilePicture: null,
    lastName: '', 
    firstName: '',
    middleName: '',
    sex: '',
    track: '', 
    rank: '',
    department: '', 
    position: '', 
  });

  const trackOptions = Array.from(new Set(ranks?.map(rank => rank.track)));
  const filteredRank = ranks?.filter(rank =>
    data.track ? rank.track === data.track : false
  );

  const RegisterUserInfo = async (e) => {
    e.preventDefault();
    console.log(data.profilePicture)
    await registerProfile(data.profilePicture, data.lastName, data.firstName, data.middleName, data.sex, data.track, data.rank, data.department, data.position);
  }

  return (
    <div className='bg-white shadow-md flex justify-center rounded-lg text-sm'>
      <Box component="form" autoComplete='off' noValidate onSubmit={RegisterUserInfo}> 
        <div className='space-y-4 py-8 px-10 w-full'>
          <div className="flex justify-center mx-auto mb-5">
            <label className='flex justify-center items-center overflow-hidden rounded-full h-36 w-36 bg-gray-200 cursor-pointer relative'>
              <input type='file' className='hidden' onChange={(e) => setData({ ...data, profilePicture: e.target.files[0]})}/>
              {data.profilePicture ? (
                <img src={URL.createObjectURL(data.profilePicture)} alt="" className='w-full h-full object-fill' />
              ) : (
                <p className='absolute bottom-0'><HiMiniPencil size={'1.5rem'} /></p>              
              )}
            </label>
          </div>

          <h1 className='text-[#35408E] font-Poppins font-semibold text-2xl'>Personal Information</h1>

          <div className="profile-registration-container">
            <div className="flex gap-16">
              <div className="flex flex-col space-y-0.5">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id='firstName' name='firstName' className='border-2 px-3 py-3 rounded-md w-[35vw] text-sm' onChange={(e) => setData({ ...data, firstName: e.target.value})}/>
              </div>

              <div className="flex flex-col space-y-0.5">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id='lastName' name='lastName' className='border-2 px-3 py-3 rounded-md w-[35vw] text-sm' onChange={(e) => setData({ ...data, lastName: e.target.value})}/>
              </div>
            </div>

            <div className="flex gap-16">
              <div className="flex flex-col space-y-0.5">
                <label htmlFor="middleInitial">Middle Name</label>
                <input type="text" id='middleInitial' name='middleInitial' className='border-2 px-3 py-3 rounded-md w-[35vw]  text-sm' onChange={(e) => setData({ ...data, middleName: e.target.value})}/>
              </div>

              <div className="flex flex-col space-y-0.5">
                <label htmlFor="sex">Sex</label>
                <select name="sex" id="sex" className='border-2 px-3 py-3 rounded-md w-[35vw]  text-sm' onChange={(e) => setData({ ...data, sex: e.target.value})}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            <div className="flex gap-16">
              <div className="flex flex-col space-y-0.5">
                <label htmlFor="firstName">Track</label>
                <select className='border-2 px-3 py-3 rounded-md w-[35vw] text-sm' onChange={(e) => setData({ ...data, track: e.target.value})}>
                  <option value="">Select a track</option>
                  {trackOptions.map(track => (
                    <option key={track} value={track}>{track}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col space-y-0.5">
                <label htmlFor="firstName">Current Rank</label>
                <select className='border-2 px-3 py-3 rounded-md w-[35vw] text-sm' onChange={(e) => setData({ ...data, rank: e.target.value})}>
                  <option value='None'>None</option>
                  {filteredRank?.map(rank => (
                    <option key={rank._id} value={rank.rankName}>{rank.rankName}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-16">
              <div className="flex flex-col space-y-0.5">
                <label htmlFor="firstName">Department</label>
                <select className='border-2 px-3 py-3 rounded-md w-[35vw] text-sm' onChange={(e) => setData({...data, department: e.target.value})}>
                  <option value="College of Allied Health">College of Allied Health</option>
                  <option value="College of Architecture">College of Architecture</option>
                  <option value="College of Business and Accountancy">College of Business and Accountancy</option>
                  <option value="College of Computing and Information Technologies">College of Computing and Information Technologies</option>
                  <option value="College of Education, Arts and Science">College of Education, Arts and Science</option>
                  <option value="College of Engineering">College of Engineering</option>
                  <option value="College of Tourism and Hospitality Management">College of Tourism and Hospitality Management</option>
                </select>
              </div>

              <div className="flex flex-col space-y-0.5">
                <label htmlFor="firstName">Track</label>
                <select className='border-2 px-3 py-3 rounded-md w-[35vw] text-sm' onChange={(e) => setData({ ...data, college: e.target.value})}>
                  <option value="">Select a track</option>
                  {trackOptions.map(track => (
                    <option key={track} value={track}>{track}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="">
            <div className="flex flex-col space-y-0.5">
                <label htmlFor="firstName">Employee Position</label>
                <select className='border-2 px-3 py-3 rounded-md w-[35vw] text-sm' onChange={(e) => setData({...data, position: e.target.value})}>
                  <option value="Faculty">Faculty</option>
                  <option value="Director">Director</option>
                  <option value="FSO">Faculty Service Office</option>
                </select>
              </div>
             
            </div>
          </div>
          
          <div className="flex justify-end max-sm:justify-normal">
            <input type="submit" value="Submit" className='font-medium cursor-pointer mt-4 text-white bg-[#41518d] py-2.5 px-16 duration-300 hover:bg-NuButtonHover rounded-md'/>
          </div>

        </div>
      </Box>
    </div>
  )
}

export default ProfileRegistrationForm
