import React from 'react'

import BackgroundHead from "../../components/AuthComponents/FormHeader.jsx";
import BackgroundFoot from "../../components/AuthComponents/FormFooter.jsx";
import RegistrationForm from "../../components/AuthComponents/RegistrationForm.jsx"

const Register = () => {
    return (
        <div className="bg-[#f4f7f9]">
            <BackgroundHead/>
            <div className="form">
                <div className="bg-white p-10 shadow-lg rounded-md">
                    <h1 className="font-Poppins text-center text-[3rem] mb-10 font-semibold after:content-[''] after:flex after:bg-NuBlue after:w-28 after:h-1 after:mx-auto after:mt-2">Register</h1>
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
