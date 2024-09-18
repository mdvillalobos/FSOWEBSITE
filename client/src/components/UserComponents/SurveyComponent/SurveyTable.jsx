import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SurvetTable = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('/api/getreport')
    .then(data => setData(data.data))
    .catch(error => console.log(error))
  }, [])

  return (
    <div className='overflow-x-auto shadow-md rounded-md'>
      <table className='w-full text-sm rtl:text-right font-Poppins'>
        <thead className='bg-[#4b538f] text-[17px] uppercase text-left text-white'>
          <tr>
            <th scope='col' className='px-6 py-3 font-medium'>Report</th>
            <th scope='col' className='px-6 py-3 font-medium'>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map(i =>(
            <tr className='even:bg-[#e5e7eb] text-md'>
              <td className='px-6 py-4 font-medium'>{i.message}</td>
              <td className='px-6 py-4 font-medium'>{i.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SurvetTable
