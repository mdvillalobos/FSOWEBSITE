import React, { useContext } from 'react'
import SettingNav from '../../components/SettingComponents/SettingNav.jsx';
import PersonalDetailsForm from '../../components/SettingComponents/PersonalDetailsForm.jsx';
import Back from '../../components/Tools/AdminBack.jsx';
import Header from "../../components/Tools/Header.jsx";
import { UserContext } from '../../../context/userContext.jsx';

const PersonalDetailsAdmin = () => {
    const { user } = useContext(UserContext);
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

export default PersonalDetailsAdmin
