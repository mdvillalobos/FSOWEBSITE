import axios from 'axios';
import useToast from "../Helpers/useToast.jsx";
import useLogout from '../AuthHooks/useLogout.jsx';

const useChangePassword = () => {
    const { Logout } = useLogout();
    const { Toast, LoadingToast } = useToast();

    const ChangePassword = async (oldPassword, newPassword, confirmNewPassword) => {
        if(!oldPassword || !newPassword || !confirmNewPassword) {
            return Toast.fire({
                icon: "error",
                title: 'Required all the fields'
            });
        }

        if(newPassword !== confirmNewPassword) {
            return Toast.fire({
                icon: "error",
                title: 'Required all the fields'
            });
        }

        LoadingToast.fire({
            title: 'Updating...'
        })
        try {
            const { data } = await axios.post('/api/changepassword', {
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
            console.error(`Change Password Error: ${ error.message }`);
        }
    }
    return { ChangePassword }
}

export default useChangePassword
