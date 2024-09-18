import React from 'react'
import {Link, useResolvedPath, useMatch} from 'react-router-dom';
import { CiUser } from "react-icons/ci";
import { FiShield } from "react-icons/fi";

const SettingNav = () => {
  return (
    <div className='flex flex-col bg-white p-4 mr-8 min-w-fit w-[30%] shadow-lg h-[40vh]'>
      <ul>
        <ActiveLink to="/settings/personaldetails" className='settingNav'>
          <CiUser className="text-2xl mr-2 font-bold"/>
          Profiles
        </ActiveLink>

        <ActiveLink to="/settings/password&security" className='settingNav'>
          <FiShield className="text-2xl mr-2"/>
          Password and Security
        </ActiveLink>
      </ul>
    </div>
  )
}

export default SettingNav

function ActiveLink({to, children, ...props}) {
    const path = useResolvedPath(to);
    const isActive = useMatch({path: path.pathname, end: true});

    return (
      <li className={isActive ? "active" : ""}>
        <Link to = {to} {...props}>
          {children}
        </Link>
      </li>
    )
}