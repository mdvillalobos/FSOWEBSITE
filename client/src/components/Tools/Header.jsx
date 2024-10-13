import React, { useState } from 'react';
import useLogout from '../../hooks/AuthHooks/useLogout.jsx';
import { Link } from 'react-router-dom'
import { useContext } from "react";
import { UserContext } from "../../../context/userContext.jsx";
import { TbSettings } from "react-icons/tb";
import { LuLogOut } from "react-icons/lu";
import { RiUserSettingsLine } from "react-icons/ri";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import logo from '../../assets/images/NU_shield.webp';
import maleProfile from '../../assets/images/male.webp';
import femaleProfile from '../../assets/images/female.webp';

const header = ({location}) => {
  const {user} = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const { Logout } = useLogout();
  const handleLogout = () => {
    Logout();
  }

  return (
    <div className='flex py-5 px-16 shadow bg-white justify-between max-sm:px-8'>
      <div className='flex space-x-6'>
          <div className="flex my-auto mx-0 after:border-r-2 after:ml-5">
            <img src={logo} alt="Nu Logo" className='mr-1.5 translate-y-0.5 h-auto w-7 max-[396px]:w-7'/>
            <div className="text-[#41518d] font-semibold font-Poppins max-[396px]:hidden">
                <h1 className='text-[0.8rem] mt-[1.5px]'>NATIONAL UNIVERSITY</h1>
                <p className='leading-3 text-[0.8rem]'>Faculty Service Office</p>
            </div>
          </div>
          <div className="my-auto text-xl font-Poppins font-medium text-gray-500">{location}</div>
      </div>


      <div className="flex border-l-2 before:mr-5">
        <div className="relative duration-300 translate-y-1">
          <button onClick={() => setIsOpen((prev) => !prev)} className='flex justify-center items-center'>
            {!!user && user.profilePicture ? (
              <div className="flex items-center justify-center w-[33px] h-[33px] overflow-hidden rounded-full">
                <img src={user.profilePicture} alt="Profile Picture" className='w-full h-full object-fill'/>
              </div>
            ) : (
              user.gender === 'Male' ? (
                <div className="w-[33px] h-[33px] overflow-hidden rounded-full flex items-center justify-center">
                  <img src={maleProfile} alt="Profile Picture" className='w-full h-auto object-cover'/>
                </div>
              ) : (
                <div className="w-[33px] h-[33px] overflow-hidden rounded-full flex items-center justify-center">
                  <img src={femaleProfile} alt="Profile Picture" className='w-full h-auto object-cover'/>
                </div>
              )
            )}
            {!!user && (<p className='text-[0.8rem] ml-3 text-black font-medium font-Poppins max-sm:hidden'>{user.firstName} {user.lastName}</p>)}
            
            {!isOpen ? (
              <RiArrowDropDownLine size={'1.5rem'}/>
            ) : (
              <RiArrowDropUpLine size={'1.5rem'}/>
            )}
          </button>
          
          {isOpen && (
            <div className="absolute top-14 right-0 bg-white shadow-md p-3 rounded-lg w-60">
              <Link to='/settings/personaldetails' className='dropDownItem'>
                <RiUserSettingsLine size={'1.1rem'} className='mr-2'/>
                Account Settings
              </Link>

              <Link to='/settings/personaldetails' className='dropDownItem'>
                <TbSettings size={'1.1rem'} className='mr-2 translate-y-[1px]'/>
                Settings
              </Link>

              <div className="w-full h-[1.5px] my-1 bg-[#e5e7eb]"></div>

              <button onClick={handleLogout} className='dropDownItem'>
                <LuLogOut size={'1.1rem'} className='mr-2 translate-y-[1px]'/>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default header
