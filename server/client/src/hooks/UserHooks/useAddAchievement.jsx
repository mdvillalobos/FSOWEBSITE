import axios from "axios";
import useToast from '../Helpers/useToast.jsx';
import { useContext } from "react";
import { UserContext } from "../../../context/userContext.jsx";

const useAddAchievement = () => {
    const { Toast, LoadingToast } = useToast();
    const { getProfileOnLogin } = useContext(UserContext);

    const AddAchievement = async (achievementName, year, props) => {
        if(!achievementName || !year) {
            return Toast.fire({
                icon: 'error',
                title: 'Required all fields!'
            })
        }

        if(year.length > 4 || year.length < 4) {
            return Toast.fire({
                icon: 'error',
                title: 'Invalid Year'
            })
        }

        LoadingToast.fire({
            title: 'Adding...'
        });

        try {
            const { data } = await axios.post('/api/addAchievement', { 
                achievementName, year
            });

            if(data.error) {
                return Toast.fire({
                    icon: 'error',
                    title: data.error
                })
            }
            else {
                Toast.fire({
                    icon: 'success',
                    title: 'Created Successfully.'
                });
                getProfileOnLogin();
                props.toggle();
            }
        }
        catch (error) {
            console.error(`Error Adding Achievement ${ error.message }`)
        }
    }
    return { AddAchievement }
}

export default useAddAchievement
