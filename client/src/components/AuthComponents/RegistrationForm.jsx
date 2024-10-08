import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp, IoLockOpen } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaIdCardClip } from "react-icons/fa6";
import IconButton from '@mui/material/IconButton';
import useRegister from '../../hooks/AuthHooks/useRegister';

const registrationForm = () => {
    const { Register } = useRegister();
    const [ showPassword, setShowPassword ] = useState(false);
    const [ data, setData ] = useState({ 
        employeeID: '', 
        email: '', 
        password: '' 
    });

    const handleRegistration = async (e) => {
        e.preventDefault();
        await Register(data.employeeID, data.email, data.password);
    }

    return (
        <div>
            <form onSubmit={handleRegistration} className='auth-container'>
                <div className='auth-input-container'>
                    <FaIdCardClip className='my-auto mx-1' size='1.2rem' color='#707074'/>
                    <input 
                        type="text"
                        placeholder='Employee ID Number' 
                        value={data.employeeID}
                        onChange={(e) => setData({...data, employeeID: e.target.value})}
                        className='auth-input-field'
                    />
                </div>

                <div className='auth-input-container'>
                    <MdEmail className='my-auto mx-1' size='1.2rem' color='#707074'/>
                    <input 
                        type="text"
                        placeholder='Work Email' 
                        value={data.email}
                        onChange={(e) => setData({...data, email: e.target.value})}
                        className='auth-input-field'
                    />
                </div>

                <div className="auth-input-container">
                    <IoLockOpen className='my-auto mx-1' size='1.2rem' color='#707074'/>
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
                            {showPassword ? <FaEyeSlash size="20px" opacity="80%"/> : <IoEyeSharp size="20px" opacity="80%"/>}
                    </IconButton>
                </div>

                <div className="flex flex-col">
                    <input type="submit" value="Register" className='formBtn'/>
                    <span className="flex justify-center mt-4 text-sm max-[396px]:flex-col max-[396px]:text-center max-[396px]:text-[0.8rem] space-x-1.5">
                        <p className='mr-2 font-Poppins'>Already Have An Account?</p>
                        <Link to="/" className="no-underline text-[#41518d] font-medium font-Poppins hover:underline">Login</Link>
                    </span>
                </div>
            </form>
        </div>
    )
}

export default registrationForm
