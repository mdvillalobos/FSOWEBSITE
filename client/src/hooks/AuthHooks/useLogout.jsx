import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react';
import { UserContext } from '../../../context/userContext';

const useLogout = () => {
    const { setUser, setRole } = useContext(UserContext);
    const navigate = useNavigate();
    const Logout = async () => {
        try {
            await axios.get('/api/logout')
            .then(setUser(null))
            .then(setRole(null))
            .then(res => {navigate('/')})
        } catch (error) {
            console.log(error)
        }
    }
    return {Logout}
}

export default useLogout
