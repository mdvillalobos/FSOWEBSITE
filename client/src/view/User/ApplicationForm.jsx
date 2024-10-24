import { React, useContext } from 'react'
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../../context/userContext.jsx';
import Header from '../../components/Tools/Header.jsx';
import BackBtn from '../../components/UserComponents/ApplicationComponents/Return.jsx';
import ReRankingForm from '../../components/ReRankingFormComponents/ReRankingForm.jsx';

const ApplicationForm = () => {
    const location = useLocation();
    const { user } = useContext(UserContext);
    const { selectedForm, from } = location.state || {};
    const track = user.track;
    
    return (
        <div className='bg-[#f4f7fa] h-full'>
            <Header location={ selectedForm }/>
            <div className="px-16 py-2 max-sm:px-8">
              <BackBtn from={ from }/>
                <div className='bg-white py-8 px-10 mx-36 border-2 rounded-xl overflow-hidden max-sm:mx-0'>
                    <ReRankingForm 
                        ApplyingFor={ selectedForm }
                        userTrack={ track } 
                        from ={ from }
                    />
                </div>
            </div>  
        </div>
    )
}

export default ApplicationForm
