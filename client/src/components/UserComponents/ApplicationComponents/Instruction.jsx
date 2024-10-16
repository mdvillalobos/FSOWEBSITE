import React from 'react'

const Instruction = () => {
  return (
    <div>
      <p className='text-2xl mb-3 font-medium text-NuButton'>Faculty Ranking System tracks:</p>
      <p>A. <span className='font-semibold text-NuButton'>Academic Track</span> - A faculty is assignmed to this track under the following conditions:</p>
      <ul className='ml-8'>
          <li>- a faculty is employed full-time at NU.</li>
          <li>- a part-time (PT) faculty with previes and or/current full-or-part-time work on teaching.</li>
          <li>- a part-time (PT) faulty without teaching industry work experience or licensure eligibility.</li>
      </ul>
      <p className='mt-4'>B. <span className='font-semibold text-NuButton'>Industry Practioner Track</span> - A faculty may be assigned to this track if he or she is a full-time industry practitioner and is employed.</p>

     {/*  <button className='text-white py-2 px-4 bg-NuButton rounded-md shadow-md duration-300 hover:bg-NuButtonHover w-full mt-4'>Apply Now</button> */}
    </div>
  )
}

export default Instruction
