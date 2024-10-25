import React from 'react'
import { MdFilterAlt } from "react-icons/md";

const ReportButton = () => {
  return (
    <div className='flex justify-between mb-4 mt-4'>
        <div className="">
          <h1 className='text-4xl font-semibold font-Montserrat'>Report</h1>
        </div>
      <button className='flex text-sm py-2 px-4 duration-300 bg-white mr-3'><span className=''><MdFilterAlt size={'1.2rem'}/></span>Filter</button>
    </div>
  )
}

export default ReportButton
