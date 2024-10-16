import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight  } from "react-icons/md";
import ViewForm from './ReportView.jsx';
import ReportModal from './ReportModal.jsx';

const ReportTable = () => {
  const [ data, setData ] = useState([]);
  const [ openView, setOpenView ] = useState(false);
  const [ viewData, setViewData ] = useState();
  const [ currentPage, setCurrentPage ] = useState(1);

  useEffect(() => {
    axios.get('/api/getreport')
    .then(response => setData(response.data))
    .catch(error => console.error(`Fetching User Report Error: ${ error.message }`))
  }, []);

  const rowsPerPage = 8;
  const totalPages = Math.ceil(data?.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data?.slice(indexOfFirstRow, indexOfLastRow);


  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };  

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleExit = () => {
    setOpenView(false)
  }

  const handleView = (columnID) => {
    setViewData(columnID)
    setOpenView(true)
  }

  return (
    <div>
      {openView && (
        <ViewForm 
          handleExit={handleExit} 
          rest={viewData}
        />
      )}
      <div className="flex justify-between px-8">
        <p className='font-medium text-3xl text-NuButton'>My Reports</p>
        <div className="flex space-x-3">
          <ReportModal/>
          <div className='flex space-x-1 text-sm'>
            <button onClick={handlePrevPage} disabled={currentPage === 1} className='border-2 py-1.5 px-2 rounded-md cursor-pointer duration-300 hover:bg-gray-300'>
                <MdKeyboardArrowLeft className='my-auto' size={'1.3rem'}/>
            </button>
            <span className='border-2 py-1.5 px-4 rounded-md'>{currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className='border-2 py-1.5 px-2 rounded-md cursor-pointer duration-300 hover:bg-gray-300'>
                <MdKeyboardArrowRight  className='my-auto' size={'1.3rem'}/>
            </button>
          </div>
        </div>
      </div>
      <div className="w-full font-Poppins my-6 h-full">
        <div className=" flex font-medium px-6 bg-[#f4f7fa]">
          <p className=' py-3 px-4 w-[20%]'>Subject</p>
          <p className=' py-3 px-4 w-[40%]'>Report</p>
          <p className=' py-3 px-4 w-[20%]'>Date</p>
          <p className=' py-3 px-4 w-[20%]'>Action</p>
        </div>
        <div className="w-full">
          {data.length > 0 ? (
            currentRows?.map(i=> (
              <div key={i._id} onClick={() => handleView(i)} className='flex cursor-pointer duration-200 hover:shadow-md text-sm text-gray-600 px-6 border-y'>
                <p className='w-[20%] py-4 px-4 text-ellipsis overflow-hidden whitespace-nowrap'>{i.subject}</p>
                <p className='w-[40%] py-4 px-4 text-ellipsis overflow-hidden whitespace-nowrap'>{i.message}</p>
                <p className='w-[20%] py-4 px-4'>{i.date}</p> 
                <p className='w-[20%] py-4 px-4'>Tae</p>
              </div>
            ))
          ) : (
            <>p</>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReportTable
