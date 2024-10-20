import React from 'react'
import BackBtn from '../../components/Tools/Back.jsx';
import Header from "../../components/Tools/Header.jsx";
import SavedData from '../../components/UserComponents/RepositoryComponents/SavedData.jsx';
import ControlPanel from '../../components/UserComponents/RepositoryComponents/ControlPanel.jsx'

const Repository = () => {
    return (
        <div className="bg-[#f4f7fa] min-h-screen w-screen ">
            <Header location={ 'Repository' }/>
            <div className="px-16 py-2 max-sm:px-8">
                <BackBtn/>
                <div className='font-Poppins py-5 px-8 shadow-md rounded-xl bg-white space-y-4 max-sm:px-5  '>
                    <ControlPanel/>
                    <SavedData/>
                </div>
            </div>
        </div>
    )
}

export default Repository
