import React, { useState } from 'react'
import { IoChevronBackOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import useAddEducation from '../../../hooks/UserHooks/useAddEducation';
import useAddSeminar from '../../../hooks/UserHooks/useAddSeminar';
import useAddAchievement from '../../../hooks/UserHooks/useAddAchievement';

const ProfileModal = () => {
    const [ isOpen, setIsOpen ] = useState(false)
    
    const togglePop = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className='flex justify-between w-full shadow-md bg-white rounded-xl py-4 px-5'>
            <p className='text-2xl font-semibold my-auto'>Personal Information</p>
            <div className="space-x-2">
                <button type='button' onClick={togglePop} className='border-2 text-black py-2 border-[#93adc2] text-sm rounded-md px-8 duration-300 hover:bg-NuButtonHover hover:text-white hover:shadow-lg hover:scale-105'>Generate CV</button>
                <button type='button' onClick={togglePop} className='border-2 text-black py-2 border-[#93adc2] text-sm rounded-md px-8 duration-300 hover:bg-NuButtonHover hover:text-white hover:shadow-lg hover:scale-105'>Add Info</button>
            </div>
            {isOpen ? <AddInfo toggle={togglePop}/> : null} 
        </div>
    )
}

export default ProfileModal

const AddInfo = (props) => {
    const [ isEducOpen, setIsEducOpen ] = useState(false);
    const [ isSeminarOpen, setIsSeminarOpen ] = useState(false);
    const [ isAchieveOpen, setIsAchieveOpen ] = useState(false);

    return (
        <div className="fixed top-0 left-0 w-screen h-screen overflow-auto z-10 flex bg-black/40 justify-center items-center font-Poppins">
            <div className="h-[45%] w-[35%] bg-white shadow-lg rounded-2xl px-5 py-5  space-y-5 overflow-hidden fade-in">
                <div className="break-words text-sm">
                    <button className="hover:bg-[#eae7e7] w-10 text-[#3b3c3c] border-2 px-2 py-2 rounded-lg duration-200" onClick={props.toggle}>
                        <IoChevronBackOutline size={'1.3rem'} />
                    </button>

                    <h1 className='text-2xl my-4 font-medium'>Add Information</h1>

                    <div className="flex flex-col w-full mt-4 rounded-lg">
                        <button type='button' onClick={() => setIsEducOpen(!isEducOpen)} className='flex justify-between text-left border-y-2 py-4 px-3 text-base duration-300 hover:bg-NuButtonHover hover:text-white'>
                            Add an education
                            <MdKeyboardArrowRight size={'2rem'} className='my-auto'/>
                        </button>
                        <button type='button' onClick={() => setIsSeminarOpen(!isSeminarOpen)} className='flex justify-between text-left border-y-2 py-4 px-3 text-base duration-300 hover:bg-NuButtonHover hover:text-white'>
                            Add a seminar
                            <MdKeyboardArrowRight size={'2rem'} className='my-auto'/>
                        </button>
                        <button type='button' onClick={() => setIsAchieveOpen(!isAchieveOpen)} className='flex justify-between text-left border-y-2 py-4 px-3 text-base duration-300 hover:bg-NuButtonHover hover:text-white'>
                            Add an achievement
                            <MdKeyboardArrowRight size={'2rem'} className='my-auto'/>
                        </button>
                    </div>
                </div>
            </div>

            { isEducOpen ? <AddEducation toggle={() => setIsEducOpen(!isEducOpen)}/> : null }
            { isSeminarOpen ? <AddSeminar toggle={() => setIsSeminarOpen(!isSeminarOpen)}/> : null}
            { isAchieveOpen ? <AddAchievement toggle={() => setIsAchieveOpen(!isAchieveOpen)}/> : null }
        </div>
    )
}

