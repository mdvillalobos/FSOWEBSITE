import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from "react-icons/ri";
import ViewForm from './ReportView.jsx';
import ReportModal from './ReportModal.jsx';
import NotFound from '../../../assets/images/NotFound.webp';

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
      <div className="flex justify-between px-8 font-Poppins max-sm:flex-col max-sm:space-y-2">
        <p className='font-medium text-2xl my-auto text-NuButton max-sm:text-3xl'>My Reports</p>
        <div className="flex space-x-3 justify-between">
          <div className='flex space-x-2 text-sm'>
            <button onClick={handlePrevPage} disabled={currentPage === 1} className='flex border-2 py-1 px-2 rounded-md cursor-pointer duration-300 hover:bg-gray-300 max-sm:py-1.5'>
                <RiArrowLeftDoubleFill className='my-auto ml-1 max-sm:ml-0' size={'1.3rem'}/>
                <span className='mr-2 ml-1 my-auto max-sm:hidden'>Prev</span>
            </button>
            <span className='border-2 py-1.5 px-4 rounded-md max-sm:py-1.5 max-sm:px-6'>{currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className='flex border-2 py-1 px-2 rounded-md cursor-pointer duration-300 hover:bg-gray-300 max-sm:py-1.5'>
              <span className='ml-2 mr-1 my-auto max-sm:hidden'>Next</span>
              <RiArrowRightDoubleFill  className='my-auto mr-2 max-sm:mr-0' size={'1.3rem'}/>
            </button>
          </div>
          <ReportModal/>
        </div>
      </div>
      <div className="w-full font-Poppins my-6 h-full max-sm:text-sm">
        <div className=" flex font-medium px-6 bg-[#f4f7fa] max-sm:px-0">
          <p className=' py-3 px-4 w-[20%] max-sm:w-[25%] '>Subject</p>
          <p className=' py-3 px-4 w-[40%] max-sm:w-[25%]'>Report</p>
          <p className=' py-3 px-4 w-[20%] max-sm:w-[25%]'>Date</p>
          <p className=' py-3 px-4 w-[20%] max-sm:w-[25%]'>Action</p>
        </div>
        <div className="w-full">
          {data.length > 0 ? (
            currentRows?.map(i=> (
              <div key={i._id} onClick={() => handleView(i)} className='flex cursor-pointer duration-200 hover:shadow-md text-sm text-gray-600 px-6 border-y'>
                <p className='w-[20%] py-4 px-4 text-ellipsis overflow-hidden whitespace-nowrap max-sm:w-[25%]'>{i.subject}</p>
                <p className='w-[40%] py-4 px-4 text-ellipsis overflow-hidden whitespace-nowrap max-sm:w-[25%]'>{i.message}</p>
                <p className='w-[20%] py-4 px-4 max-sm:w-[25%]'>{i.date}</p> 
                <p className='w-[20%] py-4 px-4 max-sm:w-[25%]'>Tae</p>
              </div>
            ))
          ) : (
            <div className='flex flex-col justify-center items-center mt-10 space-y-2 select-none pointer-events-none'>
              <img src={NotFound} alt="No Data Found" className='h-80 opacity-90 max-sm:h-56'/>
              <h1 className='flex justify-center font-medium text-2xl text-gray-500'>No Available Data</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReportTable
