import React, { useState } from 'react';
import useLogout from '../../hooks/AuthHooks/useLogout.jsx';
import { Link } from 'react-router-dom'
import { useContext } from "react";
import { UserContext } from "../../../context/userContext.jsx";
import { TbSettings } from "react-icons/tb";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { RiUserSettingsLine } from "react-icons/ri";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import logo from '../../assets/images/NU_shield.png';
import maleProfile from '../../assets/images/male.png';
import femaleProfile from '../../assets/images/female.png';



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
            <img src={logo} alt="Nu Logo" className='h-9 mr-2'/>
            <div className="text-[#4b538f] font-semibold font-Poppins">
                <h1 className='text-[0.8rem] mt-[1.5px]'>NATIONAL UNIVERSITY</h1>
                <p className='leading-3 text-[0.8rem]'>Faculty Service Office</p>
            </div>
          </div>
          <div className="my-auto text-xl font-Poppins font-medium text-gray-400">{location}</div>
      </div>


      <div className="flex border-l-2 before:mr-5">
        <div className="relative duration-300 translate-y-1">
          <button onClick={() => setIsOpen((prev) => !prev)} className='flex justify-center items-center '>
            {!!user && user.gender === 'Male' ? (
              <img src={maleProfile} alt="" className='h-[33px] w-[33px] rounded-full'/>
            ) : (
              <img src={femaleProfile} alt="" className='h-[33px] w-[33px] rounded-full'/>
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
                <RiLogoutBoxRLine size={'1.1rem'} className='mr-2 translate-y-[1px]'/>
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
