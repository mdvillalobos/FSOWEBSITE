import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import useToast from '../Helpers/useToast.jsx';

const useResetPassword = () => {
    const { Toast } = useToast();
    const navigate = useNavigate();
    const ResetPassword = async (password, confirmPassword) => {
        try {
            const {data} = await axios.post('/api/resetpassword', {
                password,
                confirmPassword
            });

            if(data.error) {
                Toast.fire({
                    icon: "error",
                    title: data.error
                });
            }
            else {
                navigate('/');
            }

        } catch (error) {
           console.log(error) 
        }
    }
    return {ResetPassword}
}

export default useResetPassword
