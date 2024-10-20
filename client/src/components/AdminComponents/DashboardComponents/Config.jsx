import React, { useState, useEffect } from 'react';
import axios from 'axios';
import maleProfile from '../../../assets/images/male.webp';
import femaleProfile from '../../../assets/images/female.webp';
import ConfigImage from '../../../assets/images/config.png';

const Config = () => {
    const [ data, setData ] = useState();
    const [ isOpen, setIsOpen ] = useState({})
    const [ isChecked, setIsChecked ] = useState(false)

    useEffect(() => {
        axios.get('/api/getapprovers')
        .then(res => setData(res.data))
        .catch(error => console.error(`Error Fetching Approvers In Front End: ${ error.message }`))
    }, [])

    return (
        <div className='flex flex-col justify-between h-full'>
            <div className="space-y-10">
                <div>
                    <p className='text-xl font-semibold mb-5'>APPROVERS</p>
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
                    <p className='text-xl font-semibold mb-4'>CONFIGURATION</p>
                    <div className="space-y-4 text-xs">
                        <div className="flex justify-between">
                            <p>Academic Yr. </p>
                            <p>2022-2024</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Application For <br/> Re-Ranking</p>
                            <label htmlFor="check" className='bg-gray-300 w-12 h-5 rounded-full relative cursor-pointer my-auto '>
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
