import React, { useContext } from 'react'
import { UserContext } from '../../../../context/userContext'
import NoData from '../../../assets/images/NoData.webp';


const Achievements = () => {
    const { credentials } = useContext(UserContext);

    return (
        <div className='flex flex-col px-4'> 
            {credentials?.achievements?.length > 0 ? (
                <ul>
                    {credentials?.achievements?.map(i => (
                        <li key={i._id} className='text-md list-disc'>{i.achievementName}, {`(${i.date})`}</li>
                    ))}
                </ul>
            ) : (
                <div className='flex flex-col justify-center items-center h-full mt-4 select-none pointer-events-none space-y-2'>
                    <img src={NoData} alt="No Data Found" className='h-64' />
                    <h1 className='flex justify-center font-medium text-2xl text-[#aeb3b6]'>No Data Available</h1>
                </div>
            )}
        </div>
    )
}

export default Achievements
