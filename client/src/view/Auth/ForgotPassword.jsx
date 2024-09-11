import React from 'react'

import BackgroundHead from "../../components/AuthComponents/FormHeader.jsx";
import BackgroundFoot from "../../components/AuthComponents/FormFooter.jsx";
import ForgotPassForm from '../../components/AuthComponents/ForgotPasswordForm.jsx'


const ForgotPassword = () => {
  return (
    <div className="bg-[#f4f7f9]">
      <BackgroundHead/>
      <div className="form">
          <div className="bg-white p-10 shadow-lg rounded-md">
            <h1 className="form-title">Forgot Password</h1>
            <p className='mt-2 font-Poppins text-center text-sm'>Provide the email address associated with <br/> your account to recover your password.</p>
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
