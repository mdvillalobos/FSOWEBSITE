import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useToast from '../Helpers/useToast.jsx';

const useRegister = () => {
    const navigate = useNavigate();
    const { Toast, LoadingToast } = useToast();
    
    const Register = async (employeeID, email, password) => {
        if(!employeeID || !email || !password) {
            return Toast.fire({
                icon: "error",
                title: 'Required all fields.'
            });
        }

        LoadingToast.fire({
            title: 'Registering your data. Please wait.'
        });
        try {
            const { data } = await axios.post('/api/register', {
                employeeID, email, password
            });
    
            if(data.error) {
                return Toast.fire({
                    icon: "error",
                    title: data.error
                 });
            }
            else {
                LoadingToast.close();
                navigate('/emailverification');
            }
        } catch (error) {
            console.error(`Registration Error: ${ error.message }`);
        }
    }
    return { Register }
}

export default useRegister
