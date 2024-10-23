import React, { useContext } from 'react';
import { AnalyticsContext } from '../../../../context/analyticsContext';
import { CgFileDocument } from "react-icons/cg";
import { FaPercentage, FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const GraphDescription = () => {
    const { isApprovedData, statusData } = useContext(AnalyticsContext);
    const totalData = statusData?.approved + statusData?.declined 
    const passingRate = ( statusData?.approved / totalData ) * 100

    return (
        <div className="flex text-sm text-center">
            <div className="flex flex-col items-center w-[11vw] bg-white shadow-md rounded-lg py-5 px-4 space-y-2">
                <span className='p-4 text-4xl bg-[#405189] rounded-full text-white'><CgFileDocument/></span>
                <div className="space-y-2">
                    <p className='font-medium text-sm text-gray-600'>Total Applications</p>
                    <p className='text-3xl'>{totalData}</p>
                </div>
            </div>
            <div className="flex flex-col items-center w-[11vw] bg-white shadow-md rounded-lg py-5 px-4 space-y-2">
                <span className='p-4 text-4xl bg-[#39a1ea] rounded-full text-white'><FaPercentage/></span>
                <div className="space-y-2">
                    <p className='font-medium text-sm text-gray-600'>Passing rate</p>
                    <p className='text-3xl'>{passingRate}</p>
                </div>
            </div>
            <div className="flex flex-col items-center w-[11vw] bg-white shadow-md rounded-lg py-5 px-4 space-y-2">
                <span className='p-4 text-4xl bg-[#29ab91] rounded-full text-white'><FaCheck/></span>
                <div className="space-y-2">
                    <p className='font-medium text-sm text-gray-600'>Total Approved</p>
                    <p className='text-3xl'>{statusData?.approved}</p>
                </div>
            </div>
            <div className="flex flex-col items-center w-[11vw] bg-white shadow-md rounded-lg py-5 px-4 space-y-2">
                <span className='p-4 text-4xl bg-[#ff764c] rounded-full text-white'><ImCross/></span>
                <div className="space-y-2">
                    <p className='font-medium text-sm text-gray-600'>Total Declined</p>
                    <p className='text-3xl'>{statusData?.declined}</p>
                </div>
            </div>
        </div>
    )
}

export default GraphDescription
