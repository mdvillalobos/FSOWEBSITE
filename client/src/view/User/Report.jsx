import React from 'react'
import Table from '../../components/UserComponents/ReportComponents/ReportTable.jsx';
import ReportModal from '../../components/UserComponents/ReportComponents/ReportModal.jsx';
import BackBtn from '../../components/Tools/Back.jsx';
import Header from "../../components/Tools/Header.jsx";

const Report = () => {
  return (
    <div className='bg-[#f4f7fa] h-[100dvh]'>
      <Header/>
      <div className="px-14 py-2">
        <BackBtn/>
          <div className='bg-white py-4 px-8 shadow-md rounded-xl overflow-hidden'>
            <div className="flex justify-between mb-6">
              <div className="font-Poppins">
                <p className='text-3xl mt-1 font-Poppin font-semibold text-NuBlue tracking-tight'>Weekly Report</p>
              </div>
              <ReportModal/>
            </div>
            <Table/>
          </div>
      </div>  
    </div>
  )
}

export default Report
