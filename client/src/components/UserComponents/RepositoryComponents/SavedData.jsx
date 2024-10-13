import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FcFile } from "react-icons/fc";
import { FaFile } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const SavedData = () => {
  const navigate = useNavigate()
  const [ data, setData ] = useState();
  useEffect(() => {
    axios.get('/api/getUserRepository')
    .then(response => setData(response.data))
    .catch(error => console.error(`Fetching Repository From Front-end Error: ${ error.message }`))
  }, [])

  const EditApplication = (files) => {
   return navigate('/preapply/form', { state: { files: files }})
  }

  return (
    <div className='flex flex-col'>
      <p>My Applications Forms</p>
      <div className="flex space-x-4">
        {data?.map(files => (
          <div 
            key={files._id} // Ensure each button has a unique key
            className="flex w-72 py-2.5 px-4 border rounded-lg space-y-1.5 transition duration-300 hover:shadow-lg cursor-pointer space-x-2"
            onClick={() => EditApplication(files)}
          >
            <div className="my-auto p-3 bg-blue-100 rounded-lg">
              <FaFile size={'1.7rem'} className="text-[#43a1f6]"/>
              {/* <button type='button' className="hover:text-blue-600">
                <BsThreeDotsVertical/>
              </button> */}
            </div>
            <div className="text-sm w-full text-left bg-white space-y-1">
              <p className='font-semibold'>{files.applyingFor}</p>
              <p className='text-xs text-gray-400'>5 days ago</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SavedData
