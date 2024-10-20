import axios from "axios";
import useToast from '../Helpers/useToast.jsx';
import { useContext } from "react";
import { UserContext } from "../../../context/userContext.jsx";

const useAddEducation = () => {
    const { Toast, LoadingToast } = useToast();
    const { getProfileOnLogin } = useContext(UserContext)

    const AddEducation = async (level, schoolName, address, year, props) => {
        if(!level || !schoolName || !address || !year) {
            return Toast.fire({
                icon: 'error',
                title: 'Required all fields!'
            })
        }
        if(year.length > 9 || year.length < 9) {
            return Toast.fire({
                icon: 'error',
                title: 'Invalid Year'
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
                getProfileOnLogin();
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
