import React, { useContext, useState } from 'react'
import useRegisterProfile from '../../hooks/AuthHooks/useRegisterProfile';
import { RankContext } from '../../../context/rankContext';
import useToast from '../../hooks/Helpers/useToast';
import Default from '../../assets/images/Default.webp';
import { MdError } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";

const ProfileRegistrationForm = () => {
  const { Toast } = useToast();
  const { ranks } = useContext(RankContext);
  const { registerProfile } = useRegisterProfile();
  const [ isSubmitted, setIsSubmitted ] = useState(false);

  const [ data, setData ] = useState({
    profilePicture: null,
    lastName: '', 
    firstName: '',
    middleName: '',
    contact: '',
    sex: '',
    track: '', 
    rank: '',
    college: '',
    department: '', 
    position: '', 
  });

  const trackOptions = Array.from(new Set(ranks?.map(rank => rank.track)));
  const filteredRank = ranks?.filter(rank => data.track ? rank.track === data.track : false);

  console.log(ranks)
  
  const RegisterUserInfo = async (e) => {
    e.preventDefault();

    const fieldsToCheck = [
      data.lastName,
      data.firstName, 
      data.contact,
      data.sex,
      data.track,
      data.rank,
      data.department,
      data.college,
      data.position,
    ];
    setIsSubmitted(true);

    if (fieldsToCheck.some(field => field.trim() === '')) {
      return Toast.fire({
        icon: 'error',
        title: 'Require All fields'
      })
    }
    await registerProfile(data.profilePicture, data.lastName, data.firstName, data.middleName, data.contact, data.sex, data.track, data.rank, data.college, data.department, data.position);
  }

  return (
    <div className='flex justify-center' >
      <form onSubmit={RegisterUserInfo} autoComplete='off' className="space-y-4 py-8 w-full px-24">
        <div className="flex flex-col items-center mb-5">
          <div className="relative">
            <p className='font-medium mb-2 text-xl'>Profile Picture</p>
            <label className='flex justify-center items-center rounded-full h-36 w-36 bg-gray-200 cursor-pointer overflow-hidden border-2'>
              <input type='file' className='hidden' accept="image/*" onChange={(e) => setData({ ...data, profilePicture: e.target.files[0]})}/>
              {data.profilePicture ? (
                <img src={URL.createObjectURL(data.profilePicture)} alt='Profile Picture' className='w-full h-full object-cover' />
              ) : (
                <img src={Default} alt='Profile Picture' className='w-full h-full object-cover'/>             
              )}
              <IoIosAddCircle size={'3.5rem'} className='absolute p-0.5 rounded-full bg-white right-0 top-32 text-gray-500 hover:text-NuButtonHover'/>
            </label>
          </div>
        </div>

        <h1 className='text-[#35408E] font-Poppins font-semibold text-2xl'>Personal Information</h1>

        <div className='space-y-2'>
          <div className="flex space-x-14 w-full max-lg:flex-col max-lg:space-x-0">
            <div className="relative flex flex-col flex-1 space-y-1">
              <label htmlFor="firstName">First Name</label>
              <input type="text" id='firstName' name='firstName' 
                className={ `border-2 px-3 py-3 rounded-md text-sm ${isSubmitted && !data.firstName.trim() ? 'border-red-400' : ''}` }
                onChange={ (e) => setData({ ...data, firstName: e.target.value}) }
              />
              {isSubmitted && !data.firstName.trim() && (
                <span className="absolute right-[-25px] top-9"><MdError size={'1.3rem'} className='text-red-400'/></span>
              )}
            </div>

            <div className="relative flex flex-col flex-1 space-y-1">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id='lastName' name='lastName' 
                className={`border-2 px-3 py-3 rounded-md text-sm ${isSubmitted && !data.lastName.trim() ? 'border-red-400' : ''}`}
                onChange={(e) => setData({ ...data, lastName: e.target.value})}
              />
              {isSubmitted && !data.lastName.trim() && (
                <span className="absolute right-[-25px] top-9"><MdError size={'1.3rem'} className='text-red-400'/></span>
              )}
            </div>
          </div>

          <div className="flex space-x-14 max-lg:flex-col max-lg:space-x-0">
            <div className="relative flex flex-col flex-1 space-y-1">
              <label htmlFor="middleInitial">Middle Name</label>
              <input type="text" id='middleInitial' name='middleInitial' 
                placeholder='Optional'
                className='border-2 px-3 py-3 rounded-md w-full text-sm'
                onChange={(e) => setData({ ...data, middleName: e.target.value})}
              />
            </div>

            <div className="relative flex flex-col flex-1 space-y-1">
              <label htmlFor="contact">Contact No.</label>
              <input type="text" id='contact' name='contact'  maxLength="11"
                className={`border-2 px-3 py-3 rounded-md w-full text-sm ${isSubmitted && !data.contact.trim() ? 'border-red-400' : ''}`}
                onChange={(e) => setData({ ...data, contact: e.target.value})}
              />
              {isSubmitted && !data.contact.trim() && (
                  <span className="absolute right-[-25px] top-9"><MdError size={'1.3rem'} className='text-red-400'/></span>
              )}
            </div>
          </div>

          <div className="flex space-x-14 max-lg:flex-col max-lg:space-x-0">
            <div className="relative flex flex-col flex-1 space-y-1">
              <label htmlFor="sex">Sex</label>
              <select id='sex' name='sex'
                className={`border-2 px-3 py-3 rounded-md w-full text-sm ${isSubmitted && !data.sex.trim() ? 'border-red-400' : ''}`} 
                onChange={(e) => setData({ ...data, sex: e.target.value})}
              >
                <option value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {isSubmitted && !data.sex.trim() && (
                  <span className="absolute right-[-25px] top-9"><MdError size={'1.3rem'} className='text-red-400'/></span>
              )}
            </div>

            <div className="relative flex flex-col flex-1 space-y-1">
              <label htmlFor="position">Employee Position</label>
              <select id='position' name='position'
                className={`border-2 px-3 py-3 rounded-md w-full text-sm ${isSubmitted && !data.position.trim() ? 'border-red-400' : ''}`}
                onChange={(e) => setData({...data, position: e.target.value})}
              >
                <option value=""></option>
                <option value="Faculty">Faculty</option>
                <option value="Director">Director</option>
                <option value="FSO">Faculty Service Office</option>
              </select>
              {isSubmitted && !data.position.trim() && (
                  <span className="absolute right-[-25px] top-9"><MdError size={'1.3rem'} className='text-red-400'/></span>
              )}
            </div>
          </div>

          <div className="flex space-x-14 max-lg:flex-col max-lg:space-x-0">
            <div className="relative flex flex-col flex-1 space-y-1">
              <label htmlFor="track">Track</label>
              <select id='track' name='track'
                className={`border-2 px-3 py-3 rounded-md w-full text-sm ${isSubmitted && !data.track.trim() ? 'border-red-400' : ''}`} 
                onChange={(e) => setData({ ...data, track: e.target.value})}
              >
                <option value="">Select a track</option>
                {trackOptions?.map(track => (
                  <option key={track} value={track}>{track}</option>
                ))}
              </select>
              {isSubmitted && !data.track.trim() && (
                  <span className="absolute right-[-25px] top-9"><MdError size={'1.3rem'} className='text-red-400'/></span>
              )}
            </div>

            <div className="relative flex flex-col flex-1 space-y-1">
              <label htmlFor="firstName">Current Rank</label>
              <select 
                className={`border-2 px-3 py-3 rounded-md w-full text-sm ${isSubmitted && !data.rank.trim() ? 'border-red-400' : ''}`}
                onChange={(e) => setData({ ...data, rank: e.target.value})}
              >
                <option value='None'>None</option>
                {filteredRank?.map(rank => (
                  <option key={rank._id} value={rank.rankName}>{rank.rankName}</option>
                ))}
              </select>
              {isSubmitted && !data.rank.trim() && (
                  <span className="absolute right-[-25px] top-9"><MdError size={'1.3rem'} className='text-red-400'/></span>
              )}
            </div>
          </div>

          <div className="flex space-x-14 max-lg:flex-col max-lg:space-x-0">
            <div className="relative flex flex-col flex-1 space-y-1">
              <label htmlFor="college">Department</label>
              <input type='text' id='department' name='department'
               className={`border-2 px-3 py-3 rounded-md w-full text-sm ${isSubmitted && !data.department.trim() ? 'border-red-400' : ''}`}
                onChange={(e) => setData({...data, department: e.target.value})}
              />
              {isSubmitted && !data.department.trim() && (
                  <span className="absolute right-[-25px] top-9"><MdError size={'1.3rem'} className='text-red-400'/></span>
              )}
            </div>
          </div>

          <div className="relative flex flex-col flex-1 space-y-1">
              <label htmlFor="department">College</label>
              <select id='college' name='college'
                className={`border-2 px-3 py-3 rounded-md w-full text-sm ${isSubmitted && !data.college.trim() ? 'border-red-400' : ''}`}
                onChange={(e) => setData({...data, college: e.target.value})}
              >
                <option value=''></option>
                <option value="College of Allied Health">College of Allied Health</option>
                <option value="College of Architecture">College of Architecture</option>
                <option value="College of Business and Accountancy">College of Business and Accountancy</option>
                <option value="College of Computing and Information Technologies">College of Computing and Information Technologies</option>
                <option value="College of Education, Arts and Science">College of Education, Arts and Science</option>
                <option value="College of Engineering">College of Engineering</option>
                <option value="College of Tourism and Hospitality Management">College of Tourism and Hospitality Management</option>
              </select>
              {isSubmitted && !data.college.trim() && (
                  <span className="absolute right-[-25px] top-9"><MdError size={'1.3rem'} className='text-red-400'/></span>
              )}
            </div>
        </div>
        
        <div className="flex justify-end max-sm:justify-normal">
          <input type="submit" value="Submit" className='font-medium cursor-pointer text-white bg-[#41518d] py-2.5 px-16 duration-300 hover:bg-NuButtonHover rounded-md max-lg:w-full'/>
        </div>
      </form>
    </div>
  )
}

export default ProfileRegistrationForm
