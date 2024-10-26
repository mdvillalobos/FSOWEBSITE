import React, { useContext } from 'react';
import { UserContext } from '../../../context/userContext.jsx';
import SettingNav from '../../components/SettingComponents/SettingNav.jsx';
import PersonalDetailsForm from '../../components/SettingComponents/PersonalDetailsForm.jsx';
import Back from '../../components/Tools/Back.jsx';
import Header from "../../components/Tools/Header.jsx";

const PersonalDetails = () => {
    const { user } = useContext(UserContext);

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
        <div className='bg-[#f4f7fa] h-screen'>
            <Header location={'Account Settings'}/>
            <div className="px-16 py-2 max-sm:px-8">
                <Back/>
                <div className="flex bg-white font-Poppins py-6 border-2 rounded-xl">
                    <SettingNav/>
                    <PersonalDetailsForm/>
                </div>
            </div>
        </div>
    )
}

export default PersonalDetails
