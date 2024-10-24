import React, { useState, useEffect, useContext }from 'react'
import { useNavigate } from 'react-router-dom';
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from "react-icons/ri";
import NotFound from '../../../assets/images/NotFound.webp';
import { RankContext } from '../../../../context/rankContext';

const ApplicationTable = ({ data }) => {
    const navigate = useNavigate();
    const { ranks } = useContext(RankContext)
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ isOpen, setIsOpen ] = useState(false);
    const [ selected, setSelected ] = useState()

    const rankArray = Array.from(new Set(ranks?.map(rank => rank.rankName)));

    useEffect(() => {
      if (ranks) {
        setSelected(rankArray.length > 0 ? rankArray[0] : null);
      }
    }, [ranks]);


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
    
    const handleView = (userData) => {
        navigate('/admin/viewapplication', { state: { data: userData } })
    }

    return (
        <div className="">
            <div className="flex justify-between px-8 font-Poppins">
            <p className='font-medium text-2xl my-auto text-NuButton'>Applications</p>
            <div className="flex space-x-3">
              <div className="flex flex-col">
                <div className="">
                  <button className="relative flex justify-center items-center py-1.5 px-2 w-56 text-sm rounded-lg border-2 text-gray-600" onClick={() => setIsOpen(!isOpen)}> {selected}</button>
                </div>
                {isOpen ? (
                  <div className='border-2 p-4'>
                    {rankArray.map(rank => {
                    <button>{rank}</button>
                    })}
                  </div>
                )
                : null } 
              </div>
              <div className='flex space-x-2 text-sm'>
                  <button onClick={handlePrevPage} disabled={currentPage === 1} className='flex border-2 py-1 px-2 rounded-md cursor-pointer duration-300 hover:bg-gray-300'>
                      <RiArrowLeftDoubleFill className='my-auto ml-1' size={'1.3rem'}/>
                      <span className='mr-2 ml-1 my-auto'>Prev</span>
                  </button>
                  <span className='border-2 py-1.5 px-4 rounded-md'>{currentPage} of {totalPages}</span>
                  <button onClick={handleNextPage} disabled={currentPage === totalPages} className='flex border-2 py-1 px-2 rounded-md cursor-pointer duration-300 hover:bg-gray-300'>
                      <span className='ml-2 mr-1 my-auto'>Next</span>
                      <RiArrowRightDoubleFill  className='my-auto mr-2' size={'1.3rem'}/>
                  </button>
              </div>
            </div>
          </div>
          <div className="w-full font-Poppins my-6 h-full">
            <div className=" flex font-medium px-6 bg-[#f4f7fa]">
              <p className='w-[18%] py-3 px-4'>Name</p>
              <p className='w-[18%] py-3 px-4'>Email</p>
              <p className='w-[16%] py-3 px-4'>College</p>
              <p className='w-[16%] py-3 px-4'>Department</p>
              <p className='w-[16%] py-3 px-4'>Current Rank</p>
              <p className='w-[16%] py-3 px-4'>Applying For</p>
            </div>
            <div className="w-full">
              {data?.length !== 0 ? (
                currentRows?.map(i=> (
                  <div key={i._id} onClick={() => handleView(i)} className='flex cursor-pointer duration-200 hover:shadow-md text-sm text-gray-600 px-6 border-y'>
                    <p className='w-[18%] py-4 px-4'>{i.name}</p>
                    <p className='w-[18%] py-4 px-4'>{i.email}</p>
                    <p className='w-[16%] py-4 px-4 text-ellipsis whitespace-nowrap overflow-hidden'>{i.college}</p> 
                    <p className='w-[16%] py-4 px-4 text-ellipsis whitespace-nowrap overflow-hidden'>{i.department}</p>
                    <p className='w-[16%] py-4 px-4'>{i.currentRank}</p>
                    <p className='w-[16%] py-4 px-4'>{i.applyingFor}</p>
                  </div>
                ))
              ) : (
                <div className='flex flex-col justify-center items-center mt-10 space-y-2 select-none pointer-events-none'>
                  <img src={NotFound} alt="No Data Found" className='h-80 opacity-90'/>
                  <h1 className='flex justify-center font-medium text-2xl text-gray-500'>No Available Data</h1>
                </div>
              )}
            </div>
          </div>
        </div>
        
    )
}

export default ApplicationTable
