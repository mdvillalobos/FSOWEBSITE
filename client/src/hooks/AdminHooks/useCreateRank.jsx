import axios from 'axios'
import useToast from '../Helpers/useToast.jsx'

const useCreateRank = () => {
    const { Toast } = useToast();
    const createRank = async (rankName, track, requirement_1, requirement_2, requirement_3, requirement_4, requirement_5, requirement_6, requirement_7, requirement_8, requirement_9, requirement_10, props) => {
        try {
            const {data} = await axios.post('/api/createRank', {
                rankName, track, requirement_1, requirement_2, requirement_3, requirement_4, requirement_5, requirement_6, requirement_7, requirement_8, requirement_9, requirement_10
            });

            if(data.error) {
                Toast.fire({
                    icon: "error",
                    title: data.error
                });
            }
            else {
                props.toggle();
            }
        } catch (error) {
            console.log(error)
        }
    }
    return { createRank }
}

export default useCreateRank
