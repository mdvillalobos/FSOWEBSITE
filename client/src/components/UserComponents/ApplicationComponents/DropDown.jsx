import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RankContext } from '../../../../context/rankContext';
import { UserContext } from '../../../../context/userContext';
import ReactMarkdown from 'react-markdown';
import { RiArrowDropDownLine,  RiArrowDropUpLine } from "react-icons/ri";
import FileDetect from './FileDetect';
import { FocusOn } from 'react-focus-on';

const Requirements = ({ from }) => {
  const navigate = useNavigate();
  const { ranks } = useContext(RankContext);
  const { user } = useContext(UserContext);
  const [ isOpen, setIsOpen ] = useState(false);
  const [ selected, setSelected ] = useState();
  const [ data, setData ] = useState(null);
  const [ isDetect, setIsDetect ] = useState(false)

  const filterRankByTrack = ranks?.filter(rankBasedOnTrack => rankBasedOnTrack.track === user.track);
  const currentRankIndex = ranks?.findIndex(rank => rank.rankName === user?.rank);
  const availableRank = filterRankByTrack?.slice(currentRankIndex + 1)

  useEffect(() => {
    if (ranks) {
      setSelected(availableRank.length > 0 ? availableRank[0].rankName : null);
    }
  }, [ranks, user.track]);
  
  const selectedRank = ranks?.find(rankRequirement => rankRequirement.rankName === selected);


  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(selected)
    if(from === 'Application') {
      const userSelected = selected;
      console.log(userSelected)

      const res = await axios.get(`/api/getUserFileInRepo?selected=${selected}`);
      setData(res.data); 

      if (res.data) {
        setIsDetect(!isDetect)
      } else {
        return navigate('/application/form', { state: { selectedForm: selected, from: from } });
      }
    }

    if(from === 'Repository') {
      return navigate('/application/form', { state: { selectedForm: selected, from: from }}) 
    }
  }
  return (
    <div>
      {isDetect ? (<FocusOn><FileDetect handleExit={() => setIsDetect(!isDetect)} rest={data}/></FocusOn>) : null}
      <div className="w-full relative max-sm:text-sm">
        <div className="flex justify-between rounded-lg text-ellipsis overflow-hidden whitespace-nowrap border-2 border-[#93adc2] py-1 px-2 mt-3 max-sm:py-0.5 max-sm:px-0.5">
          <button type='button' onClick={() => setIsOpen(!isOpen)} className='flex justify-between w-full py-2 px-4'>
            <span className='my-auto'>{selected}</span>
            {!isOpen ? (
              <RiArrowDropDownLine size={'1.5rem'} className=''/>
            ) : (
              <RiArrowDropUpLine size={'1.5rem'} className=''/>
            )}
          </button>
          <button className='text-white text-sm py-2.5 px-10 bg-NuButton rounded-md shadow-md duration-300 hover:bg-NuButtonHover hover:scale-105' onClick={onSubmit}>Submit</button>
        </div>
          
        {isOpen && 
          <div className="absolute flex flex-col mt-1 bg-white border rounded-md shadow-lg fade-in w-full border-[#93adc2] h-72 overflow-y-scroll ">
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

      <div className=" p-4 mt-4 rounded-md border-2 border-[#93adc2] max-sm:text-sm">
        {selectedRank ? (
          selectedRank?.requirements.map((requirement, i) => {
            const items = String(requirement.requirement) // Remove leading "o"
            .split('\n'); // Split based on bullet characters and dashes

            return (
              <div key={requirement._id} className='font-Poppins mb-2'>
                {items.map((item, index) => (
                  <div key={index}>
                  {index === 0 ? (
                    <ReactMarkdown className='font-medium'>{`&#8211; ${item.trim()}`}</ReactMarkdown> // Dash for the first line
                  ) : (
                    <ReactMarkdown className='pl-4'>{item.trim()}</ReactMarkdown> // No dash for subsequent lines
                  )}
                </div>
                ))}
              </div>
            );
          })
        ): (
          <p>No data</p>
        )}
      </div>
    </div>
  )
}

export default Requirements
