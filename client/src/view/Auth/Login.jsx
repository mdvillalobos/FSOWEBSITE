import React from "react";

import BackgroundHead from "../../components/AuthComponents/FormHeader.jsx";
import BackgroundFoot from "../../components/AuthComponents/FormFooter.jsx";
import LoginForm from "../../components/AuthComponents/LoginForm.jsx";
import logo from '../../assets/images/NU_shield.png';

const Login = () => {
  return (
    <div className="bg-[#f4f7f9]">
      <BackgroundHead/>
          <div className="form">
            <div className="formContainer">
              <h1 className="font-Poppins text-center text-[3rem] mb-8 font-semibold  max-[396px]:text-[2.2rem] max-[396px]:mb-8">Login</h1>
              <div>
                  <LoginForm/>
              </div>
            </div>
          </div>
      <BackgroundFoot/>
    </div>
  );
};

export default Login;

