import React from 'react'

import BackgroundHead from "../../components/AuthComponents/FormHeader.jsx";
import BackgroundFoot from "../../components/AuthComponents/FormFooter.jsx";
import ForgotPassForm from '../../components/AuthComponents/ForgotPasswordForm.jsx'


const ForgotPassword = () => {
  return (
    <div className="bg-[#f4f7f9]">
      <BackgroundHead/>
      <div className="form">
          <div className="formContainer">
            <h1 className="form-title">Forgot Password</h1>
            <p className='mt-1 mb-7 font-Poppins text-center text-base text-gray-500'>Provide your account email address.</p>
            <div>
                <ForgotPassForm/>
            </div>
          </div>
      </div>
      <BackgroundFoot/>
    </div>
  )
}

export default ForgotPassword
