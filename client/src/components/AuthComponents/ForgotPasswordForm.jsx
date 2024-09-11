import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useFindEmail from '../../hooks/AuthHooks/useFindEmail';
import { MdEmail } from "react-icons/md";

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
                    <span className="flex justify-center text-sm">
                        <p className='mr-2 font-Poppins'>Return to</p> 
                        <Link to="/" className="no-underline text-blue-900 font-medium font-Poppins hover:underline">Login</Link>
                    </span>
                </div>
            </form>
        </div>
    )
}

export default ForgotPasswordForm
