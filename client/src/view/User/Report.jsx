import React from 'react'
import Table from '../../components/UserComponents/ReportComponents/ReportTable.jsx';
import ReportModal from '../../components/UserComponents/ReportComponents/ReportModal.jsx';
import BackBtn from '../../components/Tools/Back.jsx';
import Header from "../../components/Tools/Header.jsx";

const Report = () => {
    return (
        <div className='bg-[#f4f7fa] min-h-screen'>
            <Header location={'Weekly Report'}/>
            <div className="px-16 py-2 max-sm:px-8">
                <BackBtn/>
                <div className='bg-white py-6 rounded-xl shadow-md overflow-hidden h-[80vh]'>
                    <Table/>
                </div>
            </div>  
        </div>
    )
}

export default Report
