import { useNavigate } from "react-router-dom";
import axios from "axios";
import useToast from '../Helpers/useToast.jsx';

const useRegisterProfile = () => {
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
                navigate('/home');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return {registerProfile}
}

export default useRegisterProfile
