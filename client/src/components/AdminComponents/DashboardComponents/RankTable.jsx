import React, { useContext, useState } from 'react';
import { ApplicationContext } from '../../../../context/applicationContext.jsx';
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import TableBtn from './TableBtn.jsx';

const RankTable = () => {
    const { ranks } = useContext(ApplicationContext)
    const [ currentPage, setCurrentPage ] = useState(1);

    const rowsPerPage = 4;
    const totalPages = Math.ceil(ranks?.length / rowsPerPage);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = ranks.slice(indexOfFirstRow, indexOfLastRow);

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
        <div className='shadow-md bg-white rounded-xl px-7 p-5 w-full'>
            <div className="flex justify-between mb-4">
                <p className='text-2xl font-medium'>Ranks</p>
                <TableBtn/>
            </div>
            <table className='mx-auto w-full text-sm'>
                <thead>
                    <tr >
                        <th className='font-normal'>Rank Name</th>
                        <th className='font-normal'>Track</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                     {currentRows.length > 0 ? (
                        currentRows.map(i => (
                            <tr key={i._id}>
                                <td className='w-[18vw] text-center'>{i.rankName}</td>
                                <td className='px-10 py-4 text-center'>{i.track}</td>
                                <td className='px-10 py-4 flex space-x-2'>
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
            <div className='flex justify-around mt-4'>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default RankTable
