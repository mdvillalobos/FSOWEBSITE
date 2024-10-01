import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useToast from '../Helpers/useToast.jsx';

const useVerifyEmail = () => {
    const { Toast, LoadingToast } = useToast();
    const navigate = useNavigate();

    const verifyEmail = async (otp) => {
        if(!otp) {
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
                navigate('/profileregistration');
            }
        } catch (error) {
            console.error(`EMail Verification Error: ${ error.message }`);
        }
    }
    return { verifyEmail }
}

export default useVerifyEmail
