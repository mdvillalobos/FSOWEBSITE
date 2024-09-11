import React from 'react'
import SettingNav from '../../components/SettingComponents/SettingNav.jsx';
import PersonalDetails from '../../components/SettingComponents/PersonalDetailsForm.jsx';
import Back from '../../components/Tools/Back.jsx';
import Header from "../../components/Tools/Header.jsx";

const Setting = () => {
  return (
    <div className='bg-[#f4f7fa] h-screen'>
      <Header/>
      <div className="px-16 py-2">
        <Back/>
        <div className="flex">
          <SettingNav/>
          <PersonalDetails/>
        </div>
      </div>
    </div>
  )
}

export default Setting
