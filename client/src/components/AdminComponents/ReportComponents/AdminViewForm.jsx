import React from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";

const ReportView = ({handleExit, rest}) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen overflow-auto z-10 flex bg-black/40 justify-center items-center font-Poppins">
      <div className="relative h-2/3 w-2/4 bg-white shadow-lg rounded-md overflow-hidden">
        <button onClick={handleExit} className='text-xl p-2 duration-300 rounded-full hover:bg-[#eae7e7] text-[#3b3c3c]'><IoMdArrowRoundBack /></button> 
        <div className="px-16 py-10 space-y-8 break-words text-base">
          <div className="space-y-2 ">
            <p>From: {rest.email}</p>
            <p>Date: {rest.date}</p>
          </div>
          <p className='indent-8 overflow-auto h-[50vh]'>{rest.message}</p>
        </div>
      </div>
    </div>
  )
}

export default ReportView
