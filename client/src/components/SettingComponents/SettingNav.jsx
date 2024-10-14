import React from 'react'
import { Link, useResolvedPath, useMatch } from 'react-router-dom';
import { TbShieldCog } from "react-icons/tb";
import { GoPerson } from "react-icons/go";

const SettingNav = () => {
  return (
    <div className='flex flex-col border-r-2 w-80 px-6 font-medium'>
      <p className='font-semibold text-lg text-gray-400 ml-2 mb-2'>My Profile</p>
      <ul className='space-y-1.5'>
        <ActiveLink to="/settings/personaldetails" className='flex hover:bg-NuButtonHover hover:text-white py-2.5 px-1.5 rounded-md duration-200'>
          <GoPerson className="text-2xl mr-2 font-bold"/>
          Profiles
        </ActiveLink>

        <ActiveLink to="/settings/password&security" className='flex hover:bg-NuButtonHover hover:text-white py-2.5 px-1.5 rounded-md duration-200'>
          <TbShieldCog className="text-2xl mr-2"/>
          Security
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
      <li className={isActive ? "settingNavActive" : ""}>
        <Link to = {to} {...props}>
          {children}
        </Link>
      </li>
    )
}