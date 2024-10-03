import React from 'react'
import Choices from '../../components/UserComponents/ApplicationComponents/Choice.jsx';
import DropDown from '../../components/UserComponents/ApplicationComponents/DropDown.jsx';
import BackBtn from '../../components/Tools/Back.jsx';
import Header from "../../components/Tools/Header.jsx";

const ApplicationForReRanking = () => {
    return (
        <div className="bg-[#f4f7fa] h-screen w-screen">
            <Header location={'Application For Re-Ranking'}/>
            <div className="px-16 py-2">
                <BackBtn/>
                <div className="mr-12 p-6 rounded-lg overflow-hidden bg-[#4b538f] text-[#ffffff] font-light shadow-lg w-full font-Poppins">
                    <Choices/>
                    <DropDown from={ 'Application For Re-Ranking' }/>
                </div>
            </div>
        </div>
    )
}

export default ApplicationForReRanking
