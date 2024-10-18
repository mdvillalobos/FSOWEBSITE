import React, { useContext } from 'react'
import { UserContext } from '../../../../context/userContext'
import NoData from '../../../assets/images/NoData.webp';

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
                <div className='flex flex-col justify-center items-center h-full mt-4 select-none pointer-events-none space-y-2'>
                    <img src={NoData} alt="No Data Found" className='h-64' />
                    <h1 className='flex justify-center font-medium text-2xl text-gray-500'>No Data Available</h1>
                </div>
            )}
        </div>
    )
}

export default Education
