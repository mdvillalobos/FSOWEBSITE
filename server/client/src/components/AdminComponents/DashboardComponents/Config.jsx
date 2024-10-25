import React, { useContext, useEffect, useState } from 'react';
import { FocusOn } from 'react-focus-on';
import { RankContext } from '../../../../context/rankContext';
import useSaveConfiguration from '../../../hooks/AdminHooks/useSaveConfiguration';


const Config = () => {
    const { config } = useContext(RankContext)
    const [ isModalOpen, setIsModalOpen ] = useState(false);

    return (
        <div className='flex-1 bg-white border-2 rounded-xl py-4 px-5 space-y-6'>
            <div className="mb-4 flex justify-between">
                <p className='text-xl font-medium'>Configuration</p>
                <button 
                    className='rounded-md hover:shadow-md my-auto border-2 text-xs py-1 px-4 text-gray-500 hover:text-NuButton font-medium hover:border-NuButton duration-200' 
                    onClick={() => setIsModalOpen(!isModalOpen)}
                >
                    See details
                </button>
            </div>
            {isModalOpen ? (<FocusOn><ConfigModal handleExit={() => setIsModalOpen(!isModalOpen)}/></FocusOn>) : null}
            <div className="space-y-4 text-sm">
                <div className="flex justify-between border-b-2 pb-3">
                    <p>Academic Yr. </p>
                    <p>{config[0]?.academicYear}</p>
                </div>
                <div className="flex justify-between border-b-2 pb-3">
                    <p className='my-auto'>Application For Re-Ranking</p>
                    <label className="toggle-switch my-auto">
                        <input 
                            type="checkbox" 
                            checked={config[0].isPageOpen}
                            onClick={() => setIsModalOpen(!isModalOpen)}
                        />
                        <div className="toggle-switch-background">
                            <div className="toggle-switch-handle"></div>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    )


}

export default Config


const ConfigModal = ({ handleExit }) => {
    const { config } = useContext(RankContext);
    const { saveConfiguration } = useSaveConfiguration();
    const [ isEditOn, setIsEditOn ] = useState(false); 
    const [ isSave, setIsSave] = useState(false);
    const [ isPageOpen, setIsPageOpen ] = useState(config[0]?.isPageOpen)
    console.log(config)

    const [ data, setData] = useState({
        academicYear: config[0]?.academicYear,
        password: ''
    })

    const handleSaveChanges = async (e) => {
        e.preventDefault();

        await saveConfiguration(data.password, config[0]?._id, data.academicYear, isPageOpen, setIsSave, isSave)
    }

    return (
        <div className="fixed top-0 left-0 w-screen h-screen overflow-auto z-10 flex bg-black/40 justify-center items-center font-Poppins">
            <div className={`relative h-[43vh] w-[35vw] bg-white shadow-xl rounded-xl overflow-hidden py-3 px-7 fade-in ${ isSave ? 'hidden' : null}`}>
                <div className=" border-gray-300 flex justify-between relative py-4 mb-2">
                    <p className='font-medium text-3xl'>System Configuration</p>
                    <button onClick={handleExit} className='absolute right-[-15px] top-1 text-3xl px-2 duration-300 rounded-full hover:bg-[#eae7e7] text-[#3b3c3c]'>&times;</button> 
                </div>
                <div className=''>
                    <div className="space-y-2">
                        <div className="border-2 py-3 px-3 flex justify-between rounded-xl">
                            <div className="">
                                <p className='my-auto'>Academic Year</p>
                                <p className='text-xs text-gray-400'>Configure the current academic year.</p>
                            </div>
                            <input 
                                type="text" 
                                maxLength={9}
                                disabled={!isEditOn}
                                value={data.academicYear}
                                onChange={(e) => setData({ ...data, academicYear: e.target.value})}
                                className='border-2 rounded-md text-center my-auto py-2 text-sm focus:border-[#93adc2] outline-none'
                            />
                         </div>
                         <div className="border-2 py-4 px-3 flex justify-between rounded-xl">
                            <div className="">
                                <p className='my-auto'>Application For Re-Ranking</p>
                                <p className='text-xs text-gray-400'>Configure to open or close the application for re-ranking.</p>
                            </div>
                            <label className="toggle-switch my-auto">
                                <input 
                                    type="checkbox" 
                                    disabled={!isEditOn}
                                    checked={isPageOpen}
                                    onChange={() => setIsPageOpen(prev => !prev)}

                                />
                                <div className="toggle-switch-background">
                                    <div className="toggle-switch-handle"></div>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end my-5 text-sm">
                       {isEditOn ? (
                            <div className="space-x-2">
                                <button type='button' className='bg-[#E8E8E8] hover:bg-[#bcbbbb] duration-200 w-32 py-2.5 rounded-md ' onClick={() => setIsEditOn(!isEditOn)}>Cancel</button>
                                <button type='button' className='bg-NuButton hover:bg-NuButtonHover duration-200 text-white w-32 py-2.5 rounded-md' onClick={() => setIsSave(!isSave)}>Save</button>
                            </div>
                       ) : (
                            <button type='button' className='bg-NuButton hover:bg-NuButtonHover duration-200 text-white w-32 py-2.5 rounded-md' onClick={() => setIsEditOn(!isEditOn)}>Edit</button>
                       )}
                    </div>
                </div>
            </div>
           {isSave ? (
                <div className="fixed top-0 left-0 w-screen h-screen overflow-auto z-10 flex justify-center items-center font-Poppins">
                    <div className="relative h-[31vh] w-[30vw] bg-white shadow-xl rounded-xl overflow-hidden py-3 px-7 fade-in">
                        <div className=" border-gray-300 flex justify-between relative py-4 mb-1">
                            <p className='font-medium text-3xl'>Confirmation</p>
                            <button type='button' onClick={() => setIsSave(!isSave)} className='absolute right-[-15px] top-1 text-3xl px-2 duration-300 rounded-full hover:bg-[#eae7e7] text-[#3b3c3c]'>&times;</button> 
                        </div>
                        <p className='text-gray-500 text-sm mb-2'>Please enter your password to save the changes.</p>
                        <input 
                            type="text" 
                            placeholder='Password'
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value})}
                            className='border-2 rounded-md my-auto p-2.5 w-full text-sm'
                        />
                        <div className="flex justify-end mt-4 text-sm space-x-2">
                            <button className='bg-[#E8E8E8] hover:bg-[#bcbbbb] duration-200 w-28 py-2 rounded-md' onClick={() => setIsSave(!isSave)}>Cancel</button>
                            <button className='bg-NuButton hover:bg-NuButtonHover duration-200 text-white w-28 py-2 rounded-md' onClick={handleSaveChanges}>Confirm</button>
                        </div>
                    </div>
                </div>
           ) : null}
        </div>
    )
}

