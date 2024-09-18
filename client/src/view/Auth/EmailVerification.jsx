import React from 'react'

import BackgroundHead from "../../components/AuthComponents/FormHeader.jsx";
import BackgroundFoot from "../../components/AuthComponents/FormFooter.jsx";
import EmailVerificationForm from '../../components/AuthComponents/EmailVerificationForm.jsx';

const Emailverification = () => {
  return (
    <div className="bg-[#f4f7f9]">
        <BackgroundHead/>
            <div className="form">
                <div className="formContainer">
                  <h1 className="form-title">Email Verification</h1>
                  <p className="mt-1 mb-7 font-Poppins text-center text-sm text-gray-500">Enter the 6-digit OTP that sent to your Email.</p>
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
