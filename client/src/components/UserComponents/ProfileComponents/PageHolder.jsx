import React, { useState } from 'react'
import { useContext } from "react";
import { UserContext } from "../../../../context/userContext.jsx";
import About from './About.jsx';
import Education from './Education.jsx';
import Seminar from './Seminar.jsx';
import Achievements from './Achievements.jsx';

const PageHolder = () => {
  const { user } = useContext(UserContext);
  const [ active, setActive ] = useState('About')

  return (
    <div className='bg-white shadow-md rounded-xl w-[70vw] min-h-[65vh] max-sm:w-full'>
      <div className="flex justify-between py-4 px-4 border-b-2">
        <div className=" space-x-2 max-sm:space-x-1">
          <button type='button' onClick={() => setActive('About')} className={`profileNav ${active === 'About' ? 'profileActive' : 'text-gray-500'}`}>About</button>
          {user?.role === 'user' ? (
            <>
              <button type='button' onClick={() => setActive('Education')} className={`profileNav ${active === 'Education' ? 'profileActive' : 'text-gray-500'}`}>Education</button>
              <button type='button' onClick={() => setActive('Seminars')} className={`profileNav ${active === 'Seminars' ? 'profileActive' : 'text-gray-500'}`}>Seminars</button>
              <button type='button' onClick={() => setActive('Achievements')} className={`profileNav ${active === 'Achievements' ? 'profileActive' : 'text-gray-500'}`}>Achievements</button>
            </>
          ) : null}
        </div>
        {/* <button className='bg-NuButton hover:bg-NuButtonHover duration-200 rounded-md text-white px-8 text-sm hover:shadow-lg hover:scale-105'>Generate CV</button> */}
      </div>

      <div className="px-8 py-8 ">
        { active === 'About' && <About/> }
        { active === 'Education' && <Education/> }
        { active === 'Seminars' && <Seminar/> }
        { active === 'Achievements' && <Achievements/> }
      </div>
    </div>
  )
}

export default PageHolder
