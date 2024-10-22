import axios from 'axios';
import useToast from '../Helpers/useToast.jsx'
const useDeleteFile = () => {
    const { Toast, LoadingToast } = useToast();

    const DeleteFile = async ( formID ) => {
        
        LoadingToast.fire({ title: 'Deleting file...'})
        try {
            const { data } = await axios.post('/api/deleteRepository', { formID });

            if(data.error) {
                return Toast.fire({
                    icon: 'error',
                    title: data.error,
                })
            }
            else {
                LoadingToast.close();
                location.reload();
            }
        }

        catch (error) {
            console.log(`Deletion Of Repository File Error: ${ error.message }`);
        }
    }

    return { DeleteFile }

}

export default useDeleteFile
