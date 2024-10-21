import axios from "axios";
import useToast from '../Helpers/useToast.jsx';
import { useContext } from "react";
import { UserContext } from "../../../context/userContext.jsx";

const useAddSeminar = () => {
    const { Toast, LoadingToast } = useToast();
    const { getProfileOnLogin } = useContext(UserContext)

    const AddSeminar = async (seminarName, year, props) => {
        console.log(seminarName)
        if(!seminarName || !year) {
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
            const { data } = await axios.post('/api/addSeminar', { 
                seminarName, year
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
            console.error(`Error Adding Seminar ${ error.message }`)
        }
    }

    return { AddSeminar }
}

export default useAddSeminar