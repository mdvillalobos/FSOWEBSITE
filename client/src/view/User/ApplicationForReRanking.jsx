import React from 'react'
import Instruction from '../../components/UserComponents/ApplicationComponents/Instruction.jsx';
import DropDown from '../../components/UserComponents/ApplicationComponents/DropDown.jsx';
import BackBtn from '../../components/Tools/Back.jsx';
import Header from "../../components/Tools/Header.jsx";

const ApplicationForReRanking = () => {
    return (
        <div className="bg-[#f4f7fa] h-screen w-screen font-Poppins">
            <Header location={'Application For Re-Ranking'}/>
            <div className="px-16 py-2">
                <BackBtn/>
                <div className="font-Poppins py-5 px-8 shadow-md rounded-xl bg-white">
                    <Instruction/>
                    <DropDown from={ 'Application For Re-Ranking' }/>
                </div>
            </div>
        </div>
    )
}

export default ApplicationForReRanking
