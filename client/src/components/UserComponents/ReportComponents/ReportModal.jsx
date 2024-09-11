import { React, useState } from 'react';
import { LuPencil } from "react-icons/lu";
import useCreateReport from '../../../hooks/FacultyHooks/useCreateReport';

const ReportModal = () => {
  const [seen, setSeen] = useState(false)

  function togglePop() {
    setSeen(!seen)
  }

  return (
    <div className="flex font-Poppins">
      <button className='flex items-center px-4 text-sm bg-NuButton text-white hover:bg-NuButtonHover hover:shadow-lg rounded-lg py-2 shadow-md' onClick={togglePop}>
        <LuPencil size={'0.9rem'} className='mr-2 relative top-[-0.5px]'/>
        Create Report
      </button>
        {seen ? <CreateReport toggle={togglePop}/> : null}
    </div>
  )
}

export default ReportModal

function CreateReport(props) {
  const [data, setData] = useState({
    subject: '',
    message: '', 
    date: '' 
  });

  const {createReport} = useCreateReport();
  
  const handleSubmitReport = async (e) =>{
    e.preventDefault();
    const {subject, message, date} = data;
    await createReport(subject, message, date, props)
  }

  return (
    <div className="fixed flex justify-center items-center left-0 top-0 w-screen h-screen backdrop-brightness-90">
      <div className="relative h-[69%] w-[35%] shadow-lg rounded-md overflow-hidden font-poppins">
        <div className="relative bg-white shadow-lg rounded-2xl px-7 py-7 h-full space-y-5">
          <div className=" flex justify-between">
            <div className="space-y-1">
              <h2 className='text-3xl font-bold font-Poppins'>REPORT FORM</h2>
              <p className='text-[0.7rem] text-gray-400'>you can construct here your report regarding to your weekly achievements, about your day and your work.</p>
            </div>
            <button onClick={props.toggle} className='absolute right-3 top-5 px-2 text-4xl duration-300 hover:bg-[#E8E8E8] text-gray-400 rounded-full'>&times;</button>
          </div>
          <div className="break-words text-sm">
            <form onSubmit={handleSubmitReport} className='flex flex-col'>
              <input 
                type="date" 
                value={data.date} 
                onChange={(e) => setData({...data, date: e.target.value})} 
                className='rounded-lg px-2 mb-3 w-52 py-2 text-xs border-2 outline-none focus:border-[#c1c6f2] focus:bg-[#f3f4fd]'
              />

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
    </div>
  )
}



