import React from 'react'

import BackgroundHead from "../../components/AuthComponents/FormHeader.jsx";
import BackgroundFoot from "../../components/AuthComponents/FormFooter.jsx";
import VerifyOtpForm from '../../components/AuthComponents/VerifyOtpForm.jsx'

const VerifyOTP = () => {
  return (
    <div className="bg-[#f4f7f9]"> 
      <BackgroundHead/>
          <div className="form">
              <div className="bg-white p-10 shadow-lg rounded-md">
                <h1 className="form-title">Recovery</h1>
                <p className="mt-3 font-Poppins max-[396px]:text-sm">Enter the 6-digit OTP that sent to your Email.</p>
                <div>
                    <VerifyOtpForm/>
                </div>
              </div>
          </div>
      <BackgroundFoot/>
    </div>
  )
}

export default VerifyOTP
