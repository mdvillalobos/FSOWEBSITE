import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFile } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { BsThreeDots } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import { GrView } from "react-icons/gr";


const SavedData = () => {
  const navigate = useNavigate()
  const [ data, setData ] = useState();
  const [ isOpen, setIsOpen ] = useState(null)

  const toggleMenu = (id) => {
    setIsOpen(isOpen === id ? null : id); // Toggle the menu
  };

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
      <div className="flex space-x-6">
        {data?.map(files => (
          <div 
            key={files._id} // Ensure each button has a unique key
            className="w-48 py-3 px-5 border-2 rounded-lg space-y-0.5 transition duration-300 cursor-pointer space-x-2"
            /* onClick={() => EditApplication(files)} */
          >
            <div className="flex justify-end relative space-y-6">
              <button type='button' className="hover:text-blue-600" onClick={() => toggleMenu(files._id)}>
                <BsThreeDots size={'1.2rem'} className='text-gray-500'/>
              </button>

              {isOpen === files._id && (
                <div className="absolute flex flex-col bg-white text-sm shadow-lg rounded-md overflow-hidden w-full right-[-9rem] fade-in">
                  <button className='flex text-left py-2 px-4 hover:bg-gray-200 duration-200'><GrView className='my-auto mr-2'/>Open</button>
                  <button className='flex text-left py-2 px-4 hover:bg-gray-200 duration-200'><FiEdit3 className='my-auto mr-2'/>Edit</button>
                  <button className='flex text-left py-2 px-4 hover:bg-gray-200 duration-200'><IoTrashOutline className='my-auto mr-2'/>Delete</button>
                </div>
              )}
            </div>
            
            <div className="flex flex-col items-center space-y-3 pb-2">
              <div className="my-auto p-5 bg-blue-100 rounded-full">
                <FaFile size={'1.8rem'} className="text-[#43a1f6]"/>
              </div>
              <div className="text-sm bg-white space-y-1 text-center">
                <p className='font-semibold'>{files.applyingFor}</p>
                <p className='text-xs text-gray-400'>5 days ago</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SavedData
