import React from 'react'
import Header from "../../components/Tools/Header.jsx";
import BackBtn from '../../components/Tools/AdminBack.jsx';
import ReportTable from '../../components/AdminComponents/ReportComponents/AdminReportTable.jsx';
import ReportButton from '../../components/AdminComponents/ReportComponents/AdminReportBtn.jsx';

const Survey = () => {
    return (
        <div className="bg-[#f4f7fa] h-[100dvh]">
            <Header location={'Weekly Report'}/>
            <div className="px-16 py-2">
                <BackBtn/>
                <div className='bg-white py-6 rounded-xl shadow-md overflow-hidden h-[80vh]'>
                    <ReportTable/>
                </div>
            </div>
        </div>
    )
}

export default Survey
