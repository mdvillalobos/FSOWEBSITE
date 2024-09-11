import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useToast from '../Helpers/useToast.jsx';

const useVerifyOtp = () => {
    const { Toast } = useToast();
    const navigate = useNavigate();
    const VerifyUserOtp = async (otp) => {
        try {
            const {data} = await axios.post('/api/verifyEmail' , {
                otp,
            });
        
            if(data.error) {
                Toast.fire({
                    icon: "error",
                    title: data.error
                });
            }
            else {
                navigate('/resetpassword')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return {VerifyUserOtp}
}

export default useVerifyOtp