const AddEducation = (props) => {
    const [ isOpen , setIsOpen ] = useState(false)
    const { AddEducation } = useAddEducation()
    const [ data, setData ] = useState({
        level: '',
        schoolName: '',
        address: '',
        year: ''
    });

    console.log(data)

    const handleAddEducation = async (e) => {
        e.preventDefault();
        await AddEducation(data.level, data.schoolName, data.address, data.year, props)
    } 

    return (
        <div className="fixed top-0 left-0 w-screen h-screen overflow-auto z-10 flex justify-center items-center font-Poppins ">
            <div className="h-[60%] w-[35%] bg-white shadow-lg rounded-2xl px-5 py-5  space-y-5 overflow-hidden">
                <div className="break-words text-sm">
                    <button className="hover:bg-[#eae7e7] w-10 text-[#3b3c3c] border-2 px-2 py-2 rounded-lg duration-200" onClick={props.toggle}>
                        <IoChevronBackOutline size={'1.3rem'} />
                    </button>
                    <h1 className='text-2xl my-4 font-medium'>Add Education</h1>
                    <form onSubmit={handleAddEducation} className='flex flex-col'>
                        <div className='relative'>
                            <button type='button' onClick={() => setIsOpen(!isOpen)} className={`w-full text-left rounded-lg mb-3 py-3 px-4 border-2 outline-none focus:border-[#c1c6f2] focus:bg-[#f3f4fd] ${data.level ? 'text-black' : 'text-gray-400'}`}>
                                {data.level ? data.level : 'Education Level'}
                            </button>
                            {isOpen && (
                                <div className='absolute bg-white shadow-md w-full flex flex-col border-2 border-[#c1c6f2] rounded-xl'>
                                    <button type='button' onClick={() => { setData({...data,  level: 'Primary Education'}), setIsOpen(!isOpen) }} className='py-2 text-left px-3 hover:bg-NuButtonHover hover:text-white duration-200'>Primary Education</button>  
                                    <button type='button' onClick={() => { setData({...data, level: 'Secondary Education'}), setIsOpen(!isOpen) }} className='py-2 text-left px-3 hover:bg-NuButtonHover hover:text-white duration-200'>Secondary Education</button>
                                    <button type='button' onClick={() => { setData({...data, level: 'Bachelors Degree'}), setIsOpen(!isOpen) }} className='py-2 text-left px-3 hover:bg-NuButtonHover hover:text-white duration-200'>Bachelors Degree</button>
                                    <button type='button' onClick={() => { setData({...data, level: 'Masters Degree'}), setIsOpen(!isOpen) }} className='py-2 text-left px-3 hover:bg-NuButtonHover hover:text-white duration-200'>Masters Degree</button>            
                                    <button type='button' onClick={() => { setData({...data, level: 'Doctorate Degree'}), setIsOpen(!isOpen)}} className='py-2 text-left px-3 hover:bg-NuButtonHover hover:text-white duration-200'>Doctorate Degree</button>                    
                                </div>
                            )}
                        </div>
                        
                        <input 
                            type="text" 
                            value={data.schoolName}
                            onChange={(e) => setData({ ...data, schoolName: e.target.value})}
                            placeholder='School Name'
                            className='rounded-lg mb-3 py-3 px-4 border-2 outline-none focus:border-[#c1c6f2] focus:bg-[#f3f4fd]'
                        />
                        <input 
                            type="text" 
                            value={data.address}
                            onChange={(e) => setData({ ...data, address: e.target.value})}
                            placeholder='School Address'
                            className='rounded-lg mb-3 py-3 px-4 border-2 outline-none focus:border-[#c1c6f2] focus:bg-[#f3f4fd]'
                        />

                        <input 
                            type="text" 
                            value={data.year}
                            onChange={(e) => setData({ ...data, year: e.target.value})}
                            placeholder='Year Start - Year Graduated'
                            className='rounded-lg mb-3 py-3 px-4 border-2 outline-none focus:border-[#c1c6f2] focus:bg-[#f3f4fd]'
                        />

                      <div className="flex mt-4">
                        <input type="submit" value="Submit" className=' py-3 px-10 text-sm bg-NuButton text-white hover:bg-NuButtonHover duration-300 rounded-lg cursor-pointer shadow-md w-full'/>
                      </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const AddSeminar = (props) => {
    const { AddSeminar } = useAddSeminar();
    const [ data, setData ] = useState({
        seminarName: '',
        date: '',
    });

    const handleAddSeminar = async (e) => {
        e.preventDefault();
        await AddSeminar(data.seminarName, data.date, props)
    } 

    return (
        <div className="fixed top-0 left-0 w-screen h-screen overflow-auto z-10 flex justify-center items-center font-Poppins">
            <div className="h-[45%] w-[35%] bg-white shadow-lg rounded-2xl px-5 py-5  space-y-5 overflow-hidden">
                <div className="break-words text-sm">
                    <button className="hover:bg-[#eae7e7] w-10 text-[#3b3c3c] border-2 px-2 py-2 rounded-lg duration-200" onClick={props.toggle}>
                        <IoChevronBackOutline size={'1.3rem'} />
                    </button>

                    <h1 className='text-2xl my-4 font-medium'>Add Seminar</h1>
                    <form onSubmit={handleAddSeminar} className='flex flex-col'>
                        <input 
                            type="text" 
                            value={data.seminarName}
                            onChange={(e) => setData({ ...data, seminarName: e.target.value})}
                            placeholder='Seminar Name'
                            className='rounded-lg mb-3 py-3 px-4 border-2 outline-none focus:border-[#c1c6f2] focus:bg-[#f3f4fd]'
                        />
                        <input 
                            type="text" 
                            value={data.date}
                            onChange={(e) => setData({ ...data, date: e.target.value})}
                            placeholder='Year'
                            className='rounded-lg mb-3 py-3 px-4 border-2 outline-none focus:border-[#c1c6f2] focus:bg-[#f3f4fd]'
                        />

                      <div className="flex mt-4">
                        <input type="submit" value="Submit" className=' py-3 px-10 text-sm bg-NuButton text-white hover:bg-NuButtonHover duration-300 rounded-lg cursor-pointer shadow-md w-full'/>
                      </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const AddAchievement = (props) => {
    const { AddAchievement } = useAddAchievement();
    const [ data, setData ] = useState({
        achievementName: '',
        date: '',
    });

    const handleAddSeminar = async (e) => {
        e.preventDefault();
        await AddAchievement(data.achievementName, data.date, props)
    } 

    return (
        <div className="fixed top-0 left-0 w-screen h-screen overflow-auto z-10 flex justify-center items-center font-Poppins">
            <div className="h-[45%] w-[35%] bg-white shadow-lg rounded-2xl px-5 py-5  space-y-5 overflow-hidden">
                <div className="break-words text-sm">
                    <button className="hover:bg-[#eae7e7] w-10 text-[#3b3c3c] border-2 px-2 py-2 rounded-lg duration-200" onClick={props.toggle}>
                        <IoChevronBackOutline size={'1.3rem'} />
                    </button>

                    <h1 className='text-2xl my-4 font-medium'>Add Achievement</h1>
                    <form onSubmit={handleAddSeminar} className='flex flex-col'>
                        <input 
                            type="text" 
                            value={data.achievementName}
                            onChange={(e) => setData({ ...data, achievementName: e.target.value})}
                            placeholder='Achievement'
                            className='rounded-lg mb-3 py-3 px-4 border-2 outline-none focus:border-[#c1c6f2] focus:bg-[#f3f4fd]'
                        />

                        <input 
                            type="text" 
                            value={data.date}
                            onChange={(e) => setData({ ...data, date: e.target.value})}
                            placeholder='Year'
                            className='rounded-lg mb-3 py-3 px-4 border-2 outline-none focus:border-[#c1c6f2] focus:bg-[#f3f4fd]'
                        />

                     
                      <div className="flex mt-2">
                        <input type="submit" value="Submit" className=' py-3 px-10 text-sm bg-NuButton text-white hover:bg-NuButtonHover duration-300 rounded-lg cursor-pointer shadow-md w-full'/>
                      </div>
                    </form>
                
                </div>
            </div>
        </div>
    )
}

