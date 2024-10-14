import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import useEditProfile from '../../hooks/UserHooks/useEditProfile.jsx';
import useUpdateProfilePicture from '../../hooks/UserHooks/useUpdateProfilePicture.jsx';
import { BiEditAlt } from "react-icons/bi";
import { IoChevronBackOutline } from "react-icons/io5";
import { UserContext } from '../../../context/userContext.jsx';
import maleProfile from '../../assets/images/male.webp';
import femaleProfile from '../../assets/images/female.webp';

const PersonalDetailsForm = () => {
  const [ isNameOpen, setIsNameOpen ] = useState(false);
  const [ isProfileOpen, setIsProfileOpen ] = useState(false)

  return (
    <div className='px-6 w-full'>
      <h1 className='text-3xl font-medium mb-2 text-NuBlue'>Profiles</h1>

      <div className='flex justify-between w-full py-4 border-b'>
        <span className="text-left space-y-1.5">
          <p>Name</p>
          <p className='text-sm text-gray-400'>The email address associated with your account.</p>
        </span>
        <div className="flex space-x-8 text-right text-sm">
          <button className='flex my-auto border-2 rounded-md py-1.5 px-2 text-sm' onClick={() => setIsNameOpen(!isNameOpen)}>
            Edit
            <BiEditAlt className='ml-1.5 mt-0.5'/>
          </button>
        </div>
      </div>

      {isNameOpen ? <EditNameModal toggle={() => setIsNameOpen(!isNameOpen)}/> : null}

      <div className='flex justify-between w-full py-4 border-b'>
        <span className="text-left space-y-1.5">
          <p>Profile Picture</p>
          <p className='text-sm text-gray-400'>Set a unique password to protect your account.</p>
        </span>
        <button className='flex my-auto border-2 rounded-md py-1.5 px-2 text-sm' onClick={() => setIsProfileOpen(!isProfileOpen)}>
          Change Profile
          <BiEditAlt className='ml-1.5 mt-0.5'/>
        </button>
      </div>

      {isProfileOpen ? <EditProfile toggle={() => setIsProfileOpen(!isProfileOpen)}/> : null}
    </div>
    
  )
}

export default PersonalDetailsForm

const EditProfile = (props) => {
  const { user } = useContext(UserContext);
  const { updateProfile } = useUpdateProfilePicture();
  const [ profile, setProfile ] = useState(null);

  const updateProfilePicture = async (e) => {
    e.preventDefault();

    await updateProfile(profile, props);
  }

  console.log(profile)
  

  return (
    <div className="fixed top-0 left-0 w-screen h-screen overflow-auto z-10 flex bg-black/40 justify-center items-center font-Poppins">
      <div className="h-[69%] w-[35%] bg-white shadow-lg rounded-2xl px-6 py-6  space-y-5 overflow-hidden font-Poppins">
        <form onSubmit={updateProfilePicture} className='font-Poppins'>
          <button type="button" className="hover:bg-[#eae7e7] text-[#3b3c3c] border-2 px-2 py-2 rounded-lg duration-200" onClick={props.toggle}>
            <IoChevronBackOutline size={'1.3rem'} />
          </button> 

          <h1 className='my-4 text-xl font-medium'>Profile Picture</h1>
          <div className="flex justify-center items-center mx-auto overflow-hidden rounded-full h-56 w-56 border-2">
            {!profile ? (
              user ? (
                user.profilePicture ? (
                  <img src={user.profilePicture} alt="User Profile Picture" className='w-full h-full object-fill' />
                ) : (
                  <img 
                    src={user.sex === 'Male' ? maleProfile : femaleProfile} 
                    alt="User Default Profile" 
                    className='w-full h-full object-fill' 
                  />
                )
              ) : null // You can choose to return null or another placeholder if user is falsy
            ) : (
              <img src={URL.createObjectURL(profile)} alt="User Uploaded Profile" className='w-full h-full object-fill' />
            )}
          </div>

          <label className='flex justify-center items-center w-full font-semibold border-2 border-NuButton py-4 px-14 mt-4 text-sm rounded-lg duration-300 hover:bg-NuButtonHover hover:border-NuButtonHover hover:text-white cursor-pointer'>
            <input type='file' className='hidden' onChange={(e) => setProfile(e.target.files[0])}/>
            <p className='text-sm'>Upload a new photo</p>
          </label>

          <input type="submit" value='Save' className='w-full text-white font-semibold bg-NuBlue py-4 px-14 mt-4 text-sm cursor-pointer rounded-lg duration-300 hover:bg-NuButtonHover' />
        </form> 
      </div>
    </div>
  )

}


const EditNameModal = (props) => {
  const { EditProfile } = useEditProfile();
  const [ data, setData ] = useState({
    lastName: '',
    firstName: '',
    middleName: '', 
    email: '',
    employeeID: '',
    department: '',
  })

  useEffect(() => {
    axios.get('/api/getProfile')
    .then(res => setData(res.data))
    .catch(error => console.log(error))
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();
    const {lastName, firstName, middleName, email, employeeID, department} = data;
    await EditProfile(lastName, firstName, middleName, email, employeeID, department);
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen overflow-auto z-10 flex bg-black/40 justify-center items-center font-Poppins">
      <div className="h-[69%] w-[35%] bg-white shadow-lg rounded-2xl px-6 py-6  space-y-5 overflow-hidden font-Poppins">
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
            <p className='text-[0.8rem] ml-0.5 mt-1'>Don't add any unusual capitalization, punctuation, characters or random words.</p>
            <input type="submit" value='Update' className='w-full text-white font-semibold bg-NuBlue py-3 px-14 mt-4 text-sm cursor-pointer rounded-lg duration-300 hover:bg-NuButtonHover' />
          </form> 
        </div>
      </div>
    </div>

  )
}