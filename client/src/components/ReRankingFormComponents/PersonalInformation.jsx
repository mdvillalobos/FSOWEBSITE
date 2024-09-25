import React from 'react'

const ApplicationMasterPage = ({ name, college, department, currentRank, academicYear, data, setData }) => {
  
  return (
    <div className="">
      <div className='border-t-2 border-b-2 border-[#35408E] py-4'>
        <h1 className='text-base font-semibold text-[#35408E] mb-5'>Personal Information</h1>
        <div className='flex justify-between'>
          <div className='flex justify-between flex-col space-y-4'>
            <div className="inputContainer">
              <label htmlFor="Name" className='text-sm font-normal'>Name:</label>
              <input type="text" id="Name" className='inputFields pointer-events-none' defaultValue={ name } disabled/>
            </div>
            <div className="inputContainer">
              <label htmlFor="college" className='text-sm font-normal'>College:</label>
              <input type="text" id="college" className='inputFields ' value={ college } onChange={(e) => setData({...data, college: e.target.value }) }/>
            </div>
            <div className="inputContainer">
              <label htmlFor="department" className='text-sm font-normal'>Department:</label>
              <input type="text" id="department" className='inputFields pointer-events-none' defaultValue={ department } disabled/>
            </div>
          </div>
          <div className='flex justify-between flex-col space-y-4'>
            <div className="inputContainer">
              <label htmlFor="rank" className='text-sm font-normal'>Current Rank:</label>
              <input type="text" id="rank" className='inputFields pointer-events-none' defaultValue={ currentRank } disabled/>
            </div>
            <div className="inputContainer">
              <label htmlFor="status" className='text-sm font-normal'>Status:</label>
              <input type="text" id="status" className='inputFields pointer-events-none' defaultValue='For Approval' disabled/>
            </div>
            <div className="inputContainer">
              <label htmlFor="term" className='text-sm font-normal'>AY/Term:</label>
              <input type="text" id="term" className='inputFields' value={ academicYear } onChange={(e) => setData({...data, academicYear: e.target.value })}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplicationMasterPage
