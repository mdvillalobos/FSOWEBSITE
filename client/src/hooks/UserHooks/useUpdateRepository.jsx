import axios from "axios";
import { useNavigate } from "react-router-dom";
import useToast from "../Helpers/useToast";


const useUpdateRepository = () => {
    const navigate = useNavigate();
    const { Toast, LoadingToast } = useToast();

    const updateRepository = async ( formID, requirement_1, requirement_2, requirement_3, requirement_4, requirement_5, requirement_6, requirement_7, requirement_8, requirement_9, requirement_10 ) => {

        if(!formID) {
            Toast.fire({
                icon: 'error',
                title: 'Form ID is missing!'
            })
        }
        LoadingToast.fire({
            title: 'Saving your work..',
        });
        try {
            const userSubmittedFields = [
                requirement_1, 
                requirement_2, 
                requirement_3, 
                requirement_4, 
                requirement_5, 
                requirement_6, 
                requirement_7, 
                requirement_8, 
                requirement_9, 
                requirement_10
            ]
            
            const formData = new FormData();
            formData.append('formID', formID);
            
            let length = 1;
            userSubmittedFields.forEach((field, i) => {
                if(field instanceof File) {
                    formData.append(`requirement_${i+1}`, field);
                    length++;
                }
            })
 
            
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }

            if(length > 1) {
                const { data } = await axios.post('/api/updateRepository', formData);

                if(data.error) {
                    Toast.fire({
                        icon: 'error',
                        title: data.error
                    })
                }
    
                else {
                    LoadingToast.close();
                    navigate('/repository');
                }
            }

            else {
                LoadingToast.close()
                navigate('/repository');
            }

           
        } catch (error) {
            console.error(`Updating Repository Error: ${ error.message }`);
        }
    }

    return { updateRepository }
}

export default useUpdateRepository
