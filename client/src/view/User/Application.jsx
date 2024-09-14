import React from 'react'
import Choices from '../../components/UserComponents/ApplicationComponents/Choice.jsx'
import BackBtn from '../../components/Tools/Back.jsx';
import Header from "../../components/Tools/Header.jsx";

const Application = () => {
  return (
    <div className="bg-[#f4f7fa] h-screen w-screen">
      <Header location={'Application For Re-Ranking'}/>
      <div className="px-16 py-2">
        <BackBtn/>
        <Choices/>
      </div>
    </div>
  )
}

export default Application
