import axios from "axios"

const useEditProfile = () => {
    const EditProfile = async (lastName, firstName, middleName, email, employeeID, department) => {
        try {
            const {data} = await axios.post('/api/updateprofile' , {
              lastName, firstName, middleName, email, employeeID, department
            })
      
            if(data.error) {
              
            }
            else {
              location.reload();
            }
        } catch (error) {
            console.log(error)
        }
    }
    return {EditProfile}
}

export default useEditProfile
