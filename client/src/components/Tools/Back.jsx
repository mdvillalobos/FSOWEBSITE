import React from 'react'
import { Link } from 'react-router-dom'
import { MdKeyboardArrowLeft  } from "react-icons/md";

const Back = () => {
  return (
    <div>
        <Link to='/home' className="flex my-4 w-24 duration-300 hover:text-NuButtonHover">
          <MdKeyboardArrowLeft className='translate-y-[1.5px]' size={'1.3rem'}/>
          {/* <IoIosArrowRoundBack size="1.3rem" className="translate-y-0.5" /> */}
          <p className="text-sm font-Poppins font-semibold relative ml-0.5 top-0.5">Back</p>
        </Link>
    </div> 
  )
}

export default Back
