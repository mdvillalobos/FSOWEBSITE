import useToast from "../Helpers/useToast"

const useUpdateOtherInformation = () => {
  const { Toast, LoadingToast } = useToast();

  const updateOtherInformation = async (sex, department, position, props) => {
    try {
      const { data } = await axios.post('/api/updateOtherInfo', { 
        sex, department, position
      });
  
      if(data.error) {
        Toast.fire({
          icon: 'error',
          title: data.error
        });
      }
      else {
        props.toggle();
      }
  
    } catch (error) {
      console.error(`Error Updating Other Information ${ error.message }`);
    }
  }
  return { updateOtherInformation }
}

export default useUpdateOtherInformation
