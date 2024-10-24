import React, { useContext, useState } from 'react';
import useChangePassword from '../../hooks/UserHooks/useChangePassword';
import { UserContext } from '../../../context/userContext';
import { BiEditAlt } from "react-icons/bi";
import { IoChevronBackOutline } from "react-icons/io5";
import { TiWarningOutline } from "react-icons/ti";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import IconButton from '@mui/material/IconButton';

const Security = () => {
  const { user, role } = useContext(UserContext);
  const [ seenEditEmail, setSeenEditEmail ] = useState(false)
  const [ seenPasswordModal, setSeenPasswordModal ] = useState(false)

  return (
    <div className='px-6 w-full'>
      <h1 className='text-3xl font-medium mb-2 text-NuBlue'>Security</h1>

      <div className='flex justify-between w-full py-4 border-b '>
        <span className="text-left space-y-1.5">
          <p>Email Address</p>
          <p className='text-sm text-gray-500 max-sm:hidden'>The email address associated with your account.</p>
        </span>
        <div className="flex space-x-10 text-right">
          <span className='max-sm:hidden'>
            {!!user && (<p>{user.email}</p>)}
            <p className='pt-1.5 text-sm text-green-400'>Verified</p>
          </span>
          <button className='flex my-auto py-2 px-4 text-sm bg-NuButton text-white hover:bg-NuButtonHover hover:shadow-lg rounded-lg shadow-md duration-300 hover:scale-105' onClick={() => setSeenEditEmail(!seenEditEmail)}>
            <span className='max-sm:hidden'>Edit</span>
            <BiEditAlt className='ml-1.5 mt-0.5 max-sm:ml-0 max-sm:mt-0'/>
          </button>
        </div>
      </div>

      {seenEditEmail ? <ChangeEmailForm toggle={() => setSeenEditEmail(!seenEditEmail)}/> : null}

      <div className='flex justify-between w-full py-4 border-b'>
        <span className="text-left space-y-1.5">
          <p>Password</p>
          <p className='text-sm text-gray-500 max-sm:hidden'>Set a unique password to protect your account.</p>
        </span>
        <button className='flex my-auto py-2 px-4 text-sm bg-NuButton text-white hover:bg-NuButtonHover hover:shadow-lg rounded-lg shadow-md duration-300 hover:scale-105' onClick={() => setSeenPasswordModal(!seenPasswordModal)}>
        <span className='max-sm:hidden'>Change Password</span>
          <BiEditAlt className='ml-1.5 mt-0.5 max-sm:ml-0 max-sm:mt-0'/>
        </button>
      </div>

      {seenPasswordModal ? <ChangePasswordForm toggle={() => setSeenPasswordModal(!seenPasswordModal)}/> : null}
    
    </div>
  )
}

export default Security

const ChangeEmailForm = (props) => {
  const { ChangePassword } = useChangePassword();
  const [ data, setData ] = useState({
    email: '',
  })

  const handleChangePassword = async (e) => {
    e.preventDefault();

    await ChangePassword(data.email)
  }

  return(
    <div className="fixed top-0 left-0 w-screen h-screen overflow-auto z-10 flex bg-black/40 justify-center items-center font-Poppins">
      <div className="h-[40%] w-[35%] bg-white shadow-lg rounded-2xl px-6 py-6 space-y-5 overflow-hidden fade-in max-sm:h-[72%] max-sm:w-[85%]">
        <div className="break-words text-sm">
          <form onSubmit={handleChangePassword} className='space-y-4'>
            <button type='button' className="hover:bg-[#eae7e7] text-[#3b3c3c] border-2 px-2 py-2 rounded-lg duration-200" onClick={props.toggle}>
              <IoChevronBackOutline size={'1.3rem'} />
            </button> 

            <h1 className='my-4 text-xl font-medium'>Update Email</h1>
            <div className="setting-input-container">
              <input type="text"
                required
                value={data.email} 
                onChange={(e) => setData({...data, email: e.target.value})}
                className='border-2 rounded-lg px-3 peer pt-7 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2]'
              />
              <span className='setting-input-label'>Email</span>
            </div>

            <input type="submit" value='Update' className='text-white bg-NuButton font-semibold py-3 w-full text-sm cursor-pointer hover:bg-NuButtonHover duration-200 rounded-md' />
          </form>
        </div>
      </div>
    </div>
  )
}

