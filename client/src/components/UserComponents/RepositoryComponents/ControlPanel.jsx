import React, { useState } from 'react';
import { IoChevronBackOutline } from "react-icons/io5";
import Dropdown from '../ApplicationComponents/DropDown.jsx';

const ControlPanel = () => {
    const [seen, setSeen] = useState(false)

    const togglePop = () => {
        setSeen(!seen)
    }
    return (
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-Poppins font-bold text-lg">Applications</h2>
        <button className="bg-[#41518d] text-white px-10 py-1.5 text-sm rounded-md hover:bg-[#5d69c6] duration-300 transform hover:scale-105" onClick={togglePop}>Create</button>
        {seen ? <CreateApplication toggle={togglePop} /> : null}
      </div>
        
    )
}

export default ControlPanel

const CreateApplication = (props) => {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen overflow-auto z-10 flex bg-black/40 justify-center items-center font-Poppins">
        <div className="relative h-[90vh] w-[80vw] bg-white shadow-lg rounded-xl px-7 py-7  space-y-5 overflow-hidden font-Poppins">
            <button className="hover:bg-[#eae7e7] text-[#3b3c3c] border-2 px-2 py-2 rounded-md duration-200" onClick={props.toggle}>
                <IoChevronBackOutline size={'1.3rem'} />
            </button>
            <Dropdown from={ 'Repository' }/>
        </div>
      </div>
    )
  }