import axios from 'axios';
import useToast from '../Helpers/useToast';
import { useNavigate } from 'react-router-dom';

const useSubmitReview = () => {
    const { Toast } = useToast();
    const navigate = useNavigate();
    const submitReview = async (formID, decision, checkedReq1, checkedReq2, checkedReq3, checkedReq4, checkedReq5, checkedReq6, checkedReq7, checkedReq8, checkedReq9, checkedReq10) => {
        try {
            const { data } = await axios.post('/api/checkApplication', {
                formID, decision, checkedReq1, checkedReq2, checkedReq3, checkedReq4, checkedReq5, checkedReq6, checkedReq7, checkedReq8, checkedReq9, checkedReq10
            });

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
            console.log(error)
        }
    }

    return { submitReview }
}

export default useSubmitReview
