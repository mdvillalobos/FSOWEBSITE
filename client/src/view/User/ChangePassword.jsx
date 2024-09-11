import React from 'react'
import SettingNav from '../../components/SettingComponents/SettingNav.jsx';
import ChangePasswordForm from '../../components/SettingComponents/ChangePasswordForm.jsx';
import BackBtn from '../../components/Tools/Back.jsx';
import Header from "../../components/Tools/Header.jsx";

const ChangePassword = () => {
  return (
    <div>
        <div className='bg-[#f4f7fa] h-screen'>
            <Header/>
            <div className="px-16 py-2">
                <BackBtn/>
                <div className="flex">
                    <SettingNav/>
                    <ChangePasswordForm/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChangePassword
