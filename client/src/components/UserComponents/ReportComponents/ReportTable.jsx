import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ViewForm from './ReportView.jsx';
import { FaRegEdit } from "react-icons/fa";

const ReportTable = () => {
  const [data, setData] = useState([]);
  const [openView, setOpenView] = useState(false);
  const [viewData, setViewData] = useState()

  const handleExit = () => {
    setOpenView(false)
  }

  const handleView = (columnID) => {
    setViewData(columnID)
    setOpenView(true)
  }

  useEffect(() => {
    axios.get('/api/getreport')
    .then(data => setData(data.data))
    .catch(error => console.log(error))
  }, []);

  return (
    <div>
      {openView && (
        <ViewForm 
          handleExit={handleExit} 
          rest={viewData}
        />
      )}
      <table className='table-auto w-full rounded-md font-Poppins divide-y-4 divide-white'>
        <thead>
          <tr className=''>
            <th className='px-10 py-2 font-semibold text-left w-[15%]'>Subject</th>
            <th className='px-10 py-2 font-semibold text-left w-[40%]'>Report</th>
            <th className='px-10 py-2 font-semibold text-left'>Date</th>
            <th className='px-10 py-2 font-semibold text-left'>Action</th>
            <th></th>
          </tr>
        </thead>
        <tbody className='divide-y-8 divide-white'>
          {data.map(i =>(
            <tr key={i._id} onClick={() => handleView(i)} className=' cursor-pointer duration-200 hover:bg-[#5d69c6] text-sm bg-[#f2f6f9] text-gray-600 hover:text-white'>
              <td className='px-10 py-4 max-w-[200px] text-ellipsis overflow-hidden whitespace-nowrap'>{i.subject}</td>
              <td className='px-10 py-4 max-w-[200px] text-ellipsis overflow-hidden whitespace-nowrap'>{i.message} </td>
              <td className='px-10 py-4'>{i.date}</td>
              <td className='px-10 py-4'><button onClick={() => handleView(i)}> details</button></td>
              <td className='px-10 py-4'><FaRegEdit size='1rem'/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ReportTable
