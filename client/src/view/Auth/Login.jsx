import React from "react";

import BackgroundHead from "../../components/AuthComponents/FormHeader.jsx";
import BackgroundFoot from "../../components/AuthComponents/FormFooter.jsx";
import LoginForm from "../../components/AuthComponents/LoginForm.jsx";

const Login = () => {
  return (
    <div className="bg-[#f4f7f9]">
      <BackgroundHead/>
          <div className="form">
              <div className="bg-white p-10 shadow-lg rounded-2xl max-[396px]:p-5 max-sm:p-6">
                <h1 className="font-Poppins text-center text-[2.9rem] mb-10 font-semibold after:content-[''] after:flex after:bg-NuBlue after:w-28 after:h-1 after:mx-auto after:mt-2 max-[396px]:text-[2.2rem] max-[396px]:after:w-20 max-[396px]:mb-8">Login</h1>
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

