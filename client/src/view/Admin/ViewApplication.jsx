import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom';
import ViewApplicationForm from '../../components/AdminComponents/ApplicationComponents/ViewApplicationForm.jsx';
import BackBtn from '../../components/Tools/AdminBack.jsx';
import Header from "../../components/Tools/Header.jsx";
import { UserContext } from '../../../context/userContext.jsx';

const ViewApplication = () => {
    const location = useLocation();
    const { data } = location.state || {};
    
    const { user } = useContext(UserContext);
    if(user === undefined) {
        return (
            <div className="flex justify-center items-center min-h-screen"> 
                <div className="cssloader">
                  <div className="triangle1"></div>
                  <div className="triangle2"></div>
                  <p className="text">Please Wait</p>
                </div>
            </div>
        )
    }
    
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
