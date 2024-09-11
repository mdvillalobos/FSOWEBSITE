import { React, useState } from 'react';
import { LuPencil } from "react-icons/lu";
import useCreateRank from '../../../hooks/AdminHooks/useCreateRank.jsx';


const RankModal = (props) => {
  const [data, setData] = useState({
    rankName: '',
    track: '',
    requirement_1: '',
    requirement_2: '',
    requirement_3: '',
    requirement_4: '',
    requirement_5: '',
    requirement_6: '',
    requirement_7: '',
    requirement_8: '',
    requirement_9: '',
    requirement_10: '',
  })
  
  const { createRank } = useCreateRank();

  const handleCreateRank = async (e) => {
    e.preventDefault();
    const { rankName, track, requirement_1, requirement_2, requirement_3, requirement_4, requirement_5, requirement_6, requirement_7, requirement_8, requirement_9, requirement_10 } = data;
    await createRank(rankName, track, requirement_1, requirement_2, requirement_3, requirement_4, requirement_5, requirement_6, requirement_7, requirement_8, requirement_9, requirement_10, props);
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-auto">
      <div className="absolute h-2/3 w-2/4 min-w-content top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] font-Poppins">
        <div className="flex justify-between items-center bg-white mb-2 rounded-md shadow-lg py-3 px-6">
          <h2 className='text-center text-lg font-medium'>Report Form</h2>
          <button onClick={props.toggle} className='text-2xl duration-300 hover:bg-[#E8E8E8] text-blue-950'>&times;</button>
        </div>
        <div className="bg-white h-[87%] shadow-lg rounded-md">
          <div className="px-10 py-9 space-y-8 break-words text-sm">
            <form onSubmit={handleCreateRank} className='flex flex-col' >
              <input 
                type="text" 
                value={data.rankName} 
                onChange={(e) => setData({...data, rankName: e.target.value})} 
                className='px-2 mb-4 w-52 py-2 text-sm border-2 outline-none'
              />
              <select value={data.track} onChange={(e) => setData({...data, track: e.target.value})}>
                <option value="Academic Track">Academic Track</option>
                <option value="Industry Practitioner Track">Industry Practitioner Track</option>
              </select>
              <textarea 
                value={data.requirement_1} 
                onChange={(e) => setData({...data, requirement_1: e.target.value})} 
                className='px-2 mb-4 w-full py-2 text-sm border-2 outline-none'
              />
              <textarea 
                value={data.requirement_2} 
                onChange={(e) => setData({...data, requirement_2: e.target.value})} 
                className='px-2 mb-4 w-full py-2 text-sm border-2 outline-none'
              />
              <textarea 
                value={data.requirement_3} 
                onChange={(e) => setData({...data, requirement_3: e.target.value})} 
                className='px-2 mb-4 w-full py-2 text-sm border-2 outline-none'
              />
              <textarea 
                value={data.requirement_4} 
                onChange={(e) => setData({...data, requirement_4: e.target.value})} 
                className='px-2 mb-4 w-full py-2 text-sm border-2 outline-none'
              />
              <textarea 
                value={data.requirement_5} 
                onChange={(e) => setData({...data, requirement_5: e.target.value})} 
                className='px-2 mb-4 w-full py-2 text-sm border-2 outline-none'
              />
              <textarea 
                value={data.requirement_6} 
                onChange={(e) => setData({...data, requirement_6: e.target.value})} 
                className='px-2 mb-4 w-full py-2 text-sm border-2 outline-none'
              />
              <textarea 
                value={data.requirement_7} 
                onChange={(e) => setData({...data, requirement_7: e.target.value})} 
                className='px-2 mb-4 w-full py-2 text-sm border-2 outline-none'
              />
              <textarea 
                value={data.requirement_8} 
                onChange={(e) => setData({...data, requirement_8: e.target.value})} 
                className='px-2 mb-4 w-full py-2 text-sm border-2 outline-none'
              />
              <textarea 
                value={data.requirement_9} 
                onChange={(e) => setData({...data, requirement_9: e.target.value})} 
                className='px-2 mb-4 w-full py-2 text-sm border-2 outline-none'
              />
              <textarea 
                value={data.requirement_10} 
                onChange={(e) => setData({...data, requirement_10: e.target.value})} 
                className='px-2 mb-4 w-full py-2 text-sm border-2 outline-none'
              />
              <div className="flex mt-4">
                <input type="submit" value="Submit" className=' py-2 px-6 text-sm bg-[#35408e] text-white hover:bg-[#5d69c6] duration-300 rounded cursor-pointer'/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RankModal

