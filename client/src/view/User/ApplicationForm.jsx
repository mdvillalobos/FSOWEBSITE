import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../../context/userContext.jsx';


import Header from '../../components/Tools/Header.jsx';
import BackBtn from '../../components/UserComponents/ApplicationComponents/Return.jsx';
import ReRankingForm from '../../components/ReRankingFormComponents/ReRankingForm.jsx';

/* import Instructor1Form from '../../components/ApplicationForms/Instructor/Instructor1Form.jsx';
import Instructor2Form from '../../components/ApplicationForms/Instructor/Instructor2Form.jsx';
import Instructor3Form from '../../components/ApplicationForms/Instructor/Instructor3Form.jsx';
import Instructor4Form from '../../components/ApplicationForms/Instructor/Instructor4Form.jsx';

import AssistantProf1Form from '../../components/ApplicationForms/AssistantProfessor/AssistantProf1Form.jsx';
import AssistantProf2Form from '../../components/ApplicationForms/AssistantProfessor/AssistantProf2Form.jsx';
import AssistantProf3Form from '../../components/ApplicationForms/AssistantProfessor/AssistantProf3Form.jsx';
import AssistantProf4Form from '../../components/ApplicationForms/AssistantProfessor/AssistantProf4Form.jsx';

import AssociateProf1Form from '../../components/ApplicationForms/AssociateProfessor/AssociateProf1Form.jsx';
import AssociateProf2Form from '../../components/ApplicationForms/AssociateProfessor/AssociateProf2Form.jsx';
import AssociateProf3Form from '../../components/ApplicationForms/AssociateProfessor/AssociateProf3Form.jsx';
import AssociateProf4Form from '../../components/ApplicationForms/AssociateProfessor/AssociateProf4Form.jsx';

import FullProfessor1Form from '../../components/ApplicationForms/FullProfessor/FullProfessor1Form.jsx';
import FullProfessor2Form from '../../components/ApplicationForms/FullProfessor/FullProfessor2Form.jsx';
import FullProfessor3Form from '../../components/ApplicationForms/FullProfessor/FullProfessor3Form.jsx';
import FullProfessor4Form from '../../components/ApplicationForms/FullProfessor/FullProfessor4Form.jsx';

import Lecturer1Form from '../../components/ApplicationForms/Lecturer1Form.jsx';
import Lecturer2Form from '../../components/ApplicationForms/Lecturer/Lecturer2Form.jsx';
import Lecturer3Form from '../../components/ApplicationForms/Lecturer/Lecturer3Form.jsx';

import ProfessionalLecturer1Form from '../../components/ApplicationForms/ProfessionalLecturer/ProfessionalLecturer1Form.jsx';
import ProfessionalLecturer2Form from '../../components/ApplicationForms/ProfessionalLecturer/ProfessionalLecturer2Form';
import ProfessionalLecturer3Form from '../../components/ApplicationForms/ProfessionalLecturer/ProfessionalLecturer3Form.jsx';
import ProfessionalLecturer4Form from '../../components/ApplicationForms/ProfessionalLecturer/ProfessionalLecturer4Form.jsx';
import ProfessionalLecturer5Form from '../../components/ApplicationForms/ProfessionalLecturer/ProfessionalLecturer5Form.jsx';
import ProfessionalLecturer6Form from '../../components/ApplicationForms/ProfessionalLecturer/ProfessionalLecturer6Form.jsx'; */

const ApplicationForm = () => {
    const location = useLocation();
    const { user } = useContext(UserContext);
    const { selectedForm } = location.state || {};
    const track = user.track
    return (
        <div className='bg-[#f4f7fa] h-[100dvh]'>
            <Header/>
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
