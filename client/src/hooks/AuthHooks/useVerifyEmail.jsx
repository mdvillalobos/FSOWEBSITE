import { useContext } from 'react';
import { RankContext } from '../../../context/rankContext.jsx';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useToast from '../Helpers/useToast.jsx';

const useVerifyEmail = () => {
    const { Toast, LoadingToast } = useToast();
    const navigate = useNavigate();
    const { fetchRanksOnLogin } = useContext(RankContext);

    const verifyEmail = async (otp) => {
        if(!otp || otp.length < 6) {
            return Toast.fire({
                icon: "error",
                title: 'Required all fields'
            });
        }

        LoadingToast.fire({
            title: 'Verifying OTP...'
        });
        try {
            const { data } = await axios.post('/api/verifyEmail' , {
                otp,
            });
      
            if(data.error) {
                return Toast.fire({
                    icon: "error",
                    title: data.error
                });
            }
            else {
                LoadingToast.close();
                await fetchRanksOnLogin();
                navigate('/profileregistration');
            }
        } catch (error) {
            console.error(`Email Verification Error: ${ error.message }`);
        }
    }
    return { verifyEmail }
}

export default useVerifyEmail
