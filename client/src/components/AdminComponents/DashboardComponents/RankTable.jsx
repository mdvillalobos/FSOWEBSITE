import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RankTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/api/getAllRank')
        .then(res => setData(res.data))
        .catch(error => console.log(error))
    }, []);
    return (
        <div>
            <table className='border-2 shadow-lg'>
                <thead>
                    <tr>
                        <th>Rank Name</th>
                        <th>Track</th>
                    </tr>
                </thead>
                <tbody>
                    {data != null ? (
                        data.map(i => (
                            <tr key={i._id}>
                                <td className='px-10 py-4'>{i.rankName}</td>
                                <td className='px-10 py-4'>{i.track}</td>
                            </tr>
                        ))
                    ) : (
                        <p>No Data</p>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default RankTable
