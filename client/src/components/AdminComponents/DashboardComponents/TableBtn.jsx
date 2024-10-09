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
      <button className='flex items-center px-7 py-1.5 text-sm bg-[#41518d] text-white hover:bg-[#5d69c6] hover:shadow-md duration-300 rounded-md' onClick={togglePop}><LuPencil size={'0.9rem'} className='mr-2'/> Add Rank</button>
      {seen ? <RankModal toggle={togglePop}/> : null}
    </div>
  )
}

export default TableBtn
