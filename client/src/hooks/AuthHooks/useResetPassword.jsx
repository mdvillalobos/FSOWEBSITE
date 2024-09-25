import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import useToast from '../Helpers/useToast.jsx';

const useResetPassword = () => {
    const { Toast, LoadingToast } = useToast();
    const navigate = useNavigate();

    const ResetPassword = async (password, confirmPassword) => {
        if(!password || !confirmPassword) {
            return Toast.fire({
                icon: "error",
                title: 'Required all fields'
            });
        }

        if(password != confirmPassword) {
            return Toast.fire({
                icon: "error",
                title: 'Password do not match!'
            });
        }

        LoadingToast.fire({
            title: 'Resetting your password. Please wait!'
        })
    
        try {
            const { data } = await axios.post('/api/resetpassword', {
                password,
                confirmPassword
            });

            if(data.error) {
                return Toast.fire({
                    icon: "error",
                    title: data.error
                });
            }
            else {
                LoadingToast.close();
                navigate('/');
            }

        } catch (error) {
           console.error(`Reset Password Error: ${ error.message }`) 
        }
    }
    return {ResetPassword}
}

export default useResetPassword
