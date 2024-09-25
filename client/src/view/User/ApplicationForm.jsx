import { React, useContext } from 'react'
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../../context/userContext.jsx';
import Header from '../../components/Tools/Header.jsx';
import BackBtn from '../../components/UserComponents/ApplicationComponents/Return.jsx';
import ReRankingForm from '../../components/ReRankingFormComponents/ReRankingForm.jsx';

const ApplicationForm = () => {
    const location = useLocation();
    const { user } = useContext(UserContext);
    const { selectedForm } = location.state || {};
    const track = user.track;
    
    return (
        <div className='bg-[#f4f7fa] h-[100dvh]'>
            <Header location={selectedForm}/>
            <div className="px-14 py-2">
              <BackBtn/>
                <div className='bg-white py-4 px-8 shadow-md rounded-xl overflow-hidden'>
                    <ReRankingForm 
                        ApplyingFor={selectedForm}
                        userTrack={track}
                    />
                </div>
            </div>  
        </div>
    )
}

export default ApplicationForm
