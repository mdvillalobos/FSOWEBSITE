import axios from "axios";
import useToast from "../Helpers/useToast.jsx";

const useCreateReport = () => {
    const {Toast} = useToast();
    const createReport = async (subject, message, date, props) => {
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
          console.log(error)
        }
    }
    return {createReport}
}

export default useCreateReport
