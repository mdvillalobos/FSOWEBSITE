import axios from "axios";
import { useNavigate } from "react-router-dom";
import useToast from "../Helpers/useToast";

const useSubmitFromRepository = () => {
    const { Toast, LoadingToast } = useToast();
    const navigate = useNavigate();

    const SubmitFromRepository = async (formID, purpose, requirement_1, requirement_2, requirement_3, requirement_4, requirement_5, requirement_6, requirement_7, requirement_8, requirement_9, requirement_10) => {
        if(!purpose) {
            return Toast.fire({
                icon: error,
                title: 'Purpose is missing!'
            });
        }
        
        try {
            const maxSizeInBytes = 5 * 1024 * 1024;
            const validTypes = ['image/png', 'image/jpeg', 'application/pdf'];
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
            formData.append('formID', formID)
            formData.append('purpose', purpose);

            userSubmittedFields.forEach((field, i) => {
                if(field !== null) {
                    if(field instanceof File) {
                        if(validTypes.includes(field.type) && field.size <= maxSizeInBytes) {
                            formData.append(`requirement_${i+1}`, field)
                        }
                        else {
                            return Toast.fire({
                                icon: 'error',
                                title: `Invalid file type or size: ${field.name}`
                            })
                        }
                    }
                }
            })

            LoadingToast.fire({ 
                title: 'Submitting your application.'
            })

            const { data } = await axios.post('/api/updateRepository', formData);
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
                    title: 'Submitted Successfully'
                });
                navigate('/application');
            }
            
        } catch (error) {
            console.error(`Submittion Of Form From Repository Error ${ error.message }`)
        }
    }

    return { SubmitFromRepository }
}

export default useSubmitFromRepository