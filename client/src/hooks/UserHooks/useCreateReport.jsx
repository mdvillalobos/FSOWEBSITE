import axios from "axios";
import useToast from "../Helpers/useToast.jsx";

const useCreateReport = () => {
    const {Toast} = useToast();

    const createReport = async (subject, message, date, props) => {
        if(!subject ||!message || !date) {
            return Toast.fire({
                icon: "error",
                title: 'Required all fields.'
            });
        }
        try {
            const {data} = await axios.post('api/submitreport', {
                message, date, subject
            })
        
            if(data.error) {
                Toast.fire({
                    icon: "error",
                    title: data.error
                });
            }
            else {
                location.reload();
                props.toggle();
            }
        } catch (error) {
          console.error(`Report Submittion Error: ${ error.message }`);
        }
    }
    return { createReport }
}

export default useCreateReport
