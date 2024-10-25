import React, { useContext } from 'react';
import { AnalyticsContext } from '../../../../context/analyticsContext';

const GraphDescription = () => {
    const { isApprovedData, statusData } = useContext(AnalyticsContext);
    const totalData = statusData?.approved + statusData?.declined 
    const passingRate = ( statusData?.approved / totalData ) * 100

    return (
        <div className="flex justify-between text-sm">
            <div className="flex flex-col w-[16vw] border-2 bg-white rounded-xl py-3 px-4">
                <p className='text-sm font-medium text-gray-500'>Total Applications</p>
                <p className='text-3xl font-semibold mt-4 mb-3'>{totalData}</p>
                <p className=' text-xs text-gray-500'><span className='bg-[#d8f2ed] p-1 text-[#2a6e60] rounded-md mr-0.5'>+ 0.00%</span> compared to last year</p>
            </div>

            <div className="flex flex-col w-[16vw] border-2 bg-white rounded-xl py-3 px-4">
                <p className='text-sm font-medium text-gray-500'>Passing rate</p>
                <p className='text-3xl font-semibold mt-4 mb-3'>{passingRate}%</p>
                <p className=' text-xs text-gray-500'><span className='bg-[#d8f2ed] p-1 text-[#2a6e60] rounded-md mr-0.5'>+ 0.00%</span> compared to last year</p>
            </div>

            <div className="flex flex-col w-[16vw] border-2 bg-white rounded-xl py-3 px-4">
                <p className='text-sm font-medium text-gray-500'>Total Approved</p>
                <p className='text-3xl font-semibold mt-4 mb-3'>{statusData?.approved}</p>
                <p className=' text-xs text-gray-500'><span className='bg-[#d8f2ed] p-1 text-[#2a6e60] rounded-md mr-0.5'>+ 0.00%</span> compared to last year</p>
            </div>

            <div className="flex flex-col w-[16vw] border-2 bg-white rounded-xl py-3 px-4">
                <p className='text-sm font-medium text-gray-500'>Total Declined</p>
                <p className='text-3xl font-semibold mt-4 mb-3'>{statusData?.declined}</p>
                <p className=' text-xs text-gray-500'><span className='bg-[#d8f2ed] p-1 text-[#2a6e60] rounded-md mr-0.5'>+ 0.00%</span> compared to last year</p>
            </div>
        </div>
    )
}

export default GraphDescription
