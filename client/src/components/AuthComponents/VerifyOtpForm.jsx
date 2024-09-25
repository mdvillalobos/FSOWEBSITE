import React, { useState, useEffect } from 'react';
import useVerifyOtp from '../../hooks/AuthHooks/useVerifyOtp';
import useSendOTP from '../../hooks/AuthHooks/useSendOTP';

const verifyOtpForm = () => {
  const { resendOTP } = useSendOTP();
  const { VerifyUserOtp } = useVerifyOtp();
  const [ data, setData ] = useState({ otp: '' });
  const [ resendButton , setResendButton ] = useState(false);
  const [ timer, setTimer ] = useState(20);

  useEffect(() => {
    if(!resendButton) {
      const time = setInterval(() => {
        setTimer((prevTimer ) => prevTimer - 1);
      }, 1000)

      if(timer === 0) {
        setResendButton(true);
        setTimer(20);
      }
      return () => clearInterval(time);
    }
  }, [ resendButton, timer ]);

  const handleResendOtp = async () => {
    setResendButton(false);
    resendOTP();
  }


  const hanldeOtpVerification = async (e) => {
    e.preventDefault();
    await VerifyUserOtp(data.otp);
  }

  return (
    <div>
      <form onSubmit={hanldeOtpVerification} className='auth-container'>    
        <div className='auth-input-container'>
          <input 
            type="number"
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
      <p className='flex justify-center mt-4 text-sm max-[396px]:flex-col max-[396px]:text-center max-[396px]:text-[0.8rem] font-Poppins'>Didn't receive one time pin? 
        <button className='text-center text-blue-500 ml-2 hover:underline duration-300' onClick={handleResendOtp} disabled={!resendButton}>
          {!resendButton ?  `Resend in ${timer}` : "Resend"}
        </button>
      </p>
    </div>
  )
}

export default verifyOtpForm