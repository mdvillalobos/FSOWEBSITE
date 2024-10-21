import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import useEditName from '../../hooks/UserHooks/useUpdateName.jsx';
import useUpdateProfilePicture from '../../hooks/UserHooks/useUpdateProfilePicture.jsx';
import useUpdateOtherInformation from '../../hooks/UserHooks/useUpdateOtherInformation.jsx';
import { BiEditAlt } from "react-icons/bi";
import { IoChevronBackOutline } from "react-icons/io5";
import { UserContext } from '../../../context/userContext.jsx';
import maleProfile from '../../assets/images/male.webp';
import femaleProfile from '../../assets/images/female.webp';

const PersonalDetailsForm = () => {
  const [ isNameOpen, setIsNameOpen ] = useState(false);
  const [ isProfileOpen, setIsProfileOpen ] = useState(false)
  const [ isOtherOpen, setIsOtherOpen ] = useState(false)

  return (
    <div className='px-6 w-full'>
      <h1 className='text-3xl font-medium mb-2 text-NuBlue'>Profiles</h1>
      <div className='flex justify-between w-full py-4 border-b'>
        <span className="text-left space-y-1.5">
          <p>Name</p>
          <p className='text-sm text-gray-500 max-sm:hidden'>The email address associated with your account.</p>
        </span>
        <div className="flex space-x-8 text-right text-sm">
          <button className='flex my-auto py-2 px-4 text-sm bg-NuButton text-white hover:bg-NuButtonHover hover:shadow-lg rounded-lg shadow-md duration-300 hover:scale-105' onClick={() => setIsNameOpen(!isNameOpen)}>
            <span className='max-sm:hidden'>Edit</span>
            <BiEditAlt className='ml-1.5 mt-0.5 max-sm:ml-0 max-sm:mt-0'/>
          </button>
        </div>
      </div>

      {isNameOpen ? <UpdateNameModal toggle={() => setIsNameOpen(!isNameOpen)}/> : null}

      <div className='flex justify-between w-full py-4 border-b'>
        <span className="text-left space-y-1.5">
          <p>Others</p>
          <p className='text-sm text-gray-500 max-sm:hidden'>Other informations about your account.</p>
        </span>
        <button className='flex my-auto py-2 px-4 text-sm bg-NuButton text-white hover:bg-NuButtonHover hover:shadow-lg rounded-lg shadow-md duration-300 hover:scale-105' onClick={() => setIsOtherOpen(!isOtherOpen)}>
          <span className='max-sm:hidden'>Edit</span>
          <BiEditAlt className='ml-1.5 mt-0.5 max-sm:ml-0 max-sm:mt-0'/>
        </button>
      </div>

      {isOtherOpen ? <UpdateOtherInfoModal toggle={() => setIsOtherOpen(!isOtherOpen)}/> : null}

      <div className='flex justify-between w-full py-4 border-b'>
        <span className="text-left space-y-1.5">
          <p>Profile Picture</p>
          <p className='text-sm text-gray-500 max-sm:hidden'>Set a unique password to protect your account.</p>
        </span>
        <button className='flex my-auto py-2 px-4 text-sm bg-NuButton text-white hover:bg-NuButtonHover hover:shadow-lg rounded-lg shadow-md duration-300 hover:scale-105' onClick={() => setIsProfileOpen(!isProfileOpen)}>
        <span className='max-sm:hidden'>Change Profile</span>
          <BiEditAlt className='ml-1.5 mt-0.5 max-sm:ml-0 max-sm:mt-0'/>
        </button>
      </div>

      {isProfileOpen ? <UpdateProfileModal toggle={() => setIsProfileOpen(!isProfileOpen)}/> : null}
    </div>
    
  )
}

export default PersonalDetailsForm

