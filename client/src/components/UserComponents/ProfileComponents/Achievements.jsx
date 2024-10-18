import React, { useContext } from 'react'
import { UserContext } from '../../../../context/userContext'

const Achievements = () => {
    const { credentials } = useContext(UserContext);
    console.log(credentials.achievements);

    return (
        <div className='flex flex-col px-4'> 
            {credentials?.achievements.length > 0 ? (
                <ul>
                    {credentials?.achievements.map(i => (
                        <li key={i._id} className='text-md list-disc'>{i.achievementName}, {`(${i.date})`}</li>
                    ))}
                </ul>
            ) : (
                <h1 className='flex justify-center font-medium text-2xl'>No Current Data</h1>
            )}
        </div>
    )
}

export default Achievements
