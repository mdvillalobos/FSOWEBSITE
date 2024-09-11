import React, {useState} from 'react';
import useChangePassword from '../../hooks/FacultyHooks/useChangePassword';

const ChangePasswordForm = () => {
  const [data, setData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })

  const {ChangePassword} = useChangePassword();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const {oldPassword, newPassword, confirmNewPassword} = data;
    await ChangePassword(oldPassword, newPassword, confirmNewPassword)
  }
  
  return (
    <div className='bg-white py-8 px-12 w-full shadow-lg'>
      <h1 className='text-4xl font-Montserrat font-semibold text-NuBlue'>Change Password</h1>
      <p className='font-Poppins mt-2'>Your password must be at least 8 characters and should include a combination of uppercase and lowercase letters, number and special characters (!$@%).</p>
      
      <form onSubmit={handleChangePassword}>
        <div className="flex flex-col font-Poppins">
          <div className="setting-input-container">
            <input type="text"
              required
              value={data.oldPassword} 
              onChange={(e) => setData({...data, oldPassword: e.target.value})}
              className='border-2 rounded-lg px-3 peer pt-7 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2]'
            />
            <span className='setting-input-label'>Old Password</span>
          </div>
    
          <div className="setting-input-container">
            <input type="text"
              required
              value={data.newPassword} 
              onChange={(e) => setData({...data, newPassword: e.target.value})}
              className='border-2 rounded-lg px-3 peer pt-7 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2]'
            />
            <span className='setting-input-label'>New Password</span>
          </div>
            
          <div className="setting-input-container">
            <input type="text"
              required
              value={data.confirmNewPassword} 
              onChange={(e) => setData({...data, confirmNewPassword: e.target.value})}
              className='border-2 rounded-lg px-3 peer pt-7 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2]'
            />
            <span className='setting-input-label'>Confirm New Password</span>
          </div>

          <div className='flex justify-end'>
            <input type="submit" value='Change Password' className='text-white font-semibold font-Poppins bg-NuBlue py-2 px-10 text-sm cursor-pointer' />
          </div>
        </div>
      </form>
    </div>
  )
}

export default ChangePasswordForm
