import React from 'react'
import About from  '../../components/UserComponents/ProfileComponents/About.jsx';
import EducationalAttainment from '../../components/UserComponents/ProfileComponents/Educational.jsx';
import ProfileCard from  '../../components/UserComponents/ProfileComponents/ProfileCard.jsx';
import BackBtn from '../../components/Tools/Back.jsx';
import Header from "../../components/Tools/Header.jsx";

const Profile = () => {
  return (
    <div className="bg-[#f4f7fa] h-screen">
      <Header location={'Profile'}/>
      <div className="px-16 py-2">
          <BackBtn/>
          <div className="flex w-full space-x-10">
              <ProfileCard/>
              <div className="w-full">
                <About/>
                <EducationalAttainment/>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Profile
