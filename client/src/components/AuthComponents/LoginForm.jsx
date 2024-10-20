import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMail } from "react-icons/hi";
import { TbLock } from "react-icons/tb";
import IconButton from '@mui/material/IconButton';
import useLogin from '../../hooks/AuthHooks/useLogin';
import useToast from '../../hooks/Helpers/useToast';
import { LuEye, LuEyeOff  } from "react-icons/lu";


const loginForm = () => {
    const { Login } = useLogin();
    const { Toast } = useToast();
    const [ showPassword, setShowPassword ] = useState(false);
    const [ isEmailValid, setIsEmailValid ] = useState(false);
    const [ data, setData ] = useState({ 
        email: '', 
        password: ''
    });

    const [ shake, setShake ] = useState({
        email: false,
        password: false,
    });

    const checkEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return regex.test(email)
    }

    useEffect(() => {
        setIsEmailValid(checkEmail(data.email))
    })

    const handleLogin = async (e) => {
        e.preventDefault();
        if(!data.email || !data.password ) {
            setShake({email: true, password: true }),
            setTimeout(() => {
                setShake({ email: false, password: false });
            }, 500);

            return Toast.fire({
                icon: "error",
                title: 'Required all fields.'
            });
        }

        if(!isEmailValid) {
            setShake({email: !isEmailValid}),
            setTimeout(() => {
                setShake({ email: false });
            }, 500);
            return;
        }

        await Login(data.email, data.password);
    }

    return (
        <div>
            <form onSubmit={handleLogin} className='auth-container' >
                <div className={`auth-input-container ${data.email ? (isEmailValid) ? 'focus-within:border-[#93adc2]' : 'border-red-400' : 'focus-within:border-[#93adc2]'} ${shake.email ? 'shake' : ''}`}>
                    <HiOutlineMail className='my-auto ml-1 mr-0.5' size='1.4rem' color='#707074'/>
                    <input 
                        type="text"
                        placeholder='Work Email' 
                        value={data.email}
                        onChange={(e) => setData({...data, email: e.target.value })}
                        className='auth-input-field'
                    />
                </div>
                {data.email ? (isEmailValid) ? null : ( 
                    <p className='text-[0.7rem] text-red-400 font-medium mx-1 absolute'>Invalid email format.</p>
                ) : null}
        
                <div className={`auth-input-container ${shake.password ? 'shake' : ''}`}>
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
                            {showPassword ? <LuEyeOff size="20px"/> : <LuEye size="20px"/>}
                    </IconButton>
                </div>
        
                <div className="flex flex-col">
                    <Link to="/forgotpassword" className='flex self-end text-sm mt-2 mb-4 text-[#41518d] font-medium hover:underline max-[396px]:text-[0.8rem] max-[396px]:mt-2'>Forgot Password?</Link>
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
