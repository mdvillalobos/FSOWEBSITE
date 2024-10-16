import useToast from '../Helpers/useToast';
import useSubmitApplication from "./useSubmitApplication";

const useGetApplicationData = () => {
    const { Toast } = useToast();
    const { submitForm } = useSubmitApplication();
    const getApplicationData = async (from, name, college, department, currentRank, academicYear, ApplyingFor, userTrack, action, requirement_1, requirement_2, requirement_3, requirement_4, requirement_5, requirement_6, requirement_7, requirement_8, requirement_9, requirement_10) => {
        
        console.log(name, college, department, currentRank)
        if(!name || !college || !department || !currentRank) {
            return Toast.fire({
                icon: 'error',
                title: 'Required all fields!'
            })
        }


        try {
            const maxSizeInBytes = 5 * 1024 * 1024;
            const validTypes = ['image/png', 'image/jpeg', 'application/pdf'];
            const userSubmittedFields = [
                requirement_1, 
                requirement_2, 
                requirement_3, 
                requirement_4, 
                requirement_5, 
                requirement_6, 
                requirement_7, 
                requirement_8, 
                requirement_9, 
                requirement_10
            ]

            const formData = new FormData();
            formData.append('name', name);
            formData.append('college', college);
            formData.append('department', department);
            formData.append('currentRank', currentRank);
            formData.append('academicYear', academicYear);
            formData.append('ApplyingFor', ApplyingFor);
            formData.append('userTrack', userTrack);
            formData.append('action', action);
            
            userSubmittedFields.forEach((field, i) => {
                if(field !== null) {
                    if(validTypes.includes(field.type) && field.size <= maxSizeInBytes) {
                        formData.append(`requirement_${i+1}`, field)
                    }
                    else {
                        return Toast.fire({
                            icon: 'error',
                            title: `Invalid file type or size: ${field.name}`
                        })
                    }
                   
                }
            })
            await submitForm(formData, from);

        } catch (error) {
            console.error(`Getting User Application Data Error: ${ error.message }`);
        }
    }

  return { getApplicationData };
}

export default useGetApplicationData
