import React from 'react'
import BackBtn from '../../components/Tools/Back.jsx';
import Header from "../../components/Tools/Header.jsx";
import Dropdown from '../../components/UserComponents/ApplicationComponents/DropDown.jsx';

const Repository = () => {
    return (
        <div className="bg-[#f4f7fa] h-screen w-screen">
            <Header location={ 'Repository' }/>
            <div className="px-16 py-2">
                <BackBtn/>
                <div className='font-Poppins'>
                    <Dropdown from={ 'Repository' }/>
                </div>
            </div>
        </div>
    )
}

export default Repository
