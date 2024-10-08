import React, {useState} from 'react'
import { LuPencil } from "react-icons/lu";
import RankModal from './RankModal.jsx';

const TableBtn = () => {
  const [seen, setSeen] = useState(false)

  const togglePop = () => {
    setSeen(!seen)
  }

  return (
    <div>
      <div className='flex justify-between mb-4 mt-4'>
        <div className="">
          <h1 className='text-4xl font-semibold font-Montserrat'>Surveys</h1>
        </div>
        <div className="flex font-Poppins">
          <button className='flex items-center px-4 text-sm bg-[#41518d] text-white hover:bg-[#5d69c6] hover:shadow-lg duration-300 rounded-lg'>Create Survey</button>
          <button className='flex items-center px-4 text-sm bg-[#41518d] text-white hover:bg-[#5d69c6] hover:shadow-lg duration-300 rounded-lg' onClick={togglePop}><LuPencil size={'0.9rem'} className='mr-2'/> Add Rank</button>
            {seen ? <RankModal toggle={togglePop}/> : null}
        </div>
    </div>
    </div>
  )
}

export default TableBtn
