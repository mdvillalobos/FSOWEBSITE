import React, {useState, useEffect} from 'react';
import axios from 'axios';
import useEditProfile from '../../hooks/FacultyHooks/useEditProfile.jsx'

const PersonalDetailsForm = () => {
  
  const [data, setData] = useState({
    lastName: '',
    firstName: '',
    middleName: '', 
    email: '',
    employeeID: '',
    department: '',
  })

  useEffect(() => {
    axios.get('/api/getProfile')
    .then(res => setData(res.data))
    .catch(error => console.log(error))
  }, []);


  const {EditProfile} = useEditProfile();
  const updateProfile = async (e) => {
    e.preventDefault();
    const {lastName, firstName, middleName, email, employeeID, department} = data;
    await EditProfile(lastName, firstName, middleName, email, employeeID, department);
  }

  return (
    <div className='bg-white py-8 px-12 w-full shadow-lg font-Poppins'>
      <h1 className='text-4xl font-Montserrat font-semibold text-NuBlue'>Edit Personal Details</h1>
      <form onSubmit={updateProfile} className='flex flex-col font-Poppins'>
        <h1 className='mt-4 text-xl font-medium'>Personal Information</h1>

        <div className="setting-column-container">
          <div className="setting-input-container">
            <input type="text"
              required
              value={data.lastName} 
              onChange={(e) => setData({...data, lastName: e.target.value})}
              className='border-2 rounded-lg px-3 peer pt-7 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2]'
            />
            <span className='setting-input-label'>Last Name</span>
          </div>

          <div className="setting-input-container">
            <input type="text"
              required
              value={data.firstName} 
              onChange={(e) => setData({...data, firstName: e.target.value})}
              className='border-2 rounded-lg px-3 peer pt-7 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2]'
            />
            <span className='setting-input-label'>First Name</span>
          </div>
        </div>

        <div className="setting-column-container">
          <div className="setting-input-container">
            <input type="text"
              value={data.middleName} 
              onChange={(e) => setData({...data, middleName: e.target.value})}
              className='border-2 rounded-lg px-3 peer pt-7 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2]'
            />
            <span className='setting-input-label'>Middle Name</span>
          </div>

           <div className="setting-input-container">
            <input type="text"
              required
              value={data.email} 
              onChange={(e) => setData({...data, email: e.target.value})}
              className='border-2 rounded-lg px-3 peer pt-7 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2]'
            />
            <span className='setting-input-label'>Email</span>
          </div>
        </div>

        <div className="setting-column-container">
          <div className="setting-input-container">
            <input type="text"
              required
              value={data.employeeID} 
              onChange={(e) => setData({...data, employeeID: e.target.value})}
              className='border-2 rounded-lg px-3 peer pt-7 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2]'
            />
            <span className='setting-input-label'>Employee ID</span>
          </div>

          <div className="setting-input-container">
            <input type="text"
              required
              value={data.department}
              onChange={(e) => setData({...data, department: e.target.value})}
              className='border-2 rounded-lg px-3 peer pt-7 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2]'
            />
            <span className='setting-input-label'>Department</span>
          </div>
        </div>

        <div className='flex justify-end mt-4'>
          <input type="submit" value='Update' className='text-white font-semibold bg-NuBlue py-3 px-14 text-sm cursor-pointer rounded-lg duration-300 hover:bg-[#737ed6]' />
        </div>
      </form>
    </div>
  )
}

export default PersonalDetailsForm
