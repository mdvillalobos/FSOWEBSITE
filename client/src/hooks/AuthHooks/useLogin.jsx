import axios from 'axios';
import useToast from '../Helpers/useToast.jsx';
import { useContext } from 'react';
import { UserContext } from '../../../context/userContext.jsx';

const useLogin = () => {
    const { setUser, setRole } = useContext(UserContext);
    const { Toast, LoadingToast } = useToast();

    const Login = async (email, password) => {
        if(!email || !password) {
            return Toast.fire({
                icon: "error",
                title: 'Required all fields'
            });
        }
        
        LoadingToast.fire({
            title: 'Logging you in...',
        });
        try {
            const { data } = await axios.post('/api/login', {
                email, password
            });
         
            if(data.error) {
                return Toast.fire({
                    icon: "error",
                    title: data.error,
                });
            }
    
            else {
                LoadingToast.close();
                setUser(data.user);
                setRole(data.role);
            }

        } catch (error) {
            console.error(`Login Error: ${ error.message }`);

        }
    }

    return { Login }
}

export default useLogin
