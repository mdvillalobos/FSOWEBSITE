import React, { useState } from 'react';
import { FocusOn } from 'react-focus-on';
import maleProfile from '../../../assets/images/male.webp';
import femaleProfile from '../../../assets/images/female.webp';

const Approvers = ({ data }) => {
    const [ isOpen, setIsOpen ] = useState(false)

    return (
        <div>
            <div className="mb-4 flex justify-between">
                <p className='text-xl font-medium'>Approvers</p>
                <button className='rounded-md hover:shadow-md my-auto border-2 text-xs py-1 px-4 text-gray-500 hover:text-NuButton font-medium hover:border-NuButton duration-200' onClick={() => setIsOpen(!isOpen)}>See details</button>
            </div>
            {isOpen ? (<FocusOn><SettingModal handleExit={() => setIsOpen(!isOpen)} data={data}/></FocusOn>) : null}
            <div className="">
                {data ?
                    data?.map(approver => {
                        if(approver.accountinfo[0].profilePicture === null || approver.accountinfo[0].profilePicture === '') {
                            if(approver.accountinfo[0].sex === 'Male') {
                                approver.accountinfo[0].profilePicture = maleProfile
                            }
                            else {
                                approver.accountinfo[0].profilePicture = femaleProfile
                            }
                        }
                        return <div key={approver.accountinfo[0]._id } className="flex justify-between ">
                            <div className="flex space-x-2 border-b-2 py-4 w-full">
                                <div className="flex items-center justify-center w-[39px] h-[39px] overflow-hidden rounded-full">
                                    <img src={approver.accountinfo[0].profilePicture} alt={`${approver.accountinfo[0].lastName} Profile Picture`} className='w-full h-full object-cover'/>
                                </div>
                                <div className="text-xs my-auto space-y-1">
                                    <p className='font-medium text-sm tracking-tight'>{approver.accountinfo[0].firstName} {approver.accountinfo[0].lastName}</p>
                                    <p className='text-gray-500'>FSO • {approver.approver}</p>
                                </div>
                            </div>
                        </div>
                    })     
                    : (
                        <p>No Approver Yet</p>
                    )
                }
            </div>
        </div>
    )
}

export default Approvers


const SettingModal = ({ handleExit, data }) => {
    const [ isEditOn, setIsEditOn ] = useState(false);

    return (
        <div className="fixed top-0 left-0 w-screen h-screen overflow-auto z-10 flex bg-black/40 justify-center items-center font-Poppins">
            <div className="relative h-[60vh] w-[40vw] bg-white shadow-xl rounded-xl overflow-hidden py-2 fade-in">
                <div className=" border-gray-300 py-6 px-6 flex justify-between relative ">
                    <p className='font-medium text-3xl'>Approver Configuration</p>
                    <button onClick={handleExit} className='absolute right-5 top-5 text-3xl px-2 duration-300 rounded-full hover:bg-[#eae7e7] text-[#3b3c3c]'>&times;</button> 
                </div>
                <div className="py-3 px-5">
                    <div className="space-y-2 ">
                       {data ? 
                            data.map(approver => (
                                <div key={approver.accountinfo[0]._id} className="border-2 py-3 px-3 flex justify-between rounded-xl">
                                    <div className="">
                                        <p className='my-auto'>{approver.accountinfo[0].firstName} {approver.accountinfo[0].lastName}</p>
                                        <p className='text-xs text-gray-400'>{approver.accountinfo[0].email}</p>
                                    </div>
                                </div>
                            ))
                        : (
                            <p>Null</p>
                        )}
                    </div>
                    <div className="flex justify-end my-2">
                        <button className='bg-NuButton hover:bg-NuButtonHover duration-200 text-white px-9 py-1.5 rounded-md '>Edit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
