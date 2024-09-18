import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useFindEmail from '../../hooks/AuthHooks/useFindEmail';
import { MdEmail } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";

const ForgotPasswordForm = () => {
    const [data, setData] = useState({
        email: ''
    });

    const {findEmail} = useFindEmail();

    const handleFindEmail = async (e) => {
        e.preventDefault();
        const {email} = data;
        await findEmail(email);
    }

    return (
        <div>
            <form onSubmit={handleFindEmail} className='auth-container'>
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

                <div className="flex flex-col">
                    <input type="submit" value="Submit" className='formBtn'/>
                    <Link to="/" className="flex justify-center no-underline text-sm text-gray-500 font-medium font-Poppins hover:underline">
                        <IoMdArrowRoundBack className='mr-1 relative top-[2.5px]'/> 
                        Back to login
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default ForgotPasswordForm
