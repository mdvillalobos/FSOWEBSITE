import React, { useState } from 'react'
 
const Config = () => {
    const [ isChecked, setIsChecked ] = useState(false)
    return (
        <div className='flex-1 bg-white border-2 rounded-xl py-4 px-5 space-y-4'>
            <p className='text-xl font-medium'>Configuration</p>
            <div className="space-y-4 text-xs">
                <div className="flex justify-between">
                    <p>Academic Yr. </p>
                    <p>2022-2024</p>
                </div>
                <div className="flex justify-between">
                    <p>Application For <br/> Re-Ranking</p>
                    <label htmlFor="check" className='bg-gray-300 w-12 h-5 rounded-full relative cursor-pointer my-auto pointer-events-none '>
                        <input type="checkbox" id='check' className='sr-only peer' onChange={(e)=> setIsChecked(!isChecked)}/>
                        <span className='w-6 h-6 bg-[#41518d] absolute rounded-full left-0 top-[-2px] peer-checked:bg-rose-600 peer-checked:left-[25px] transition-all duration-500 '></span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default Config