const UpdateNameModal = (props) => {
  const { EditName } = useEditName();
  const { user } = useContext(UserContext)

  const [ data, setData ] = useState({
    lastName: user?.lastName,
    firstName: user?.firstName,
    middleName: user?.middleName, 
  });


  const updateProfile = async (e) => {
    e.preventDefault();
    await EditName(data.lastName, data.firstName, data.middleName, user._id, props);
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen overflow-auto z-10 flex bg-black/40 justify-center items-center font-Poppins">
      <div className="h-[64%] w-[35%] bg-white shadow-lg rounded-2xl px-6 py-6  space-y-5 overflow-hidden fade-in max-sm:h-[67%] max-sm:w-[85%]">
        <div className="break-words text-sm">
          <form onSubmit={updateProfile} className='font-Poppins'>
            <button type="button" className="hover:bg-[#eae7e7] text-[#3b3c3c] border-2 px-2 py-2 rounded-lg duration-200" onClick={props.toggle}>
              <IoChevronBackOutline size={'1.3rem'} />
            </button> 

            <h1 className='my-4 text-xl font-medium'>Name</h1>

            <div className="space-y-4">
              <div className="setting-input-container">
                <input type="text"
                  required
                  value={data.firstName} 
                  onChange={(e) => setData({...data, firstName: e.target.value})}
                  className='border-2 rounded-lg px-3 peer pt-7 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2]'
                />
                <span className='setting-input-label'>First Name</span>
              </div>

              <div className="setting-input-container">
                <input type="text"
                  value={data.middleName} 
                  onChange={(e) => setData({...data, middleName: e.target.value})}
                  className='border-2 rounded-lg px-3 peer pt-7 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2]'
                />
                <span className='setting-input-label'>Middle Name</span>
              </div>

              <div className="setting-input-container">
                <input type="text"
                  required
                  value={data.lastName} 
                  onChange={(e) => setData({...data, lastName: e.target.value})}
                  className='border-2 rounded-lg px-3 peer pt-7 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2]'
                />
                <span className='setting-input-label'>Last Name</span>
              </div>
            </div>
            <p className='text-[0.8rem] ml-0.5 mt-2'>Don't add any unusual capitalization, punctuation, characters or random words.</p>
            <input type="submit" value='Update' className='w-full text-white font-semibold bg-NuBlue py-3 px-14 mt-4 text-sm cursor-pointer rounded-lg duration-300 hover:bg-NuButtonHover' />
          </form> 
        </div>
      </div>
    </div>
  )
}

const UpdateOtherInfoModal = (props) => {
  const { updateOtherInformation } = useUpdateOtherInformation();
  const { user } = useContext(UserContext)
  const [ data, setData ] = useState({
    sex: user?.sex,
    department: user?.department,
    position: user?.position,
  });

  const updateProfilePicture = async (e) => {
    e.preventDefault();
    await updateOtherInformation(data.sex, data.department, data.position, user._id, props);
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen overflow-auto z-10 flex bg-black/40 justify-center items-center font-Poppins">
      <div className="h-[65%] w-[35%] bg-white shadow-lg rounded-2xl px-6 py-6  space-y-5 overflow-hidden fade-in max-sm:h-[68%] max-sm:w-[85%]">
        <form onSubmit={updateProfilePicture} className='font-Poppins'>
          <button type="button" className="hover:bg-[#eae7e7] text-[#3b3c3c] border-2 px-2 py-2 rounded-lg duration-200" onClick={props.toggle}>
            <IoChevronBackOutline size={'1.3rem'} />
          </button> 
          
          <h1 className='my-4 text-xl font-medium'>Other Information</h1>

          <div className="space-y-4">
            <div className="setting-input-container">
              <select value={data.sex} onChange={(e) => setData({...data, sex: e.target.value})} className='border-2 rounded-lg px-2 peer pt-7 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2]'>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <span className='setting-input-label'>Sex</span>
            </div>

            <div className="setting-input-container">
              <select value={data.department} onChange={(e) => setData({...data, department: e.target.value})} className='border-2 rounded-lg px-2 peer pt-7 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2]'>
                <option value="College of Allied Health">College of Allied Health</option>
                <option value="College of Architecture">College of Architecture</option>
                <option value="College of Business and Accountancy">College of Business and Accountancy</option>
                <option value="College of Computing and Information Technologies">College of Computing and Information Technologies</option>
                <option value="College of Education, Arts and Science">College of Education, Arts and Science</option>
                <option value="College of Engineering">College of Engineering</option>
                <option value="College of Tourism and Hospitality Management">College of Tourism and Hospitality Management</option>
              </select>
              <span className='setting-input-label'>Department</span>
            </div>

            <div className="setting-input-container">
              <input type="text"
                required
                value={data.position} 
                onChange={(e) => setData({...data, lastpositionName: e.target.value})}
                className='border-2 rounded-lg px-3 peer pt-7 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2] select-none cursor-not-allowed'
              />
              <span className='setting-input-label'>Position</span>
            </div>

          </div>
          <p className='text-[0.8rem] ml-0.5 mt-2'>Don't add any unusual capitalization, punctuation, characters or random words.</p>
          <input type="submit" value='Update' className='w-full text-white font-semibold bg-NuBlue py-3 px-14 mt-4 text-sm cursor-pointer rounded-lg duration-300 hover:bg-NuButtonHover' />
        </form> 
      </div>
    </div>
  )
}

