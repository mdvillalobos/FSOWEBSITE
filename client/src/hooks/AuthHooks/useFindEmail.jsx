import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useToast from '../Helpers/useToast.jsx';

const useFindEmail = () => {
    const navigate = useNavigate();
    const { Toast, LoadingToast } = useToast();
    
    const findEmail = async (email) => {
        if(!email) {
            return Toast.fire({
                icon: "error",
                title: 'Required all fields'
            });
        }

        LoadingToast.fire({ 
            title: 'Verifying your email. Please wait!'
        })

        try {
            const { data } = await axios.post('/api/forgot', {
                email,
            })
    
            if(data.error) {
                Toast.fire({
                    icon: "error",
                    title: data.error
                });
            }
            else {
                navigate('/verifyotp');
                Toast.fire({
                    icon: "success",
                    title: 'Check your email.'
                });
            }
        }
        catch(error) {
            console.error(`Finding Email Error: ${ error.message }`);
        }
    }
    return {findEmail}
}

export default useFindEmail
