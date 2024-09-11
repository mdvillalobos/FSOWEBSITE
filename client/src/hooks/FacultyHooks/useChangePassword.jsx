import axios from 'axios';
import useToast from "../Helpers/useToast.jsx";
import useLogout from '../AuthHooks/useLogout.jsx';

const useChangePassword = () => {
    const { Logout } = useLogout();
    const { Toast } = useToast();
    const ChangePassword = async (oldPassword, newPassword, confirmNewPassword) => {
        try {
            const {data} = await axios.post('/api/changepassword', {
                oldPassword, newPassword, confirmNewPassword
            })
      
            if(data.error){
                Toast.fire({
                    icon: "error",
                    title: data.error
                });
            }

            else {
              Logout();
            }

        } catch (error) {
            console.log(error)
        }
    }
    return {ChangePassword}
}

export default useChangePassword
