import React, { useState, useEffect }from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ApplicationTable = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/api/getApplications')
        .then(res => setData(res.data))
        .catch(error => console.log(error))
    }, []);
    
    const handleView = (userData) => {
        navigate('/admin/viewapplication', { state: { data: userData } })
    }

    return (
        <div>
            <table className='table-auto w-full rounded-md font-Poppins divide-y-4 divide-white'>
                <thead>
                    <tr className=''>
                        <th className='px-10 py-2 font-semibold text-left'>Name</th>
                        <th className='px-10 py-2 font-semibold text-left'>Email</th>
                        <th className='px-10 py-2 font-semibold text-left'>College</th>
                        <th className='px-10 py-2 font-semibold text-left'>Department</th>
                        <th className='px-10 py-2 font-semibold text-left'>Current Rank</th>
                        <th className='px-10 py-2 font-semibold text-left'>Applying For</th>
                    </tr>
                </thead>
                <tbody className='divide-y-8 divide-white'>
                    {
                        data != null ? (
                            data.map(i =>(
                                <tr key={i._id} onClick={() => handleView(i)} className=' cursor-pointer duration-200 hover:bg-[#5d69c6] text-sm bg-[#f2f6f9] text-gray-600 hover:text-white'>
                                    <td className='px-10 py-4'>{i.name}</td>
                                    <td className='px-10 py-4'>{i.email} </td>
                                    <td className='px-10 py-4'>{i.college}</td>
                                    <td className='px-10 py-4'>{i.department}</td>
                                    <td className='px-10 py-4'>{i.currentRank}</td>
                                    <td className='px-10 py-4'>{i.applyingFor}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td>No Data</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ApplicationTable
