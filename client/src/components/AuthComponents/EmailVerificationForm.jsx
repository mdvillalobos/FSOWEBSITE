import React, { useState } from 'react';
import useVerifyEmail from '../../hooks/AuthHooks/useVerifyEmail'

const EmailVerification = () => {
  const [data, setData] = useState({
    otp: ''
  });
  const {verifyEmail} = useVerifyEmail()

  const handleVerification = async (e) => {
    e.preventDefault();
    const {otp} = data;
    await verifyEmail(otp);
  }

  return (
    <div>
      <form onSubmit={handleVerification} className='auth-container'>
        <div className='auth-input-container'>
          <input 
            type="text"
            placeholder='Enter One Time Pin' 
            value={data.otp}
            onChange={(e) => setData({...data, otp: e.target.value})}
            className='auth-input-field'
          />
        </div>
        
        <div className="flex flex-col">
            <input type="submit" value="Submit" className='formBtn'/>
        </div>
      </form>
    </div>
  )
}

export default EmailVerification
