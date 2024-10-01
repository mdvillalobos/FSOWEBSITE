import React from "react";
import BackgroundHead from "../../components/AuthComponents/FormHeader.jsx";
import BackgroundFoot from "../../components/AuthComponents/FormFooter.jsx";
import LoginForm from "../../components/AuthComponents/LoginForm.jsx";

const Login = () => {
    return (
        <div className="bg-[#f4f7f9]">
            <BackgroundHead/>
                <div className="form">
                    <div className="formContainer">
                        <p className="font-Poppins text-center text-5xl mb-8 font-semibold max-[396px]:text-[2.5rem] max-[396px]:font-semibold">Login</p>
                        <div>
                            <LoginForm/>
                        </div>
                    </div>
                </div>

            <BackgroundFoot/>
        </div>
    )
}

export default Login;

