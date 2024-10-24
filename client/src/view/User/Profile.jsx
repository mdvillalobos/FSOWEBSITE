import React from 'react'
import PageHolder from  '../../components/UserComponents/ProfileComponents/PageHolder.jsx';
import ProfileModal from '../../components/UserComponents/ProfileComponents/ProfileModal.jsx';
import ProfileCard from  '../../components/UserComponents/ProfileComponents/ProfileCard.jsx';
import BackBtn from '../../components/Tools/Back.jsx';
import Header from "../../components/Tools/Header.jsx";

const Profile = () => {
    return (
        <div className="bg-[#f4f7fa] min-h-screen font-Poppins">
            <Header location={'Profile'} />
            <div className="px-16 py-2 max-sm:px-8">
                <BackBtn/>
                <div className="flex h-full space-x-4 max-sm:flex-col max-sm:space-y-4 max-sm:space-x-0">
                    <div className="flex-1 bg-white py-6 rounded-xl overflow-hidden border-2 w-[20vw] max-sm:w-full">
                        <ProfileCard/>
                    </div>
                    <div className="flex-1 space-y-4">
                        <ProfileModal/>
                        <PageHolder/>
                    </div>
                </div>
            </div>
      </div>
    )
}

export default Profile
