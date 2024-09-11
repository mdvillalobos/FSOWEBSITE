import React from 'react'

import BackgroundHead from "../../components/AuthComponents/FormHeader.jsx";
import BackgroundFoot from "../../components/AuthComponents/FormFooter.jsx";
import EmailVerificationForm from '../../components/AuthComponents/EmailVerificationForm.jsx';

const Emailverification = () => {
  return (
    <div className="bg-[#f4f7f9]">
        <BackgroundHead/>
            <div className="form">
                <div className="bg-white p-10 shadow-lg rounded-md">
                  <h1 className="form-title">Email Verification</h1>
                  <p className="mt-3 font-Poppins max-[396px]:text-sm">Enter the 6-digit OTP that sent to your Email.</p>
                  <div>
                      <EmailVerificationForm/>
                  </div>
                </div>
            </div>
        <BackgroundFoot/>
    </div>
  )
}

export default Emailverification
