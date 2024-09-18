import React from 'react'
import { RxCross2 } from "react-icons/rx";

const ViewImage = ({handleExit, image}) => {
  return (
    <div className='fixed top-0 left-0 w-screen h-screen overflow-auto z-10 flex bg-black/70 justify-center items-center'>
      <button onClick={handleExit} className='absolute text-3xl px-2 right-4 top-4 duration-300 text-white'>
        <RxCross2/>
      </button> 
      <div className="relative h-[80vh] w-[80vw] bg-black shadow-lg rounded-md overflow-hidden">
        <img draggable='false' className='object-fill h-full w-full aspect-auto select-none' src={`http://localhost:3001/${image}`} alt={image} />
      </div>
    </div>
  )
}

export default ViewImage
