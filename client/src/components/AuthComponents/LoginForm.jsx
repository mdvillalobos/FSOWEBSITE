import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp, IoLockOpen } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import IconButton from '@mui/material/IconButton';

import useLogin from '../../hooks/AuthHooks/useLogin';

const loginForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const {Login} = useLogin();

    const handleLogin = async (e) => {
        e.preventDefault();
        const {email, password} = data
        await Login(email, password);
    }

    return (
        <div>
            <form onSubmit={handleLogin} className='auth-container' >
                <div className='auth-input-container'>
                    <MdEmail className='mt-4 mr-1 ml-1' size='1.2rem' color='#707074'/>
                    <input 
                        type="text"
                        placeholder='Work Email' 
                        value={data.email}
                        onChange={(e) => setData({...data, email: e.target.value})}
                        className='auth-input-field'
                    />
                </div>
        
                <div className="auth-input-container">
                    <IoLockOpen className='mt-4 mr-1 ml-1' size='1.2rem' color='#707074'/>
                    <input 
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Password'
                        value={data.password}
                        onChange={(e) => setData({...data, password: e.target.value})}
                        className='auth-input-field'
                    />
                    <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword((show) => !show)}
                            edge="end"
                        >
                            {showPassword ? <FaEyeSlash size="20px"/> : <IoEyeSharp size="20px"/>}
                    </IconButton>
                </div>
        
                <div className="flex flex-col">
                    <span className="flex self-end mt-3 text-sm text-blue-900 font-medium font-Poppins hover:underline max-[396px]:text-[0.8rem]"><Link to="/forgotpassword">Forgot Password?</Link></span>
                    <input type="submit" value="Login" className='formBtn'/>
                    <span className="flex justify-center text-sm max-[396px]:flex-col max-[396px]:text-center max-[396px]:text-[0.8rem]">
                        <p className='font-Poppins mr-2 max-[396px]:mr-0'>Dont Have Account?</p> 
                        <Link to="/register" className="no-underline text-blue-900 font-medium font-Poppins hover:underline">Create an Account</Link>
                    </span>
                </div>
            </form>
        </div>
    )
}

export default loginForm
