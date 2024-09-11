import React from 'react'
import BackgroundHead from "../../components/AuthComponents/FormHeader.jsx";
import BackgroundFoot from "../../components/AuthComponents/FormFooter.jsx";
import ResetPasswordForm from '../../components/AuthComponents/ResetPasswordForm.jsx';

const ResetPassword = () => {
  return (
    <div className="bg-[#f4f7f9]">
         <BackgroundHead/>
            <div className="form">
              <div className="bg-white p-10 shadow-lg rounded-md">
                <h1 className="form-title">Reset Password</h1>
                <p className='mt-2 font-Poppins text-center max-[396px]:text-sm'>Enter your new password for your account.</p>
                <div>
                    <ResetPasswordForm/>
                </div>
              </div>
            </div>
        <BackgroundFoot/>
    </div>
  )
}

export default ResetPassword
