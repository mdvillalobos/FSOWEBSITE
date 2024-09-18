import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useToast from '../Helpers/useToast.jsx';

const useFindEmail = () => {
    const navigate = useNavigate();
    const { Toast } = useToast();
    const findEmail = async (email) => {
        try {
            const {data} = await axios.post('/api/forgot', {
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
                    title: 'One Time Pin Sent.'
                });
            }
        }
        catch(error) {
            console.log(error)
        }
    }
    return {findEmail}
}

export default useFindEmail
