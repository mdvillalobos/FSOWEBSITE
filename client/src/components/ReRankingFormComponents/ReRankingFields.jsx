import React from 'react'

const ReRankingFields = ({requirement, setData}) => {
    return (
        <div>
            <div className="w-full flex justify-between border-b-2 border-[#35408E] py-5">
                <p className='text-[0.9rem]  w-[33vw]'>{requirement}</p>
                <div>
                    <div className="inputContainer">
                        <p className='text-sm font-normal'>Attached Image:</p>
                        <input type="file" className='inputFileFields ' onChange={(e) => setData(e.target.files[0])}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReRankingFields
