import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RankContext } from '../../../../context/rankContext';
import { UserContext } from '../../../../context/userContext';
import ReactMarkdown from 'react-markdown';

const Requirements = ({ from }) => {
  const navigate = useNavigate();
  const { ranks } = useContext(RankContext);
  const { user } = useContext(UserContext);
  
  const availableRank = ranks?.filter(rankBasedOnTrack => rankBasedOnTrack.track === user.track);

  const [ isOpen, setIsOpen ] = useState(false);
  const [ selected, setSelected ] = useState(availableRank[0]?.rankName);

  const selectedRank = ranks?.find(rankRequirement => rankRequirement.rankName === selected);


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
      <button type='button' onClick={() => setIsOpen(!isOpen)} className='items-center py-[7.4px] px-4 w-36 text-xs rounded-sm font-medium text-ellipsis overflow-hidden whitespace-nowrap bg-gray-200'>
        {selected}
      </button>

      {isOpen && 
        <div className="absolute w-48 text-xs z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg flex flex-col">
          {availableRank?.map(i => (
            <button 
              key={i._id}
              type='button' 
              className='text-left' 
              onClick={() => setSelected(i.rankName)}>{i.rankName}
            </button>
          ))}
        </div>
      }

      <div className="bg-white text-black p-4">
        {selectedRank ? (
          selectedRank?.requirements.map((requirement, i) => (
            <ReactMarkdown key={requirement._id} className='font-Poppins mb-2'>{`&#8211; ${String(requirement.requirement)}`}</ReactMarkdown>
          ))
        ): (
          <p>No data</p>
        )}
      </div>
    </div>
  )
}

export default Requirements
