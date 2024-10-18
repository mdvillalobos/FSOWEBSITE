import React, { useContext } from 'react'
import { UserContext } from '../../../../context/userContext'

const Seminar = () => {
    const { credentials } = useContext(UserContext)
    
    return (
        <div className='flex flex-col px-4'> 
            {credentials?.seminars.length > 0 ? (
                <ul>
                    {credentials?.seminars.map(i => (
                        <li key={i._id} className='text-md list-disc'>{i.seminarName}, {`(${i.date})`}</li>
                    ))}
                </ul>
            ) : (
                <h1 className='flex justify-center font-medium text-2xl'>No Current Data</h1>
            )}
        </div>
    )
}

export default Seminar
