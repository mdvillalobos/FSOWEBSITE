import axios from 'axios';
import useToast from '../Helpers/useToast.jsx';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../../context/userContext.jsx';
import { RankContext } from '../../../context/rankContext.jsx';
import { AnalyticsContext } from '../../../context/analyticsContext.jsx';

const useLogin = () => {
    const { fetchRanksOnLogin } = useContext(RankContext);
    const { getDataOnLogin } = useContext(AnalyticsContext);
    const { getProfileOnLogin } = useContext(UserContext);
    const { Toast, LoadingToast } = useToast();
    const navigate = useNavigate()

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

            else if(data.data.length < 1) {
                navigate('/profileregistration')
                LoadingToast.close();
            }
    
            else {
                console.log(data.data)
                await Promise.all([
                    getProfileOnLogin(),
                    fetchRanksOnLogin(),
                    getDataOnLogin()
                ]);
                LoadingToast.close();
            }

        } catch (error) {
            console.error(`Login Error: ${ error.message }`);

        }
    }

    return { Login }
}

export default useLogin
