import React from 'react'
import { useLocation } from 'react-router-dom';
import ViewApplicationForm from '../../components/AdminComponents/ApplicationComponents/ViewApplicationForm.jsx';
import BackBtn from '../../components/Tools/AdminBack.jsx';
import Header from "../../components/Tools/Header.jsx";

const ViewApplication = () => {
    const location = useLocation();
    const { data } = location.state || {};

    return (
        <div className='bg-[#f4f7fa] h-full'>
            <Header/>
            <div className="px-14 pt-2 pb-4">
                <BackBtn from={'view'}/>
                <div className='bg-white py-4 px-8 mx-auto shadow-md rounded-xl overflow-hidden w-[70vw]'>
                    <ViewApplicationForm rest={ data }/>
                </div>
            </div>  
        </div>
    )
}

export default ViewApplication
