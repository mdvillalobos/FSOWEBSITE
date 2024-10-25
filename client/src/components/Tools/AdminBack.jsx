import React from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io";

const Back = ({from}) => {
  return (
    <div>
        <Link to={from === 'view' ? "/admin/application"  : '/admin/home'}className='flex no-underline my-4 w-24 duration-300 rounded-lg'>
            <IoIosArrowRoundBack size='1.3rem' className='translate-y-0.5'/>
            <p className='text-sm font-Poppins font-semibold relative ml-0.5 top-0.5'>Back</p>
        </Link>
    </div> 
  )
}

export default Back