const UpdateProfileModal = (props) => {
  const { user } = useContext(UserContext);
  const { updateProfile } = useUpdateProfilePicture();
  const [ profile, setProfile ] = useState(null);

  const updateProfilePicture = async (e) => {
    e.preventDefault();
    await updateProfile(profile, user._id, props);
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen overflow-auto z-10 flex bg-black/40 justify-center items-center font-Poppins">
      <div className="h-[69%] w-[35%] bg-white shadow-lg rounded-2xl px-6 py-6  space-y-5 overflow-hidden fade-in max-sm:h-[72%] max-sm:w-[85%]">
        <form onSubmit={updateProfilePicture} className='font-Poppins'>
          <button type="button" className="hover:bg-[#eae7e7] text-[#3b3c3c] border-2 px-2 py-2 rounded-lg duration-200" onClick={props.toggle}>
            <IoChevronBackOutline size={'1.3rem'} />
          </button> 

          <h1 className='my-4 text-xl font-medium'>Profile Picture</h1>
          <div className="flex justify-center items-center mx-auto overflow-hidden rounded-full h-56 w-56 border-2">
            {!profile ? (
              user ? (
                user.profilePicture ? (
                  <img src={user.profilePicture} alt="User Profile Picture" className='w-full h-full object-cover' />
                ) : (
                  <img 
                    src={user.sex === 'Male' ? maleProfile : femaleProfile} 
                    alt="User Default Profile" 
                    className='w-full h-full object-cover' 
                  />
                )
              ) : null // You can choose to return null or another placeholder if user is falsy
            ) : (
              <img src={URL.createObjectURL(profile)} alt="User Uploaded Profile" className='w-full h-full object-cover' />
            )}
          </div>

          <label className='flex justify-center items-center w-full font-semibold border-2 border-NuButton py-4 px-14 mt-4 text-sm rounded-lg duration-300 hover:bg-NuButtonHover hover:border-NuButtonHover hover:text-white cursor-pointer'>
            <input type='file' className='hidden' accept="image/*"  onChange={(e) => setProfile(e.target.files[0])}/>
            <p className='text-sm'>Upload a new photo</p>
          </label>

          {profile === null ? (
            <input type="submit" value='Save' className='w-full text-white font-semibold bg-NuBlue py-4 px-14 mt-4 text-sm rounded-lg duration-300 hover:bg-NuButtonHover cursor-not-allowed' disabled />
         
          ) : (
            <input type="submit" value='Save' className='w-full text-white font-semibold bg-NuBlue py-4 px-14 mt-4 text-sm cursor-pointer rounded-lg duration-300 hover:bg-NuButtonHover' />
          )}
        </form>
      </div>
    </div>
  )
}


