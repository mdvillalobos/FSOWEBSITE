import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import useFindEmail from '../../hooks/AuthHooks/useFindEmail';

const ForgotPasswordForm = () => {
    const { findEmail } = useFindEmail();
    const [ data, setData ] = useState({ email: ''});

    const handleFindEmail = async (e) => {
        e.preventDefault();
        await findEmail(data.email);
    }

    return (
        <div>
            <form onSubmit={ handleFindEmail } className='auth-container'>
                <div className='auth-input-container'>
                    <HiOutlineMail  className='my-auto translate-y-[-0.5px] ml-1 mr-0.5' size='1.4rem' color='#707074'/>
                    <input 
                        type="text"
                        placeholder='Work Email' 
                        value={ data.email }
                        onChange={(e) => setData({...data, email: e.target.value })}
                        className='auth-input-field'
                    />
                </div>

                <div className="flex flex-col">
                    <input type="submit" value="Submit" className='formBtn'/>
                    <Link to="/" className="flex justify-center mt-4 text-sm max-[396px]:flex-col max-[396px]:text-center max-[396px]:text-[0.8rem] no-underline hover:underline font-Poppins"> 
                        <IoMdArrowRoundBack className='mr-1 relative top-[2.5px]'/> 
                        Back to login
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default ForgotPasswordForm
