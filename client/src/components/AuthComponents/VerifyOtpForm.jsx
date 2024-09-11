import React, { useState } from 'react';
import useVerifyOtp from '../../hooks/AuthHooks/useVerifyOtp';

const verifyOtpForm = () => {
  const [data, setData] = useState({
    otp: ''
  });

  const {VerifyUserOtp} = useVerifyOtp();

  const hanldeOtpVerification = async (e) => {
    e.preventDefault();
    const {otp} = data;
    console.log(otp)
    await VerifyUserOtp(otp);

  }

  return (
    <div>
      <form onSubmit={hanldeOtpVerification} className='auth-container'>    
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

export default verifyOtpForm