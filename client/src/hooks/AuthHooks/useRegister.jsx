import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useToast from '../Helpers/useToast.jsx';

const useRegister = () => {
    const navigate = useNavigate();
    const { Toast } = useToast();
    const Register = async (employeeID, email, password) => {
        try {
            const {data} = await axios.post('/api/register', {
                employeeID, email, password
            });
    
            if(data.error) {
                Toast.fire({
                    icon: "error",
                    title: data.error
                 });
            }
            else {
                navigate('/emailverification');
            }
        } catch (error) {
            console.log(error)
        }
    }
    return {Register}
}

export default useRegister
