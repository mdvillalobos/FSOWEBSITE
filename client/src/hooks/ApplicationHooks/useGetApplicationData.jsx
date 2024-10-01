import useToast from '../Helpers/useToast';
import useSubmitApplication from "./useSubmitApplication";

const useGetApplicationData = () => {
    const { Toast } = useToast();
    const { submitForm } = useSubmitApplication();
    const getApplicationData = async (name, college, department, currentRank, academicYear, ApplyingFor, userTrack, requirement_1, requirement_2, requirement_3, requirement_4, requirement_5, requirement_6, requirement_7, requirement_8, requirement_9, requirement_10) => {
        try {
            if(!name || !college || !department || !currentRank || !academicYear) {
                return Toast.fire({
                    icon: 'error',
                    title: 'Please fill up all fields'
                });
            }

            const formData = new FormData();
            formData.append('name', name);
            formData.append('college', college);
            formData.append('department', department);
            formData.append('currentRank', currentRank);
            formData.append('academicYear', academicYear);
            formData.append('ApplyingFor', ApplyingFor);
            formData.append('userTrack', userTrack);
            formData.append('requirement_1', requirement_1);
            formData.append('requirement_2', requirement_2);
            formData.append('requirement_3', requirement_3);
            formData.append('requirement_4', requirement_4);
            formData.append('requirement_5', requirement_5);
            formData.append('requirement_6', requirement_6);
            formData.append('requirement_7', requirement_7);
            formData.append('requirement_8', requirement_8);
            formData.append('requirement_9', requirement_9);
            formData.append('requirement_10', requirement_10);

            await submitForm(formData);

        } catch (error) {
            console.error(`Getting User Application Data Error: ${ error.message }`);
        }
    }

  return { getApplicationData };
}

export default useGetApplicationData
