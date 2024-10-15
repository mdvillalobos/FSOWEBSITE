import { React, useState } from 'react';
import useCreateRank from '../../../hooks/AdminHooks/useCreateRank.jsx';
import { LuPencil } from "react-icons/lu";

const RankModal = () => {
  const [ seen, setSeen ] = useState(false)

  const togglePop = () => {
    setSeen(!seen)
  }

  return (
    <div>
      <button className='flex items-center px-7 py-[7px] w-36 text-xs bg-NuButton text-white rounded-md shadow-md duration-300 hover:bg-NuButtonHover hover:scale-105' onClick={togglePop}>
        <LuPencil size={'0.9rem'} className='mr-2'/> 
        Add Rank
      </button>
      {seen ? <CreateRankModal toggle={togglePop}/> : null}
    </div>
  )
}

export default RankModal

const CreateRankModal = (props) => {
  const { createRank } = useCreateRank();
  const [ data, setData ] = useState({
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

  const handleCreateRank = async (e) => {
    e.preventDefault();
    const { rankName, track, requirement_1, requirement_2, requirement_3, requirement_4, requirement_5, requirement_6, requirement_7, requirement_8, requirement_9, requirement_10 } = data;
    await createRank(rankName, track, requirement_1, requirement_2, requirement_3, requirement_4, requirement_5, requirement_6, requirement_7, requirement_8, requirement_9, requirement_10, props);
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen overflow-auto z-10 flex bg-black/40 justify-center items-center font-Poppins">
      <div className="relative h-[90%] w-[50%] bg-white shadow-lg rounded-2xl px-7 py-7 space-y-5 overflow-auto font-Poppins">
        <div className="flex justify-between">
          <h2 className='text-3xl font-bold font-Poppins text-center w-full'>RANK FORM</h2> 
          <button onClick={props.toggle} className='absolute top-3 right-3 text-3xl px-2 duration-300 rounded-full hover:bg-[#eae7e7] text-[#3b3c3c]'>&times;</button>
        </div>
        <div className="break-words text-sm">
          <form onSubmit={handleCreateRank} className='flex flex-col space-y-2'>
            <select value={data.track} onChange={(e) => setData({...data, track: e.target.value})} className='rankInputs'>
              <option value="">Select Track</option>
              <option value="Academic Track">Academic Track</option>
              <option value="Industry Practitioner Track">Industry Practitioner Track</option>
            </select>
            <input 
              type="text" 
              placeholder='Rank Name'
              value={data.rankName} 
              onChange={(e) => setData({...data, rankName: e.target.value})} 
              className='rankInputs'
            />
      
            <textarea 
              placeholder='Requirment 1'
              value={data.requirement_1} 
              onChange={(e) => setData({...data, requirement_1: e.target.value})} 
              className='rankInputs'
            />

            <textarea 
              placeholder='Requirment 2'
              value={data.requirement_2} 
              onChange={(e) => setData({...data, requirement_2: e.target.value})} 
              className='rankInputs'
            />

            <textarea 
              placeholder='Requirment 3'
              value={data.requirement_3} 
              onChange={(e) => setData({...data, requirement_3: e.target.value})} 
              className='rankInputs'
            />

            
            <textarea 
              placeholder='Requirment 4'
              value={data.requirement_4} 
              onChange={(e) => setData({...data, requirement_4: e.target.value})} 
              className='rankInputs'
            />

            <textarea 
              placeholder='Requirment 5'
              value={data.requirement_5} 
              onChange={(e) => setData({...data, requirement_5: e.target.value})} 
              className='rankInputs'
            />

            <textarea 
              placeholder='Requirment 6'
              value={data.requirement_6} 
              onChange={(e) => setData({...data, requirement_6: e.target.value})} 
              className='rankInputs'
            />
            <textarea 
              placeholder='Requirment 7'
              value={data.requirement_7} 
              onChange={(e) => setData({...data, requirement_7: e.target.value})} 
              className='rankInputs'
            />

            <textarea 
              placeholder='Requirment 8'
              value={data.requirement_8} 
              onChange={(e) => setData({...data, requirement_8: e.target.value})} 
              className='rankInputs'
            />

            <textarea 
              placeholder='Requirment 9'
              value={data.requirement_9} 
              onChange={(e) => setData({...data, requirement_9: e.target.value})} 
              className='rankInputs'
            />

            <textarea 
              placeholder='Requirment 10'
              value={data.requirement_10} 
              onChange={(e) => setData({...data, requirement_10: e.target.value})} 
              className='rankInputs'
            />

            <div className="flex mt-4">
              <input type="submit" value="Submit" className='py-3 px-10 text-sm bg-NuButton text-white hover:bg-[#5d69c6] duration-300 rounded-lg cursor-pointer shadow-lg hover:shadow-lg w-full'/>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

