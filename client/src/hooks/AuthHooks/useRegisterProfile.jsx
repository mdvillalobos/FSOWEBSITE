import { useNavigate } from "react-router-dom";
import axios from "axios";
import useToast from '../Helpers/useToast.jsx';
import { useContext } from 'react';
import { UserContext } from '../../../context/userContext.jsx';
import { RankContext } from '../../../context/rankContext.jsx';
import { AnalyticsContext } from '../../../context/analyticsContext.jsx';

const useRegisterProfile = () => {
    const { fetchRanksOnLogin } = useContext(RankContext);
    const { getDataOnLogin } = useContext(AnalyticsContext);
    const { getProfileOnLogin } = useContext(UserContext);
    const { Toast, LoadingToast } = useToast();
    const navigate = useNavigate();
    const registerProfile = async (profilePicture, lastName, firstName, middleName, sex, track, rank, department, position) => {
        console.log(profilePicture, lastName, firstName, middleName, sex, track, rank, department, position)
        if(!lastName || !firstName || !sex || !track || !rank || !department || !position) {
            return Toast.fire({
                icon: "error",
                title: 'Required all fields.'
            });
        }

        LoadingToast.fire({
            title: 'Registering your data. Please wait!'
        })
        try {

            const formData = new FormData();
            formData.append('profilePicture', profilePicture);
            formData.append('lastName', lastName);
            formData.append('firstName', firstName);
            formData.append('middleName', middleName);
            formData.append('sex', sex);
            formData.append('track', track);
            formData.append('rank', rank);
            formData.append('department', department);
            formData.append('position', position);


            const { data } = await axios.post('/api/registeProfile', formData);
        
            if(data.error) {
                Toast.fire({
                    icon: "error",
                    title: data.error
                });
            }
            else {
                LoadingToast.close();
                getProfileOnLogin();
                fetchRanksOnLogin();
                getDataOnLogin();
                navigate('/home');
            }
        } catch (error) {
            console.error(`Profile registration error ${ error.message }`);
        }
    }

    return {registerProfile}
}

export default useRegisterProfile
