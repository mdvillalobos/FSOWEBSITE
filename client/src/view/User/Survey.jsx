import React from 'react'
import Table from '../../components/UserComponents/SurveyComponent/SurveyTable.jsx';
import BackBtn from '../../components/Tools/Back.jsx';
import Header from "../../components/Tools/Header.jsx";

const Survey = () => {
  return (
    <div className='bg-[#f4f7fa] h-screen'>
      <Header/>
      <div className="px-16 py-2">
        <BackBtn/>
        <h1 className='text-4xl font-bold font-Poppins mb-4 mt-4 tracking-tight'>Survey</h1>
        <Table/>
      </div>
    </div>
  )
}

export default Survey
