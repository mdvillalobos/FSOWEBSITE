import React, { useContext } from 'react'
import { UserContext } from '../../../../context/userContext'

const Education = () => {
    const { credentials } = useContext(UserContext);

    return (
        <div className='flex flex-col space-y-4'> 
            {credentials?.educations.length > 0 ? (
                credentials?.educations.map(i => (
                    <div className="flex w-full" key={i._id}>
                        <div className="w-[40%]">
                            <p className='text-NuButton text-md font-medium'>{i.level}</p>
                        </div>
                        <div className="w-[40%]">
                            <p>{i.schoolName}</p>
                            <p>{i.address}</p>
                        </div>
                        <div className="">
                            <p>{i.yearGraduated}</p>
                        </div>
                    </div>
                ))
            ) : (
                <h1 className='flex justify-center font-medium text-2xl'>No Current Data</h1>
            )}
        </div>
    )
}

export default Education
