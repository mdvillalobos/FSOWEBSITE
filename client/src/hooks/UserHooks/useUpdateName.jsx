import axios from "axios"
import useToast from "../Helpers/useToast.jsx";

const useUpdateName = () => {
  const { Toast, LoadingToast } = useToast();

  const EditName = async (lastName, firstName, middleName, props) => {
    LoadingToast.fire({
     title: 'Updating...'
    });

    try {
      const { data } = await axios.post('/api/updatename' , {
        lastName, firstName, middleName,
      });
      console.log('processing')
    
      if(data.error) {
        Toast.fire({
          icon: "error",
          title: data.error
        });
      }

      else {
        LoadingToast.close();
        props.toggle();
        location.reload();
      }

    } catch (error) {
      console.error(`Edit Profile Error: ${ error.message }`);
    }
  }
  return { EditName }
}

export default useUpdateName
