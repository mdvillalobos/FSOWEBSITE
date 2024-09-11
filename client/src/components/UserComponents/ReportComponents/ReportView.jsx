import React from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";

const ReportView = ({handleExit, rest}) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full overflow-auto'>
      <div className='absolute h-2/3 w-2/4 min-w-content top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] font-Poppins'>
        <div className="bg-white mb-2 rounded-md shadow-lg py-2 px-2">
          <button onClick={handleExit} className='text-xl p-2 duration-300 rounded-full hover:bg-[#eae7e7] text-[#3b3c3c]'><IoMdArrowRoundBack /></button> 
        </div>
        <div className="bg-white h-[88%] shadow-lg rounded-md">
          <div className="px-16 py-10 space-y-8 break-words text-sm">
            <p>Date: <span className=''>{rest.date}</span></p>
            <p className='indent-8'>{rest.message}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportView
