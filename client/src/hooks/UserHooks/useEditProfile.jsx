import axios from "axios"
import useToast from "../Helpers/useToast.jsx";

const useEditProfile = () => {
  const { Toast } = useToast();

  const EditProfile = async (lastName, firstName, middleName, email, employeeID, department) => {
      try {
        const { data } = await axios.post('/api/updateprofile' , {
          lastName, firstName, middleName, email, employeeID, department
        });
      
        if(data.error) {
          Toast.fire({
            icon: "error",
            title: data.error
          });
        }

        else {
          location.reload();
        }

      } catch (error) {
          console.error(`Edit Profile Error: ${ error.message }`);
      }
  }
  return { EditProfile }
}

export default useEditProfile
