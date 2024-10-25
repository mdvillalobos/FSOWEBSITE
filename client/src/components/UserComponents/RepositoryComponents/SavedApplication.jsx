import React, { useState } from 'react';
import { FaFile } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { BsThreeDots } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import NotFound from '../../../assets/images/NotFound.webp';
import useDeleteFile from '../../../hooks/UserHooks/useDeleteFile';

const SavedData = ({ data }) => {
  const navigate = useNavigate();
  const { DeleteFile } = useDeleteFile();
  const [ isOpen, setIsOpen ] = useState(null)

  const toggleMenu = (id) => {
    setIsOpen(isOpen === id ? null : id); 
  };

  const EditApplication = (files) => {
    return navigate('/application/form/edit', { state: { files: files, from: 'Repository' }})
  }

  const handleDeleteFile = async (formID) => {
    await DeleteFile(formID)
  }

  return (
    <div className='flex flex-col'>
      <div className="flex space-x-6">
        {data?.length > 0 ? 
          data?.map(files => (
            <div 
              key={files._id} // Ensure each button has a unique key
              className="w-48 py-3 px-5 border-2 rounded-lg space-y-0.5 transition duration-300 cursor-pointer space-x-2"
              onClick={() => EditApplication(files)}
            >
              <div className="flex justify-end relative space-y-6">
                <button type='button' className="hover:text-blue-600" onClick={(e) => {e.stopPropagation(), toggleMenu(files._id)}}>
                  <BsThreeDots size={'1.2rem'} className='text-gray-500'/>
                </button>

                {isOpen === files._id && (
                  <div className="absolute flex flex-col bg-white text-sm shadow-lg rounded-md overflow-hidden w-full right-[-9rem] fade-in">
                    <button className='flex text-left py-2 px-4 hover:bg-gray-200 duration-200' onClick={(e) => {e.stopPropagation(), EditApplication(files)}}><FiEdit3 className='my-auto mr-2'/>Edit</button>
                    <button className='flex text-left py-2 px-4 hover:bg-gray-200 duration-200' onClick={(e) => {e.stopPropagation(), handleDeleteFile(files._id)}}><IoTrashOutline className='my-auto mr-2'/>Delete</button>
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
          ))

          : (
            <div className='flex flex-col justify-center items-center mt-4 mb-10 space-y-2 select-none pointer-events-none w-full'>
              <img src={NotFound} alt="No Data Found" className='h-80 opacity-90 max-sm:h-56'/>
              <h1 className='flex justify-center font-medium text-2xl text-gray-500'>No Available Data</h1>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default SavedData
