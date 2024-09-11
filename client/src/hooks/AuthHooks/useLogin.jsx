import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useToast from '../Helpers/useToast.jsx';
import { useContext } from 'react';
import { UserContext } from '../../../context/userContext.jsx';

const useLogin = () => {
    const { setUser, setRole } = useContext(UserContext);
    const { Toast } = useToast();
    const navigate = useNavigate();
    const Login = async (email, password) => {
        try {
            const {data} = await axios.post('/api/login', {
                email, password
            })
    
            if(data.error) {
                Toast.fire({
                    icon: "error",
                    title: data.error
                });
            }
    
            else {
                setUser(data.user);
                setRole(data.role);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return {Login}
}

export default useLogin
