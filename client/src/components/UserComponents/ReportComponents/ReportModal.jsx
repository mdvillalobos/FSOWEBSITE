import React, { useState } from 'react';
import { IoChevronBackOutline } from "react-icons/io5";
import useCreateReport from '../../../hooks/UserHooks/useCreateReport';

const ReportModal = () => {
  const [seen, setSeen] = useState(false)

  function togglePop() {
    setSeen(!seen)
  }

  return (
    <div className="flex font-Poppins">
      <button className='px-8 text-sm bg-NuButton text-white rounded-md py-1 duration-300 hover:bg-NuButtonHover hover:shadow-lg hover:scale-105' onClick={togglePop}>
        Create Report
      </button>
      {seen ? <CreateReport toggle={togglePop}/> : null}
    </div>
  )
}

export default ReportModal

function CreateReport(props) {;
  const { createReport } = useCreateReport();

  const dateNow = new Date()
  const tobeSubmitted = dateNow.toLocaleDateString('en-PH', {
    year: 'numeric',
    month: '2-digit', 
    day: '2-digit', 
  });

  const formattedDate = dateNow.toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'long', 
    day: '2-digit',
  });

  const [ data, setData ] = useState({
    subject: '',
    message: '', 
    date: tobeSubmitted
  });

  const handleSubmitReport = async (e) =>{
    e.preventDefault();
    await createReport(data.subject, data.message, data.date, props)
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen overflow-auto z-10 flex bg-black/40 justify-center items-center font-Poppins">
      <div className="h-[69%] w-[35%] bg-white shadow-lg rounded-2xl px-6 py-6  space-y-5 overflow-hidden fade-in ">
        <div className="break-words text-sm">
          <form onSubmit={handleSubmitReport} className='flex flex-col'>
            <button className="hover:bg-[#eae7e7] w-10 text-[#3b3c3c] border-2 px-2 py-2 rounded-lg duration-200" onClick={props.toggle}>
              <IoChevronBackOutline size={'1.3rem'} />
            </button>
          
            <h1 className='text-2xl my-4 font-medium'>Report Form</h1>
            <p className='border-2 px-4 py-2 rounded-lg my-auto mb-3'>{formattedDate}</p>
            <input 
                type="text" 
                placeholder='Subject'
                value={data.subject} 
                onChange={(e) => setData({...data, subject: e.target.value})} 
                className='rounded-lg mb-3 py-2 px-4 border-2 outline-none focus:border-[#c1c6f2] focus:bg-[#f3f4fd]'
            />

            <textarea 
              rows="7"
              placeholder='Message' 
              value={data.message} 
              onChange={(e) => setData({...data, message: e.target.value})} 
              className='resize-none h-[25vh] p-4 outline-none rounded-lg border-2 focus:border-[#c1c6f2] mb-2 focus:bg-[#f3f4fd]'
            />

            <div className="flex mt-4">
              <input type="submit" value="Submit" className=' py-3 px-10 text-sm bg-NuBlue text-white hover:bg-NuButtonHover duration-300 rounded-lg cursor-pointer shadow-md w-full'/>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}



