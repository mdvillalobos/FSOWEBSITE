import axios from "axios";
import useToast from '../Helpers/useToast.jsx';

const useAddEducation = () => {
    const { Toast, LoadingToast } = useToast();

    const AddEducation = async (level, schoolName, address, year, props) => {
        if(!level || !schoolName || !address || !year) {
            return Toast.fire({
                icon: 'error',
                title: 'Required all fields!'
            })
        }

        LoadingToast.fire({
            title: 'Adding...'
        });

        try {
            const { data } = await axios.post('/api/addEducation', { 
                level, schoolName, address, year
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
            console.error(`Error Adding Education ${ error.message }`)
        }
    }

    return { AddEducation }
}

export default useAddEducation
