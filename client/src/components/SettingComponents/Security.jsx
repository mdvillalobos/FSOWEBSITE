import React, { useContext, useState } from 'react';
import useChangePassword from '../../hooks/UserHooks/useChangePassword';
import { UserContext } from '../../../context/userContext';
import { BiEditAlt } from "react-icons/bi";
import { IoChevronBackOutline } from "react-icons/io5";


const Security = () => {
  const { user } = useContext(UserContext);
  const [ seenPasswordModal, setSeenPasswordModal ] = useState(false)

  const togglePop = () => {
    setSeenPasswordModal(!seenPasswordModal)
  }

  return (
    <div className='px-6 w-full'>
      <h1 className='text-3xl font-medium mb-2 text-NuBlue'>Security</h1>

      <button className='flex justify-between w-full py-4'>
        <span className="text-left space-y-1.5">
          <p>Email Address</p>
          <p className='text-sm text-gray-400'>The email address associated with your account.</p>
        </span>
        <div className="flex space-x-8 text-right">
          <span>
            {!!user && (<p>{user.email}</p>)}
            <p>Verified</p>
          </span>
          <span className='flex my-auto border-2 rounded-md py-1.5 px-2 text-sm'>
            Edit
            <BiEditAlt className='ml-1.5 translate-y-0.5'/>
          </span>
        </div>
      </button>

      <div className='flex justify-between w-full py-4'>
        <span className="text-left space-y-1.5">
          <p>Password</p>
          <p className='text-sm text-gray-400'>Set a unique password to protect your account.</p>
        </span>
        <div className="flex space-x-8 text-right">
          <span>
            {!!user && (<p>{user.email}</p>)}
            <p>Verified</p>
          </span>
          <button className='flex my-auto border-2 rounded-md py-1.5 px-2 text-sm' onClick={togglePop}>
            Change Password
            <BiEditAlt className='ml-1.5 translate-y-0.5'/>
          </button>
        </div>
      </div>

      {seenPasswordModal ? <ChangePasswordForm toggle={togglePop}/> : null}
    
    </div>
  )
}

export default Security

const ChangePasswordForm = (props) => {
  const { ChangePassword } = useChangePassword();
  const [ data, setData ] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const {oldPassword, newPassword, confirmNewPassword} = data;
    await ChangePassword(oldPassword, newPassword, confirmNewPassword)
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen overflow-auto z-10 flex bg-black/40 justify-center items-center font-Poppins">
      <div className="h-[69%] w-[35%] bg-white shadow-lg rounded-2xl px-6 py-6  space-y-5 overflow-hidden font-Poppins">
        <div className="break-words text-sm">
          <form onSubmit={handleChangePassword} className='space-y-4'>
            <button className="hover:bg-[#eae7e7] text-[#3b3c3c] border-2 px-2 py-2 rounded-lg duration-200" onClick={props.toggle}>
              <IoChevronBackOutline size={'1.3rem'} />
            </button> 

            <div className="setting-input-container">
              <input type="text"
                required
                value={data.oldPassword} 
                onChange={(e) => setData({...data, oldPassword: e.target.value})}
                className='border-2 rounded-lg px-3 peer pt-7 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2]'
              />
              <span className='setting-input-label'>Old Password</span>
            </div>

            <div className="setting-input-container">
              <input type="text"
                required
                value={data.newPassword} 
                onChange={(e) => setData({...data, newPassword: e.target.value})}
                className='border-2 rounded-lg px-3 peer pt-7 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2]'
              />
              <span className='setting-input-label'>New Password</span>
            </div>

            <div className="setting-input-container">
              <input type="text"
                required
                value={data.confirmNewPassword} 
                onChange={(e) => setData({...data, confirmNewPassword: e.target.value})}
                className='border-2 rounded-lg px-3 peer pt-7 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2]'
              />
              <span className='setting-input-label'>Confirm New Password</span>
            </div>

            <input type="submit" value='Change Password' className='text-white bg-NuButton font-semibold py-3 w-full text-sm cursor-pointer hover:bg-NuButtonHover duration-200 rounded-md' />
          </form>
        </div>
      </div>
    </div>
  )
  
} 
