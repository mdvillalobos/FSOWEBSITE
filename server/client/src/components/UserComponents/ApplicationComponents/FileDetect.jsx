import React from 'react'
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const FileDetect = ({ handleExit, rest }) => {
    const navigate = useNavigate();

    const handleConfirm = () => {
        return navigate('/application/form/edit', { state: { files: rest, from: 'Application' }})
    }

    return (
        <div className="fixed top-0 left-0 w-screen h-screen overflow-auto z-10 flex bg-black/40 justify-center items-center font-Poppins">
            <div className="h-[69%] w-[35%] bg-white shadow-lg rounded-2xl px-6 py-6 space-y-5 overflow-hidden fade-in max-sm:h-[72%] max-sm:w-[85%]">
                <button className="hover:bg-[#eae7e7] w-10 text-[#3b3c3c] border-2 px-2 py-2 rounded-lg duration-200" onClick={handleExit}>
                    <IoChevronBackOutline size={'1.3rem'} />
                </button> 
                <p>We detected that you have a saved application form, applying for {rest.applyingFor} on your repository. Do you want to use it?</p>
                <button type='button' onClick={handleExit}>Cancel</button>
                <button onClick={handleConfirm}>Confirm</button>
            </div>
        </div>
    )
}

export default FileDetect
