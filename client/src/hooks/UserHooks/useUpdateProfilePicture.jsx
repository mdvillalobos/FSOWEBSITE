import axios from "axios"
import useToast from '../Helpers/useToast.jsx';
import { useNavigate } from "react-router-dom";

const useUpdateProfilePicture = () => {
    const { Toast, LoadingToast } = useToast();
    const navigate = useNavigate();
    const updateProfile = async (profilePicture, props) => {
        LoadingToast.fire({
            title: 'Updating your profile picture...',
        })

        try {
            const formData = new FormData();
            formData.append('profilePicture', profilePicture)

            const { data } = await axios.post('/api/updateProfilePicture', formData);

            if(data.error) {
                Toast.fire({
                    icon: 'error',
                    title: data.error
                })
            }
            else {
                LoadingToast.close();
                props.toggle();
                location.reload();
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return { updateProfile }

}

export default useUpdateProfilePicture
