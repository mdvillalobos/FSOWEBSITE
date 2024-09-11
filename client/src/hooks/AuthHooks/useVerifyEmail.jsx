import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useToast from '../Helpers/useToast.jsx';

const useVerifyEmail = () => {
    const { Toast } = useToast();
    const navigate = useNavigate()
    const verifyEmail = async (otp) => {
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
                navigate('/profileregistration')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return {verifyEmail}
}

export default useVerifyEmail
