import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import useRegister from '../../hooks/AuthHooks/useRegister';
import { LuEye, LuEyeOff  } from "react-icons/lu";
import { PiWarningCircleFill } from "react-icons/pi";
import { LiaIdCard } from "react-icons/lia";
import { HiOutlineMail } from "react-icons/hi";
import { TbLock } from "react-icons/tb";
import useToast from '../../hooks/Helpers/useToast';
import TermsAndCondition from '../Tools/TermsAndCondition';

const registrationForm = () => {
    const { Register } = useRegister();
    const { Toast } = useToast();
    const [ showPassword, setShowPassword ] = useState(false);
    const [ isPasswordValid, setIsPasswordValid ] = useState(false);
    const [ isEmailValid, setIsEmailValid ] = useState(false);
    const [ isIdValid, setIsIdValid] = useState(false);
    const [ isHovered, setIsHovered ] = useState(false);
    const [ isOpen, setIsOpen ] = useState(false);
    const [ isChecked, setIsChecked ] = useState(null)

    const [ shake, setShake ] = useState({
        id: false,
        email: false,
        password: false,
        isChecked: false
    });

    const [ data, setData ] = useState({ 
        employeeID: '', 
        email: '', 
        password: '' ,
    });

    const checkId = (id) => {
        const regex = /^(?=.{5,})(\d+(-\d+)?)$/;
        return regex.test(id)
    }

    const checkEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return regex.test(email)
    }

    const checkPassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@\-_&$]).{8,}$/;
        return regex.test(password);
    }

    useEffect(() => {
        setIsEmailValid(checkEmail(data.email));
        setIsPasswordValid(checkPassword(data.password));
        setIsIdValid(checkId(data.employeeID));
    })


    const handleRegistration = async (e) => {
        e.preventDefault();
        if(!data.employeeID || !data.email || !data.password || !isChecked) {
            setShake({ id: !isIdValid, email: !isEmailValid, password: !isPasswordValid, isChecked: true }),
            setTimeout(() => {
                setShake({ id: false, email: false, password: false, isChecked: false});
            }, 500);

            return Toast.fire({
                icon: "error",
                title: 'Required all fields.'
            });
        }

        if(!isIdValid || !isEmailValid || !isPasswordValid) {
            setShake({ id: !isIdValid, email: !isEmailValid, password: !isPasswordValid }),
            setTimeout(() => {
                setShake({ id: false, email: false, password: false });
            }, 500);
            return;
        }
        
        await Register(data.employeeID, data.email, data.password);
    }

    return (
        <div className='font-Poppins'>
            <form onSubmit={handleRegistration} className='auth-container'>
                <div className={`auth-input-container ${data.employeeID ? (isIdValid) ? 'focus-within:border-[#93adc2]' : 'border-red-400' : 'focus-within:border-[#93adc2]'} ${shake.id ? 'shake' : ''}`}>
                    <LiaIdCard className='my-auto ml-0.5 mr-0.5' size='1.5rem' color='#707074'/>
                    <input 
                        type="text"
                        placeholder='Employee ID Number' 
                        value={data.employeeID}
                        maxLength='15'
                        onChange={(e) => setData({...data, employeeID: e.target.value})}
                        className='auth-input-field'
                    />
                </div>
                {data.employeeID ? (isIdValid) ? null : ( 
                    <p className='text-[0.7rem] text-red-400 font-medium mx-1 absolute'>Invalid employee id format.</p>
                ) : null}

                <div className={`auth-input-container ${data.email ? (isEmailValid) ? 'focus-within:border-[#93adc2]' : 'border-red-400' : 'focus-within:border-[#93adc2]'} ${shake.email ? 'shake' : ''}`}>
                    <HiOutlineMail className='my-auto ml-1 mr-0.5' size='1.4rem' color='#707074'/>
                    <input 
                        type="text"
                        placeholder='Work Email' 
                        value={data.email}
                        onChange={(e) => setData({...data, email: e.target.value})}
                        className='auth-input-field'
                    />
                </div>
                {data.email ? (isEmailValid) ? null : ( 
                    <p className='text-[0.7rem] text-red-400 font-medium mx-1 absolute'>Invalid email format.</p>
                ) : null}

                <div className={`auth-input-container relative ${data.password ? (isPasswordValid) ? 'focus-within:border-[#93adc2]' : 'border-red-400' : 'focus-within:border-[#93adc2]'} ${shake.password ? 'shake' : ''}`}>
                    <TbLock className='my-auto ml-1 mr-1' size='1.6rem' color='#707074'/>
                    <input 
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Password'
                        value={data.password}
                        onChange={(e) => setData({ ...data, password: e.target.value})}
                        className='auth-input-field'
                    />
                    <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword((show) => !show)}
                            edge="end"
                        >
                           {showPassword ? <LuEyeOff size="20px"/> : <LuEye size="20px"/>}
                    </IconButton>
                    {data.password ? (isPasswordValid) ? null : ( 
                        <div className="absolute right-[-25px] top-4 " onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                            <PiWarningCircleFill size={'1.2rem'} className='text-red-400 cursor-pointer'/>
                            <div className={`${isHovered ? 'visible arrow' : 'hidden'}`}></div>
                            <p className={`${isHovered ? 'visible absolute right-[-65px] top-[33px] bg-red-400 p-2 text-xs rounded-md w-60 text-white' : 'hidden'}`}>Please enter at least 8 characters with a number, symbol, uppercase and lowercase letter.</p>
                        </div> 
                    ) : null}
                </div>
                {data.password ? (isPasswordValid) ? null : ( 
                    <p className='text-[0.7rem] text-red-400 font-medium mx-1 absolute'>Invalid password format.</p>
                ) : null}

                <div className={`flex w-full text-[0.8rem] mt-4 mx-1 space-x-2 ${shake.isChecked ? 'shake' : ''}`}>
                    <input type="checkbox" value='Approved' checked={ isChecked === 'Approved' } onChange={(e) => setIsChecked(e.target.checked ? e.target.value : '')}/>
                    <span className='my-auto'>I have read and agree to the <button type='button' onClick={() => setIsOpen(!isOpen)}className='text-NuButton hover:underline duration-200'> Terms and Conditions</button></span>
                </div>

                {isOpen ? <TermsAndCondition toggle={() => setIsOpen(!isOpen)} /> : null}

                <div className="flex flex-col mt-4">
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