import React, { useState, useEffect }from 'react';
import ReportView from './AdminViewForm';
import axios from 'axios';
import NotFound from '../../../assets/images/NotFound.webp';

const ReportTable = () => {
  const [data, setData] = useState([]);
  const [openView, setOpenView] = useState(false);
  const [viewData, setViewData] = useState({
    message: '',
    date: ''
  })

  const handleExit = () => {
    setOpenView(false)
  }

  const handleView = (i) => {
    setViewData(i)
    setOpenView(true)
    console.log(i)
  }
  
  useEffect(() => {
    axios.get('/api/getAllReports')
    .then(res => setData(res.data))
    .catch(error => console.log(error))
  }, []);


  return (
    <div>
      {openView && (
        <ReportView 
          handleExit={handleExit} 
          rest={viewData}
        />
      )}
      <table className='table-auto w-full rounded-md font-Poppins divide-y-4 divide-white'>
        <thead>
          <tr>
          <th className='px-10 py-2 font-semibold text-left w-[15%]'>Email</th>
            <th className='px-10 py-2 font-semibold text-left w-[15%]'>Subject</th>
            <th className='px-10 py-2 font-semibold text-left w-[40%]'>Report</th>
            <th className='px-10 py-2 font-semibold text-left'>Date</th>
            <th></th>
          </tr>
        </thead>
        {data?.length > 1 ? (
          <tbody className='divide-y-8 divide-white'>
            {data.map(i =>(
              <tr key={i._id} onClick={() => handleView(i)} className=' cursor-pointer duration-200 hover:bg-[#5d69c6] text-sm bg-[#f2f6f9] text-gray-600 hover:text-white'>
                <td className='px-10 py-4 max-w-[200px] text-ellipsis overflow-hidden whitespace-nowrap'>{i.email}</td>      
                <td className='px-10 py-4 max-w-[200px] text-ellipsis overflow-hidden whitespace-nowrap'>{i.subject}</td>       
                <td className='px-10 py-4 max-w-[200px] text-ellipsis overflow-hidden whitespace-nowrap'>{i.message} </td>
                <td className='px-10 py-4'>{i.date}</td>
              </tr>
            ))}
          </tbody>
          ) : (
            <div className='flex flex-col justify-center items-center mt-10 space-y-2 select-none pointer-events-none'>
              <img src={NotFound} alt="No Data Found" className='h-80 opacity-90'/>
              <h1 className='flex justify-center font-medium text-2xl text-gray-500'>No Available Data</h1>
            </div>
          )}
      </table>
    </div>
  )
}

export default ReportTable
