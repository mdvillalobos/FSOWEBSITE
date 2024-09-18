import React from 'react'

import BackgroundHead from "../../components/AuthComponents/FormHeader.jsx";
import BackgroundFoot from "../../components/AuthComponents/FormFooter.jsx";
import RegistrationForm from "../../components/AuthComponents/RegistrationForm.jsx"

const Register = () => {
    return (
        <div className="bg-[#f4f7f9]">
            <BackgroundHead/>
            <div className="form">
                <div className="formContainer">
                <h1 className="font-Poppins text-center text-[3rem] mb-8 font-semibold  max-[396px]:text-[2.2rem] max-[396px]:mb-8">Register</h1>
                    <div>
                        <RegistrationForm/>
                    </div>
                </div>
            </div>
            <BackgroundFoot/>
        </div>
    )
}

export default Register
