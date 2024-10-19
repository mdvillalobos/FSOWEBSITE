import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp, IoLockOpen } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaIdCardClip } from "react-icons/fa6";
import IconButton from '@mui/material/IconButton';
import useRegister from '../../hooks/AuthHooks/useRegister';
import { PiWarningCircleFill } from "react-icons/pi";
import { LiaIdCard } from "react-icons/lia";
import { HiOutlineMail } from "react-icons/hi";
import { TbLock } from "react-icons/tb";


const registrationForm = () => {
    const { Register } = useRegister();
    const [ showPassword, setShowPassword ] = useState(false);
    const [ isValid, setIsValid ] = useState(false);
    const [ isHovered, setIsHovered ] = useState(false);
    const [ data, setData ] = useState({ 
        employeeID: '', 
        email: '', 
        password: '' 
    });

    const checkPassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@\-_&$]).{8,}$/;
        return regex.test(password);
    }

    const handlePasswordChange  = (e) => {
        setData({ ...data, password : e.target.value})
        setIsValid(checkPassword(data.password))
    }

    const handleRegistration = async (e) => {
        e.preventDefault();
        await Register(data.employeeID, data.email, data.password);
    }
    console.log(isHovered)
    return (
        <div className='font-Poppins'>
            <form onSubmit={handleRegistration} className='auth-container'>
                <div className='auth-input-container'>
                    <LiaIdCard className='my-auto ml-0.5 mr-0.5' size='1.5rem' color='#707074'/>
                    <input 
                        type="text"
                        placeholder='Employee ID Number' 
                        value={data.employeeID}
                        onChange={(e) => setData({...data, employeeID: e.target.value})}
                        className='auth-input-field'
                    />
                </div>

                <div className='auth-input-container'>
                    <HiOutlineMail className='my-auto ml-1 mr-0.5' size='1.4rem' color='#707074'/>
                    <input 
                        type="text"
                        placeholder='Work Email' 
                        value={data.email}
                        onChange={(e) => setData({...data, email: e.target.value})}
                        className='auth-input-field'
                    />
                </div>

                <div className={`relative flex border-2 rounded-lg px-3 duration-200 mb-4 bg-[#fbfcfe] border-[#dde0e5] ${data.password ? (isValid) ? 'focus-within:border-[#93adc2]' : 'border-red-400' : null}`}>
                    <TbLock className='my-auto ml-1 mr-1' size='1.6rem' color='#707074'/>
                    <input 
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Password'
                        value={data.password}
                        onChange={handlePasswordChange}
                        className='auth-input-field'
                    />
                    <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword((show) => !show)}
                            edge="end"
                        >
                            {showPassword ? <FaEyeSlash size="20px" opacity="80%"/> : <IoEyeSharp size="20px" opacity="80%"/>}
                    </IconButton>
                    {data.password ? (isValid) ? null : ( 
                        <div className="absolute right-[-25px] top-4" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                            <PiWarningCircleFill size={'1.2rem'} className='text-red-400'/>
                            <div className={`${isHovered ? 'visible arrow' : 'hidden'}`}></div>
                            <p className={`${isHovered ? 'visible absolute right-[-65px] top-[33px] bg-red-400 p-2 text-xs rounded-md w-60 text-white' : 'hidden'}`}>Please enter at least 8 characters with a number, symbol, uppercase and lowercase letter.</p>
                        </div> 
                    ) : null}


                </div>

                <div className="flex flex-col mt-6">
                    <input type="submit" value="Register" className='formBtn'/>
                    <span className="flex justify-center mt-4 text-sm max-[396px]:flex-col max-[396px]:text-center max-[396px]:text-[0.8rem] space-x-1.5">
                        <p className='mr-0.5 font-Poppins'>Already Have An Account?</p>
                        <Link to="/" className="no-underline text-[#41518d] font-medium font-Poppins hover:underline">Login</Link>
                    </span>
                </div>
            </form>
        </div>
    )
}

export default registrationForm
