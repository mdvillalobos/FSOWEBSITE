import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RankContext } from '../../../../context/rankContext';
import { UserContext } from '../../../../context/userContext';
import ReactMarkdown from 'react-markdown';
import { RiArrowDropDownLine,  RiArrowDropUpLine } from "react-icons/ri";

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
      <div className="w-full relative">
        <div className="flex justify-between rounded-lg text-ellipsis overflow-hidden whitespace-nowrap border-2 border-[#93adc2] py-1 px-2 mt-3">
          <button type='button' onClick={() => setIsOpen(!isOpen)} className='flex justify-between my-auto w-full py-2 px-4'>
            {selected}
            {!isOpen ? (
              <RiArrowDropDownLine size={'1.5rem'} className=''/>
            ) : (
              <RiArrowDropUpLine size={'1.5rem'} className=''/>
            )}
          </button>
          <button className='text-white text-sm py-2.5 px-10 bg-NuButton rounded-md shadow-md duration-300 hover:bg-NuButtonHover hover:scale-105' onClick={onSubmit}>Submit</button>
        </div>
          
        {isOpen && 
          <div className="absolute flex flex-col mt-1 bg-white border rounded-md shadow-lg fade-in w-full border-[#93adc2] ">
            {availableRank?.map(i => (
              <button 
                key={i._id}
                type='button' 
                className='text-left hover:bg-NuButtonHover hover:text-white duration-200 py-1.5 px-4' 
                onClick={() => {setSelected(i.rankName), setIsOpen(!isOpen)}}>{i.rankName}
              </button>
            ))}
          </div>
        }
      </div>

      <div className=" p-4 mt-4 rounded-md border-2 border-[#93adc2]">
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
