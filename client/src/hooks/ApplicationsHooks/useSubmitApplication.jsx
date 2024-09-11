import axios from "axios";
import useToast from "../Helpers/useToast";
import { useNavigate } from "react-router-dom";

const useSubmitApplication = () => {
    const { Toast } = useToast();
    const navigate = useNavigate();
    const submitForm = async(formData) => {
        const {data} = await axios.post('/api/submitApplicationEntry', formData);
            
        if(data.error) {
            Toast.fire({
                icon: "error",
                title: data.error
            });
        }
        else {
            Toast.fire({
                icon: 'success',
                title: 'Thank you'
            });
            navigate('/application');
        }
    } 
    return { submitForm }
}

export default useSubmitApplication
