import React from 'react'
import Table from '../../components/UserComponents/ReportComponents/ReportTable.jsx';
import ReportModal from '../../components/UserComponents/ReportComponents/ReportModal.jsx';
import BackBtn from '../../components/Tools/Back.jsx';
import Header from "../../components/Tools/Header.jsx";

const Report = () => {
    return (
        <div className='background-gradient h-[100dvh]'>
            <Header location={'Weekly Report'}/>
            <div className="px-16 py-2">
                <BackBtn/>
                <div className='bg-white py-5 px-8 shadow-md rounded-xl overflow-hidden'>
                    <div className="flex justify-end mb-2">
                        <ReportModal/>
                    </div>
                    <Table/>
                </div>
            </div>  
        </div>
    )
}

export default Report
