import React from 'react';
import Header from "../../components/Tools/Header.jsx";
import BackBtn from '../../components/Tools/AdminBack.jsx';
import ApplicationTable from '../../components/AdminComponents/ApplicationComponents/ApplicationTable.jsx';

const Application = () => {
    return (
        <div className="background-gradient h-screen">
            <Header location={'Applications For Re-Ranking'}/>
            <div className="px-16 py-2">
                <BackBtn/>
                <div className='bg-white py-4 px-8 shadow-md rounded-xl overflow-hidden'>
                <ApplicationTable/>
              </div>
            </div>
        </div>
    )
}

export default Application
