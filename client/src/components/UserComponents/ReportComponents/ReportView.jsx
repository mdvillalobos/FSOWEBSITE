import React from 'react'
import { IoChevronBackOutline } from "react-icons/io5";

const ReportView = ({ handleExit, rest }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen overflow-auto z-10 flex bg-black/40 justify-center items-center font-Poppins">
      <div className="relative h-2/3 w-2/4 bg-white shadow-lg rounded-lg overflow-hidden fade-in px-10 py-5 ">
        <button className="hover:bg-[#eae7e7] w-10 text-[#3b3c3c] border-2 px-2 py-2 rounded-lg duration-200 mb-5" onClick={handleExit}>
          <IoChevronBackOutline size={'1.3rem'} />
        </button>
        <div className="space-y-6 break-words text-base">
          <div className="space-y-2 ">
            <p className='border-2 rounded-lg py-2 px-3'>{rest.date}</p>
            <p className='border-2 rounded-lg py-2 px-3'>{rest.subject}</p>
          </div>
          <p className='border-2 rounded-lg py-2 px-3 indent-8 overflow-auto h-[35vh]'>{rest.message}</p>
        </div>
      </div>
    </div>
  )
}

export default ReportView
