import React, { useState } from 'react';
import { FocusOn } from 'react-focus-on';
import maleProfile from '../../../assets/images/male.webp';
import femaleProfile from '../../../assets/images/female.webp';
import ConfigImage from '../../../assets/images/config.png';
import { PiDotsThreeOutlineFill } from "react-icons/pi";

const Config = ({ data }) => {
    const [ isOpen, setIsOpen ] = useState(false)
    const [ isChecked, setIsChecked ] = useState(false)

    return (
        <div className='flex flex-col justify-between h-full'>
            <div className="space-y-10">
                <div>
                    <div className="mb-5 flex justify-between">
                        <p className='text-xl font-semibold'>APPROVERS</p>
                        <button className='my-auto' onClick={() => setIsOpen(!isOpen)}><PiDotsThreeOutlineFill/></button>
                    </div>
                    {isOpen ? (<FocusOn><SettingModal handleExit={() => setIsOpen(!isOpen)} data={data}/></FocusOn>) : null}
                    {data ?
                        data?.map(approver => {
                            if(approver.profilePicture === null || approver.profilePicture === '') {
                                if(approver.sex === 'Male') {
                                    approver.profilePicture = maleProfile
                                }
                                else {
                                    approver.profilePicture = femaleProfile
                                }
                            }
                            return <div key={approver._id}className="flex justify-between mt-4">
                                <div className="flex space-x-2">
                                    <div className="w-[35px] h-[35px] overflow-hidden rounded-full flex items-center justify-center my-auto">
                                        <img src={approver.profilePicture} alt={`${approver.lastName} Profile Picture`} className='w-full h-auto object-cover'/>
                                    </div>
                                    <div className="text-xs">
                                        <p>{approver.firstName} {approver.lastName}</p>
                                        <p className='text-gray-500'>{approver.approver}</p>
                                    </div>
                                </div>
                            </div>
                        })     
                        : (
                            <p>No Approver Yet</p>
                        )
                    }
                </div>

                <div>
                    <p className='text-xl font-semibold my-auto mb-4'>CONFIGURATION</p>
                    <div className="space-y-4 text-xs">
                        <div className="flex justify-between">
                            <p>Academic Yr. </p>
                            <p>2022-2024</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Application For <br/> Re-Ranking</p>
                            <label htmlFor="check" className='bg-gray-300 w-12 h-5 rounded-full relative cursor-pointer my-auto pointer-events-none '>
                                <input type="checkbox" id='check' className='sr-only peer' onChange={(e)=> setIsChecked(!isChecked)}/>
                                <span className='w-6 h-6 bg-[#41518d] absolute rounded-full left-0 top-[-2px] peer-checked:bg-rose-600 peer-checked:left-[25px] transition-all duration-500 '></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <img src={ConfigImage} alt="" className='opacity-90'/>
        </div>
    )
}

export default Config


const SettingModal = ({ handleExit, data }) => {
    const [ isActive, setIsActive ] = useState('approver');
    const [ isEditOn, setIsEditOn ] = useState(false);

    return (
        <div className="fixed top-0 left-0 w-screen h-screen overflow-auto z-10 flex bg-black/40 justify-center items-center font-Poppins">
            <div className="relative h-[60vh] w-[40vw] bg-white shadow-xl rounded-xl overflow-hidden py-2 fade-in">
                <div className=" border-gray-300 py-6 px-6 flex justify-between relative ">
                    <p className='font-medium text-3xl'>System Configuration</p>
                    <button onClick={handleExit} className='absolute right-5 top-5 text-3xl px-2 duration-300 rounded-full hover:bg-[#eae7e7] text-[#3b3c3c]'>&times;</button> 
                </div>

                <div className="flex text-sm bg-[#ebebec] py-1 px-1 mx-6  rounded-xl relative ">
                    <button type='button' className={`px-3 py-1.5 w-full rounded-lg ${isActive === 'approver' ? 'bg-white shadow-md' : null}`} onClick={() => setIsActive('approver')}>
                        Approver Configuration
                    </button>
                    <button className={`px-3 py-1.5 w-full rounded-lg ${isActive === 'config' ? 'bg-white shadow-md' : null}`}  onClick={() => setIsActive('config')}>
                        System Configuration
                    </button>
                </div>

                <div className="px-6 mt-4">
                    {isActive === 'config' ? (
                        <div>
                            <div className="space-y-2">
                                <div className="border-2 py-3 px-3 flex justify-between rounded-xl">
                                    <div className="">
                                        <p className='my-auto'>Academic Year</p>
                                        <p className='text-xs text-gray-400'>Configure the current academic year.</p>
                                    </div>
                                    <input type="text" className='border-2 rounded-md text-center my-auto py-1.5' disabled={!isEditOn}/>
                                 </div>
                                 <div className="border-2 py-4 px-3 flex justify-between rounded-xl">
                                    <div className="">
                                        <p className='my-auto'>Application For Re-Ranking</p>
                                        <p className='text-xs text-gray-400'>Configure to open or close the application for re-ranking.</p>
                                    </div>
                                    <label className="toggle-switch my-auto">
                                        <input type="checkbox" disabled={!isEditOn}/>
                                        <div className="toggle-switch-background">
                                            <div className="toggle-switch-handle"></div>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-end my-20">
                               {isEditOn ? (
                                    <div className="space-x-2">
                                        <button type='button' className='bg-[#E8E8E8] hover:bg-[#bcbbbb] duration-200 px-9 py-1.5 rounded-md ' onClick={() => setIsEditOn(!isEditOn)}>Cancel</button>
                                        <button type='button' className='bg-NuButton hover:bg-NuButtonHover duration-200 text-white px-9 py-1.5 rounded-md'>Save</button>
                                    </div>
                               ) : (
                                    <button type='button' className='bg-NuButton hover:bg-NuButtonHover duration-200 text-white px-9 py-1.5 rounded-md' onClick={() => setIsEditOn(!isEditOn)}>Edit</button>
                               )}
                            </div>
                        </div>
                    ) : (
                        <div className="">
                            <div className="space-y-2">
                               {data ? 
                                    data.map(approver => (
                                        <div key={approver._id} className="border-2 py-3 px-3 flex justify-between rounded-xl">
                                            <div className="">
                                                <p className='my-auto'>{approver.firstName} {approver.lastName}</p>
                                                <p className='text-xs text-gray-400'>{approver.email}</p>
                                            </div>
                                            <input type="text" className='border-2 rounded-md text-center my-auto py-1.5' disabled={!isEditOn}/>
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
                    )}
                </div>

            </div>
        </div>
    )
}
