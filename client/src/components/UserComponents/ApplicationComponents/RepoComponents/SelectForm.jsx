import React, { useState } from 'react'

const SelectForm = () => {
    const [ selectedRank, setSelectedRank ] = useState('Instructor 1');

    useEffect(() => {
        axios.get('/api/getRankList')
        .then(data => setData(data.data))
        .catch(error => console.log(error))
      }, [])

    return (
        <div>
            <form action="">
                <select value= {selected} onChange={(e) => setSelected(e.target.value)} className=' bg-[#f0f0f0] text-black p-1.5 mt-4 text-sm font-normal text-center w-52 rounded-sm ' >
                    {data.map(i => (
                      <option key ={i._id} value={i.rankName}>{i.rankName}</option>
                    ))}
                </select>
            </form>
        </div>
    )
}

export default SelectForm
