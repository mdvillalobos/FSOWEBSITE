import axios from "axios"
import useToast from "../Helpers/useToast"

function useSendOTP() {
    const { Toast } = useToast();
    const resendOTP = () => {
        const { data } = axios.post('/api/resendOTP');

        if(data.error) {
            Toast.fire({
                icon: 'error',
                title: data.error
            });
        }
        else {
            Toast.fire({
                icon: 'success',
                title: 'Your OTP Sent Successfully!'
            });
        }
    }

    return { resendOTP }

}

export default useSendOTP
