import { useNavigate } from "react-router-dom";
import axios from "axios";
import useToast from '../Helpers/useToast.jsx';
import { useContext } from 'react';
import { UserContext } from '../../../context/userContext.jsx';

const useRegisterProfile = () => {
    const { setUser, setRole } = useContext(UserContext);
    const { Toast } = useToast();
    const navigate = useNavigate();
    const registerProfile = async (lastName, firstName, middleName, department, position, track, rank) => {
        try {
            const {data} = await axios.post('/api/registeProfile', {
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
                navigate('/home');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return {registerProfile}
}

export default useRegisterProfile
