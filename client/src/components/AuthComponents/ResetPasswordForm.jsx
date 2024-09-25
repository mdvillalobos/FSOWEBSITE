import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import useResetPassword from '../../hooks/AuthHooks/useResetPassword';

const ResetPasswordForm = () => {
  const { ResetPassword } = useResetPassword();
  const [ showPassword, setShowPassword ] = useState(false);
  const [ showConfirm, setShowConfirm ] = useState(false);
  const [ data, setData ] = useState({ password: '', confirmPassword: '' })

  const handleResetPassword = async (e) => {
    e.preventDefault();
    await ResetPassword(data.password, data.confirmPassword)
  }

  return (
    <div>
      <form onSubmit={handleResetPassword} className='auth-container'>
        <div className="auth-input-container">
          <input 
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            value={data.password}
            onChange={(e) => setData({...data, password: e.target.value})}
            className='auth-input-field'
          />
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => setShowPassword((show) => !show)}
            edge="end"
          >
            {showPassword ? <FaEyeSlash size="20px" opacity="80%"/> : <IoEyeSharp size="20px" opacity="80%"/>}
          </IconButton>
        </div>

        <div className="auth-input-container">
          <input 
            type={showConfirm ? 'text' : 'password'}
            placeholder='Confirm Password'
            value={data.confirmPassword}
            onChange={(e) => setData({...data, confirmPassword: e.target.value})}
            className='auth-input-field'
          />
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => setShowConfirm((show) => !show)}
            edge="end"
          >
            {showConfirm ? <FaEyeSlash size="20px" opacity="80%"/> : <IoEyeSharp size="20px" opacity="80%"/>}
          </IconButton>
        </div>

        <div className="flex flex-col">
          <input type="submit" value="Confirm" className='formBtn'/>
        </div>
      </form>
    </div>
  )
}

export default ResetPasswordForm