const ChangePasswordForm = (props) => {
  const { ChangePassword } = useChangePassword();
  const [ showOldPass, setShowOldPass ] = useState(false);
  const [ showNewPass, setShowNewPass ] = useState(false);
  const [ showConfirmPass, setShowConfirmPass ] = useState(false);

  const [ data, setData ] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })

  const handleChangePassword = async (e) => {
    e.preventDefault();
    await ChangePassword(data.oldPassword, data.newPassword, data.confirmNewPassword)
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen overflow-auto z-10 flex bg-black/40 justify-center items-center font-Poppins">
      <div className="h-[65%] w-[35%] bg-white shadow-lg rounded-2xl px-6 py-6 space-y-5 overflow-hidden fade-in max-sm:h-[70%] max-sm:w-[85%]">
        <div className="break-words text-sm">
          <form onSubmit={handleChangePassword} className='space-y-4'>
            <button type='button' className="hover:bg-[#eae7e7] text-[#3b3c3c] border-2 px-2 py-2 rounded-lg duration-200" onClick={props.toggle}>
              <IoChevronBackOutline size={'1.3rem'} />
            </button> 

            <h1 className='my-4 text-xl font-medium'>Change Password</h1>
            <div className="setting-input-container">
              <input type={showOldPass ? 'text' : 'password'}
                required
                value={data.oldPassword} 
                onChange={(e) => setData({...data, oldPassword: e.target.value})}
                className='border-2 rounded-lg px-3 peer pt-7 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2]'
              />
              <span className='setting-input-label'>Old Password</span>
              <button type='button'  onClick={() => setShowOldPass((prev) => !prev)} className='absolute right-2 top-[0.8rem] text-gray-500 hover:bg-gray-300 rounded-full py-1.5 px-1.5 duration-200'>
                {showOldPass ? <FaEyeSlash size="20px" opacity="80%"/> : <IoEyeSharp size="20px" opacity="80%"/>}
              </button>
            </div>

            <div className="setting-input-container">
              <input type={showNewPass ? 'text' : 'password'}
                required
                value={data.newPassword} 
                onChange={(e) => setData({...data, newPassword: e.target.value})}
                className='border-2 rounded-lg px-3 peer pt-7 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2]'
              />
              <span className='setting-input-label'>New Password</span>
              <button type='button'  onClick={() => setShowNewPass((prev) => !prev)} className='absolute right-2 top-[0.8rem] text-gray-500 hover:bg-gray-300 rounded-full py-1.5 px-1.5 duration-200'>
                {showNewPass ? <FaEyeSlash size="20px" opacity="80%"/> : <IoEyeSharp size="20px" opacity="80%"/>}
              </button>
            </div>

            <div className="setting-input-container">
              <input type={showConfirmPass ? 'text' : 'password'}
                required
                value={data.confirmNewPassword} 
                onChange={(e) => setData({...data, confirmNewPassword: e.target.value})}
                className='border-2 rounded-lg px-3 peer pt-7 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2]'
              />
              <span className='setting-input-label'>Confirm New Password</span>
              <button type='button'  onClick={() => setShowConfirmPass((prev) => !prev)} className='absolute right-2 top-[0.8rem] text-gray-500 hover:bg-gray-300 rounded-full py-1.5 px-1.5 duration-200'>
                {showConfirmPass ? <FaEyeSlash size="20px" opacity="80%"/> : <IoEyeSharp size="20px" opacity="80%"/>}
              </button>
            </div>

            <p className='text-[0.8rem] ml-0.5 mt-2'>Your password must contain at least one uppecase letter, one lowercase letter, one number and one special character(_-@#$&).</p>
            <input type="submit" value='Change Password' className='text-white bg-NuButton font-semibold py-3 w-full text-sm cursor-pointer hover:bg-NuButtonHover duration-200 rounded-md' />
          </form>
        </div>
      </div>
    </div>
  )
  
} 
