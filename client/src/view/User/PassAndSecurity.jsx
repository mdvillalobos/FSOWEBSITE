import React from 'react'
import SettingNav from '../../components/SettingComponents/SettingNav.jsx';
import Security from '../../components/SettingComponents/Security.jsx';
import BackBtn from '../../components/Tools/Back.jsx';
import Header from "../../components/Tools/Header.jsx";

const PassAndSecurity = () => {
    return (
        <div>
            <div className='bg-[#f4f7fa] h-screen'>
                <Header location={'Account Settings'}/>
                <div className="px-16 py-2 max-sm:px-8">
                    <BackBtn/>
                    <div className="flex bg-white font-Poppins py-6 shadow-md rounded-xl">
                        <SettingNav/>
                        <Security/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PassAndSecurity
