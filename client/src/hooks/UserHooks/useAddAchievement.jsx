import axios from "axios";
import useToast from '../Helpers/useToast.jsx';

const useAddAchievement = () => {
    const { Toast, LoadingToast } = useToast();

    const AddAchievement = async (achievementName, date, props) => {
        if(!achievementName || !date) {
            return Toast.fire({
                icon: 'error',
                title: 'Required all fields!'
            })
        }

        LoadingToast.fire({
            title: 'Adding...'
        });

        try {
            const { data } = await axios.post('/api/addAchievement', { 
                achievementName, date
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
