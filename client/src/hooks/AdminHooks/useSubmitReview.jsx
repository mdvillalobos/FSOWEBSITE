import axios from 'axios';
import useToast from '../Helpers/useToast';
import { useNavigate } from 'react-router-dom';

const useSubmitReview = () => {
    const { Toast } = useToast();
    const navigate = useNavigate();
    const submitReview = async (formID, decision, checkedReq1, checkedReq2, checkedReq3, checkedReq4, checkedReq5, checkedReq6, checkedReq7, checkedReq8, checkedReq9, checkedReq10) => {
        try {
            const requestBody = {
                formID,
                decision
            }

            const checkedReqs = [
                checkedReq1,
                checkedReq2,
                checkedReq3,
                checkedReq4,
                checkedReq5,
                checkedReq6,
                checkedReq7,
                checkedReq8,
                checkedReq9,
                checkedReq10
            ];
            
            // Filter out null values and add them to the request body
            checkedReqs.forEach((req, index) => {
                if (req !== null) {
                    requestBody[`checkedReq${index + 1}`] = req;
                }
            });

            console.log(requestBody)
            
            const { data } = await axios.post('/api/checkApplication', requestBody);

            if(data.erro) {
                Toast.fire({
                    icon: 'error',
                    error: data.error
                });
            }
            else {
                navigate('/admin/application');
            }
        } catch (error) {
            console.error(`Reviw Application Error: ${ error.message }`);
        }
    }

    return { submitReview }
}

export default useSubmitReview
