import React from 'react'
import Choices from '../../components/UserComponents/ApplicationComponents/Choice.jsx'
import BackBtn from '../../components/Tools/Back.jsx';
import Header from "../../components/Tools/Header.jsx";

const Application = () => {
  return (
    <div className="bg-[#f4f7fa] h-screen w-screen">
    <Header />
      <div className="px-16 py-2">
        <BackBtn/>
        <h1 className='text-4xl font-semibold font-Montserrat mb-4 mt-4'>Application For Re-Ranking</h1>
        <Choices/>
      </div>
    </div>
  )
}

export default Application
