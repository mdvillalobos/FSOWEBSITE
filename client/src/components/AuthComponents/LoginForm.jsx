import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp, IoLockOpen } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { TbLock } from "react-icons/tb";
import IconButton from '@mui/material/IconButton';
import useLogin from '../../hooks/AuthHooks/useLogin';

const loginForm = () => {
    const { Login } = useLogin();
    const [ showPassword, setShowPassword ] = useState(false);
    const [ data, setData ] = useState({ email: '', password: ''});

    const handleLogin = async (e) => {
        e.preventDefault();
        await Login(data.email, data.password);
    }

    return (
        <div>
            <form onSubmit={handleLogin} className='auth-container' >
                <div className='auth-input-container'>
                    <HiOutlineMail className='my-auto ml-1 mr-0.5' size='1.4rem' color='#707074'/>
                    <input 
                        type="text"
                        placeholder='Work Email' 
                        value={data.email}
                        onChange={(e) => setData({...data, email: e.target.value })}
                        className='auth-input-field'
                    />
                </div>
        
                <div className="auth-input-container">
                    <TbLock className='my-auto ml-1 mr-1' size='1.6rem' color='#707074'/>
                    <input 
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Password'
                        value={data.password}
                        onChange={(e) => setData({...data, password: e.target.value })}
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
        
                <div className="flex flex-col font-Poppins">
                    <Link to="/forgotpassword" className='flex self-end text-sm mb-4 text-[#41518d] font-medium hover:underline max-[396px]:text-[0.8rem] max-[396px]:mt-2'>Forgot Password?</Link>
                    <input type="submit" value="Login" className='formBtn'/>
                    <span className="flex justify-center mt-4 text-sm max-[396px]:flex-col max-[396px]:text-center max-[396px]:text-[0.8rem] space-x-1.5" >
                        <p className='r-2 max-[396px]:mr-0'>Dont Have Account?</p> 
                        <Link to="/register" className="no-underline text-[#41518d] font-medium hover:underline">Create an Account</Link>
                    </span>
                </div>
            </form>
        </div>
    )
}

export default loginForm
