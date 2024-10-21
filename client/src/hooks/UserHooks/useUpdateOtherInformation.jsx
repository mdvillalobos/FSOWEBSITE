import useToast from "../Helpers/useToast";
import axios from 'axios'

const useUpdateOtherInformation = () => {
  const { Toast, LoadingToast } = useToast();

  const updateOtherInformation = async (sex, department, position, id, props) => {
    LoadingToast.fire({
      title: 'Updating...'
    });

    try {
      const { data } = await axios.post('/api/updateotherinfo', { 
        sex, department, position, id
      });
  
      if(data.error) {
        return Toast.fire({
          icon: 'error',
          title: data.error
        });
      }

      else {
        LoadingToast.close();
        props.toggle();
        location.reload();
      }
  
    } catch (error) {
      console.error(`Error Updating Other Information ${ error.message }`);
    }
  }
  return { updateOtherInformation }
}

export default useUpdateOtherInformation
