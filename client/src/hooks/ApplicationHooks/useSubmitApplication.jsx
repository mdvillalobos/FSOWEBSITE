import axios from "axios";
import useToast from "../Helpers/useToast";
import { useNavigate } from "react-router-dom";

const useSubmitApplication = () => {
    const { Toast, LoadingToast } = useToast();
    const navigate = useNavigate();

    const submitForm = async(formData, from) => {
        LoadingToast.fire({ 
            title: 'Submitting your application.'
        })
        try {
            const { data } = await axios.post('/api/submitApplicationEntry', formData);
            console.log('success')

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

            
                if(from === 'Repository') {
                    navigate('/repository')
                }
                else {
                    navigate('/application');
                }
            }
        }
        catch(error) {
            console.error(`Error response: ${error.message}`);
            LoadingToast.close();
        }
    } 
    return { submitForm }
}

export default useSubmitApplication
