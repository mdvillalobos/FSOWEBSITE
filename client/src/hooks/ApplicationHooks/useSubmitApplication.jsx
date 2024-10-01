import axios from "axios";
import useToast from "../Helpers/useToast";
import { useNavigate } from "react-router-dom";

const useSubmitApplication = () => {
    const { Toast, LoadingToast } = useToast();
    const navigate = useNavigate();

    const submitForm = async(formData) => {
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
                navigate('/application');
            }
        }
        catch(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                console.error('Error response:', error.response.data);
              } else if (error.request) {
                // The request was made but no response was received
                console.error('Error request:', error.request);
              } else {
                // Something happened in setting up the request
                console.error('Error message:', error.message);
              }
            LoadingToast.close();
        }
    } 
    return { submitForm }
}

export default useSubmitApplication
