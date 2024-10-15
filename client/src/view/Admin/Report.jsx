import React from 'react'
import Header from "../../components/Tools/Header.jsx";
import BackBtn from '../../components/Tools/AdminBack.jsx';
import ReportTable from '../../components/AdminComponents/ReportComponents/AdminReportTable.jsx';
import ReportButton from '../../components/AdminComponents/ReportComponents/AdminReportBtn.jsx';

const Survey = () => {
    return (
        <div className="bg-[#f4f7fa] h-[100dvh]">
            <Header location={'Weekly Report'}/>
            <div className="px-14 py-2">
                <BackBtn/>
                <div className='bg-white py-4 px-8 shadow-md rounded-xl overflow-hidden'>
                    <ReportTable/>
                </div>
            </div>
        </div>
    )
}

export default Survey
