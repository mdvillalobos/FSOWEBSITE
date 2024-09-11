import React from 'react'

import DropDown from './DropDown.jsx';

const Choice = () => {
  return (
    <div className='w-full font-Poppins'>
      <div className="mr-12 p-6 rounded-lg overflow-hidden bg-[#4b538f] text-[#ffffff] font-light shadow-lg w-full">
        <p>Faculty Ranking System tracks:</p>
        <p>A. <span>Academic Track</span> - A faculty is assignmed to this track under the following conditions:</p>
        <ul className='ml-8'>
            <li>- a faculty is employed full-time at NU.</li>
            <li>- a part-time (PT) faculty with previes and or/current full-or-part-time work on teaching.</li>
            <li>- a part-time (PT) faulty without teaching industry work experience or licensure eligibility.</li>
        </ul>
        <p className='mt-4'>B. <span>Industry Practioner Track</span> - A faculty may be assigned to this track if he or she is a full-time industry practitioner and is employed.</p>
        <DropDown/>
      </div>
    </div>
  )
}

export default Choice
