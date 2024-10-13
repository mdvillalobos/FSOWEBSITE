import React, { useContext, useState } from 'react';
import {RankContext } from '../../../../context/rankContext.jsx';
import ModalBtn from './ModalBtn.jsx';

import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import { RiArrowLeftDoubleFill } from "react-icons/ri";
import { RiArrowRightDoubleFill } from "react-icons/ri";

const RankTable = () => {
    const { ranks } = useContext(RankContext)
    const [ isOpen, setIsOpen ] = useState(false);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ selectedTrack, setSelectedTrack ] = useState();

    const trackOptions = Array.from(new Set(ranks?.map(rank => rank.track)));

    const filteredRows = ranks?.filter(rank =>
        selectedTrack ? rank.track === selectedTrack : true
    );

    const rowsPerPage = 4;
    const totalPages = Math.ceil(filteredRows?.length / rowsPerPage);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredRows?.slice(indexOfFirstRow, indexOfLastRow);

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

    return (
        <div className='shadow-md bg-white rounded-xl px-7 p-5 w-full space-y-4'>
            <div className="flex justify-between">
                <p className='text-2xl font-medium'>Ranks</p>
                <div className="flex text-sm space-x-2">
                    <div className="relative">
                        <button  className="items-center py-[7.4px] px-4 w-36 text-xs rounded-md font-medium text-ellipsis overflow-hidden whitespace-nowrap bg-gray-200 " onClick={() => setIsOpen(!isOpen)}>
                            {!selectedTrack ? 'All' : selectedTrack}
                            {!isOpen ? (
                              <TiArrowSortedDown size={'1rem'} className='absolute right-1 top-[8px]'/>
                            ) : (
                              <TiArrowSortedUp size={'1rem'} className='absolute right-1 top-[8px]'/>
                            )}
                        </button>
                        {isOpen && (
                            <div className="absolute w-48 text-xs z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                                 <div
                                    onClick={() => {setSelectedTrack(), setIsOpen(!isOpen)}}
                                    className="cursor-pointer py-2 px-4 hover:bg-[#41518d] hover:text-white duration-200"
                                >
                                    All
                                </div>
                                {trackOptions?.map((track) => (
                                    <div
                                        key={track}
                                        onClick={() => {setSelectedTrack(track), setIsOpen(!isOpen)}}
                                        className="cursor-pointer py-2 px-4 hover:bg-[#41518d] hover:text-white duration-200"
                                    >
                                        {track}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <ModalBtn/>
                </div>
            </div>
            <div className="h-[25vh]">
                <table className='w-full text-sm'>
                    <thead>
                        <tr >
                            <th className='font-normal pb-2 text-left'>Rank Name</th>
                            <th className='font-normal text-left'>Track</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                         {currentRows?.length > 0 ? (
                            currentRows.map(i => (
                                <tr key={i._id}>
                                    <td className='w-[18vw] py-2'>{i.rankName}</td>
                                    <td className='w-80 py-2'>{i.track}</td>
                                    <td className='py-2 flex space-x-2'>
                                       <button><FiEdit/></button>
                                       <button><MdOutlineDelete/></button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={2} className='text-center py-4'>No Data</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className='flex justify-between space-x-4 text-sm text-gray-500'>
                <button onClick={handlePrevPage} disabled={currentPage === 1} className='flex justify-center border-2 py-2 px-3 w-28 rounded-lg'>
                    <RiArrowLeftDoubleFill className='my-auto' size={'1.3rem'}/>
                    Previous
                </button>
                <span className='border-2 text-center flex items-center justify-center px-4 w-24 rounded-lg'>{currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className='flex border-2 py-2 px-3 w-28 justify-center rounded-lg'>
                    Next
                    <RiArrowRightDoubleFill  className='my-auto' size={'1.3rem'}/>
                </button>
            </div>
        </div>
    )
}

export default RankTable
