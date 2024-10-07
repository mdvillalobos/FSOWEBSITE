import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RankContext } from '../../../../context/rankContext';
import { UserContext } from '../../../../context/userContext';

const Requirements = ({ from }) => {
  const navigate = useNavigate();
  const [ selected, setSelected ] = useState('Instructor 1');
  const { ranks } = useContext(RankContext);
  const { user } = useContext(UserContext);

  const availableRank = ranks.filter(rankBasedOnTrack => rankBasedOnTrack.track === user.track);
  const selectedRank = ranks.find(rankRequirement => rankRequirement.rankName === selected);

  const onSubmit = (e) => {
    e.preventDefault();
    if(from === 'Application For Re-Ranking') {
      return navigate('/application/form', { state: { selectedForm: selected, from: from }})
    }

    if(from === 'Repository') {
      return navigate('/application/form', { state: { selectedForm: selected, from: from }}) 
    }
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <select value= {selected} onChange={(e) => setSelected(e.target.value)} className=' bg-[#f0f0f0] text-black p-1.5 mt-4 text-sm font-normal text-center w-52 rounded-sm ' >
          {availableRank ? (
            availableRank.map(i => (
              <option key ={i._id} value={i.rankName}>{i.rankName}</option>
            ))
          ) : (
            <p>No Available Rank</p>
          )}
        </select>

        <input type="submit" value='submit' className='py-2 px-6 my-4 text-sm bg-[#35408e] text-white hover:bg-[#5d69c6] duration-300 rounded cursor-pointer'/>
      </form>

      <div className="bg-white text-black p-4">
        {selectedRank.requirements.map((requirement, i) => (
          <li key={requirement._id} className='requirements'>{requirement.requirement}</li>
        ))}
      </div>
    </div>
  )
}

export default Requirements
