import React from 'react'
import Header from "../../components/Tools/Header.jsx";
import BackBtn from '../../components/Tools/AdminBack.jsx';
import ProfileCard from '../../components/UserComponents/ProfileComponents/ProfileCard.jsx';
import About from '../../components/UserComponents/ProfileComponents/About.jsx';

const Profile = () => {
    return (
        <div className="background-gradient h-screen">
            <Header location={'Profile'}/>
            <div className="px-16 py-2">
                <BackBtn/>
                <div className="flex w-full space-x-10">
                    <ProfileCard/>
                    <About/>
                </div>
            </div>
        </div>
    )
}

export default Profile
