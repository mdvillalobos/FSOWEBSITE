import axios from "axios";
import useToast from '../Helpers/useToast.jsx';

const useAddSeminar = () => {
    const { Toast, LoadingToast } = useToast();

    const AddSeminar = async (seminarName, date, props) => {
        if(!seminarName || !date) {
            return Toast.fire({
                icon: 'error',
                title: 'Required all fields!'
            })
        }

        LoadingToast.fire({
            title: 'Adding...'
        });

        try {
            const { data } = await axios.post('/api/addSeminar', { 
                seminarName, date
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
            console.error(`Error Adding Seminar ${ error.message }`)
        }
    }

    return { AddSeminar }
}

export default useAddSeminar