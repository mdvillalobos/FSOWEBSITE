import React from 'react'
import SettingNav from '../../components/SettingComponents/SettingNav.jsx';
import Security from '../../components/SettingComponents/Security.jsx';
import BackBtn from '../../components/Tools/AdminBack.jsx';
import Header from "../../components/Tools/Header.jsx";
import { UserContext } from '../../../context/userContext.jsx';

const PasswordSecurityAdmin = () => {
    const { user } = UserContext(UserContext);
    if(user === undefined) {
        return (
            <div className="flex justify-center items-center min-h-screen"> 
                <div className="cssloader">
                  <div className="triangle1"></div>
                  <div className="triangle2"></div>
                  <p className="text">Please Wait</p>
                </div>
            </div>
        )
    }
    
    return (
        <div>
            <div className='bg-[#f4f7fa] h-screen'>
                <Header location={'Account Settings'}/>
                <div className="px-16 py-2 max-sm:px-8">
                    <BackBtn/>
                    <div className="flex bg-white font-Poppins py-6 border-2 rounded-xl">
                        <SettingNav/>
                        <Security/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PasswordSecurityAdmin
