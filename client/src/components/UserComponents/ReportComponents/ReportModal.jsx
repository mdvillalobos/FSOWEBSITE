import React, { useState } from 'react';
import { LuPencil } from "react-icons/lu";
import { IoChevronBackOutline } from "react-icons/io5";
import useCreateReport from '../../../hooks/UserHooks/useCreateReport';

const ReportModal = () => {
  const [seen, setSeen] = useState(false)

  function togglePop() {
    setSeen(!seen)
  }

  return (
    <div>
      <div className="flex font-Poppins">
        <button className='flex items-center px-4 text-sm bg-NuButton text-white hover:bg-NuButtonHover hover:shadow-lg rounded-lg py-2 shadow-md duration-300 transform hover:scale-105' onClick={togglePop}>
          <LuPencil size={'0.9rem'} className='mr-2 relative top-[-0.5px]'/>
          Create Report
        </button>
      </div>
        {seen ? <CreateReport toggle={togglePop}/> : null}
    </div>
  )
}

export default ReportModal

function CreateReport(props) {
  const dateNow = new Date();
  const { createReport } = useCreateReport();
  const [ data, setData ] = useState({
    subject: '',
    message: '', 
    date: dateNow.toLocaleDateString()
  });

  console.log(data.date)

  const handleSubmitReport = async (e) =>{
    e.preventDefault();
    await createReport(data.subject, data.message, data.date, props)
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen overflow-auto z-10 flex bg-black/40 justify-center items-center font-Poppins">
      <div className="h-[69%] w-[35%] bg-white shadow-lg rounded-2xl px-6 py-6  space-y-5 overflow-hidden font-Poppins">
        <div className="break-words text-sm">
          <form onSubmit={handleSubmitReport} className='flex flex-col'>
            <div className="flex justify-between">
              <button className="hover:bg-[#eae7e7] text-[#3b3c3c] border-2 px-2 py-2 rounded-lg duration-200" onClick={props.toggle}>
                <IoChevronBackOutline size={'1.3rem'} />
              </button>
              <p className='border-2 px-10 py-2 rounded-lg'>{dateNow.toDateString()}</p>
            </div>

            <input 
                type="text" 
                placeholder='Subject'
                value={data.subject} 
                onChange={(e) => setData({...data, subject: e.target.value})} 
                className='rounded-lg px-2 mb-3 py-2 border-2 outline-none focus:border-[#c1c6f2] focus:bg-[#f3f4fd]'
            />

            <textarea 
              rows="7"
              placeholder='Message' 
              value={data.message} 
              onChange={(e) => setData({...data, message: e.target.value})} 
              className='resize-none h-[25vh] p-4 outline-none rounded-lg border-2 focus:border-[#c1c6f2] mb-2 focus:bg-[#f3f4fd]'
            />

            <div className="flex mt-4">
              <input type="submit" value="Submit" className=' py-3 px-10 text-sm bg-[#4b538f] text-white hover:bg-[#5d69c6] duration-300 rounded-lg cursor-pointer shadow-lg hover:shadow-lg w-full'/>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}



