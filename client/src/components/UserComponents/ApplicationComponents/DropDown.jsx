import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Instructor1Requirement from './Requirements/Instructor/Instructor1Requirement.jsx';
import Instructor2Requirement from './Requirements/Instructor/Instructor2Requirement.jsx';
import Instructor3Requirement from './Requirements/Instructor/Instructor3Requirement.jsx';
import Instructor4Requirement from './Requirements/Instructor/Instructor4Requirement.jsx';

import Associate1Requirement from './Requirements/AssociateProfessor/Associate1Requirement.jsx';
import Associate2Requirement from './Requirements/AssociateProfessor/Associate2Requirement.jsx';
import Associate3Requirement from './Requirements/AssociateProfessor/Associate3Requirement.jsx';
import Associate4Requirement from './Requirements/AssociateProfessor/Associate4Requirement.jsx';


const Requirements = ({ from }) => {
  const navigate = useNavigate();
  const [ data, setData ] = useState([]);
  const [ selected, setSelected ] = useState('Instructor 1');

  useEffect(() => {
    axios.get('/api/getRankList')
    .then(data => setData(data.data))
    .catch(error => console.log(error))
  }, [])

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
          {data.map(i => (
            <option key ={i._id} value={i.rankName}>{i.rankName}</option>
          ))}
        </select>

        <input type="submit" value='submit' className='py-2 px-6 my-4 text-sm bg-[#35408e] text-white hover:bg-[#5d69c6] duration-300 rounded cursor-pointer'/>
      </form>

      <div className="bg-white text-black p-4">
        {selected == 'Instructor 1' ?<Instructor1Requirement/>:''}
        {selected == 'Instructor 2' ?<Instructor2Requirement/>:''}
        {selected == 'Instructor 3' ?<Instructor3Requirement/>:''}
        {selected == 'Instructor 4' ?<Instructor4Requirement/>:''}

        {selected == 'Assistant Professor 1' ?<Instructor4Requirement/>:''}
        {selected == 'Assistant Professor 2' ?<Instructor4Requirement/>:''}
        {selected == 'Assistant Professor 3' ?<Instructor4Requirement/>:''}
        {selected == 'Assistant Professor 4' ?<Instructor4Requirement/>:''}
        
        {selected == 'Associate Professor 1' ?<Associate1Requirement/>:''}
        {selected == 'Associate Professor 2' ?<Associate2Requirement/>:''}
        {selected == 'Associate Professor 3' ?<Associate3Requirement/>:''}
        {selected == 'Associate Professor 4' ?<Associate4Requirement/>:''}

        {selected == 'Full Professor 1' ?<Instructor4Requirement/>:''}
        {selected == 'Full Professor 2' ?<Instructor4Requirement/>:''}
        {selected == 'Full Professor 3' ?<Instructor4Requirement/>:''}
        {selected == 'Full Professor 4' ?<Instructor4Requirement/>:''}
      </div>
    </div>
  )
}

export default Requirements
