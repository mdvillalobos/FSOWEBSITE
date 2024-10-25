import React, { useContext } from 'react'
import { UserContext } from '../../../../context/userContext'
import NoData from '../../../assets/images/NoData.webp';

const Seminar = () => {
    const { credentials } = useContext(UserContext)
    
    return (
        <div className='flex flex-col px-4'> 
            {credentials?.seminars.length > 0 ? (
                <ul>
                    {credentials?.seminars.map(i => (
                        <li key={i._id} className='text-md list-disc'>{i.seminarName}, {`(${i.year})`}</li>
                    ))}
                </ul>
            ) : (
                <div className='flex flex-col justify-center items-center h-full mt-4 select-none pointer-events-none space-y-2'>
                    <img src={NoData} alt="No Data Found" className='h-64' />
                    <h1 className='flex justify-center font-medium text-2xl text-gray-500'>No Data Available</h1>
                </div>
            )}
        </div>
    )
}

export default Seminar
