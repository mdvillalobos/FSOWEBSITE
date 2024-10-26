import React, { useContext } from 'react'
import Header from "../../components/Tools/Header.jsx";
import BackBtn from '../../components/Tools/AdminBack.jsx';
import PageHolder from  '../../components/UserComponents/ProfileComponents/PageHolder.jsx';
import ProfileModal from '../../components/UserComponents/ProfileComponents/ProfileModal.jsx';
import ProfileCard from  '../../components/UserComponents/ProfileComponents/ProfileCard.jsx';
import { UserContext } from '../../../context/userContext.jsx';

const Profile = () => {
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
        <div className="bg-[#f4f7fa] h-screen font-Poppins">
            <Header location={'Profile'} />
            <div className="px-16 py-2">
                <BackBtn/>
                <div className="flex h-full space-x-4">
                    <div className="flex-1 bg-white py-6 rounded-xl overflow-hidden border-2 w-[20vw]">
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
