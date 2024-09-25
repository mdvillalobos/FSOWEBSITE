import { useNavigate } from "react-router-dom";
import axios from "axios";
import useToast from '../Helpers/useToast.jsx';
import { useContext } from 'react';
import { UserContext } from '../../../context/userContext.jsx';

const useRegisterProfile = () => {
    const { setUser, setRole } = useContext(UserContext);
    const { Toast, LoadingToast } = useToast();
    const navigate = useNavigate();
    const registerProfile = async (lastName, firstName, middleName, department, position, track, rank) => {
        if(!lastName || !firstName || !department || !position || !track || !rank) {
            return Toast.fire({
                icon: "error",
                title: 'Required all fields.'
            });
        }

        LoadingToast.fire({
            title: 'Registering your data. Please wait!'
        })
        try {
            const { data } = await axios.post('/api/registeProfile', {
                lastName, firstName, middleName, department, position, track, rank
            });
        
            if(data.error) {
                Toast.fire({
                    icon: "error",
                    title: data.error
                });
            }
            else {
                setUser(data.user);
                setRole(data.role);
                LoadingToast.close();
                navigate('/home');
            }
        } catch (error) {
            console.error(`Profile registration error ${ error.message }`);
        }
    }

    return {registerProfile}
}

export default useRegisterProfile
