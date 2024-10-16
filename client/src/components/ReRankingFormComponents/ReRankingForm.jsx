import React, { useState, useContext }from 'react';
import { Link } from 'react-router-dom';
import { RankContext } from '../../../context/rankContext.jsx';
import { UserContext } from '../../../context/userContext.jsx';
import PersonalInformation from './PersonalInformation.jsx';
import useGetApplicationData from '../../hooks/ApplicationHooks/useGetApplicationData.jsx';
import ReRankingFields from './ReRankingFields.jsx';
import useToast from '../../hooks/Helpers/useToast.jsx';

const ReRankingForm = ({ ApplyingFor, userTrack, from }) => {
    const { ranks } = useContext(RankContext);
    const { user } = useContext(UserContext);
    const { getApplicationData } = useGetApplicationData();
    const { Toast } = useToast();

    const [ data, setData ] = useState({
        name: user?.firstName + ' ' + user?.lastName,
        college: 'ad',
        department: user?.department,
        currentRank: user?.rank,
        academicYear: "2024-2025",
    });
    
    const [ requirement_1, setRequirement_1 ] = useState(null);
    const [ requirement_2, setRequirement_2 ] = useState(null);
    const [ requirement_3, setRequirement_3 ] = useState(null);
    const [ requirement_4, setRequirement_4 ] = useState(null);
    const [ requirement_5, setRequirement_5 ] = useState(null);
    const [ requirement_6, setRequirement_6 ] = useState(null);
    const [ requirement_7, setRequirement_7 ] = useState(null);
    const [ requirement_8, setRequirement_8 ] = useState(null);
    const [ requirement_9, setRequirement_9 ] = useState(null);
    const [ requirement_10, setRequirement_10 ] = useState(null);

    const selectedRank = ranks?.find(rankRequirement => rankRequirement.rankName === ApplyingFor);
    const handleSubmitApplication = async (e) => {
        e.preventDefault();

        const action = (from === 'Application For Re-Ranking') ? 'submit' : (from === 'Repository') && 'save';

        console.log(action)
        if (action === 'submit') {
            const requirementState = [
                requirement_1,
                requirement_2,
                requirement_3,
                requirement_4,
                requirement_5,
                requirement_6,
                requirement_7,
                requirement_8,
                requirement_9,
                requirement_10,
            ]
          
            for (let i = 0; i < selectedRank.requirements.length;  i++) {
                if (selectedRank.requirements[i] !== null && !requirementState[i]) {
                    return Toast.fire({
                        icon: 'error',
                        title: 'Required all fields!'
                    });
                }
            }
        }

        await getApplicationData(data.name, data.college, data.department, data.currentRank, data.academicYear, ApplyingFor, userTrack, action,
            requirement_1, requirement_2, requirement_3, requirement_4, requirement_5,
            requirement_6, requirement_7, requirement_8, requirement_9, requirement_10
        );
    }

    return (
        <div>
            <form onSubmit={handleSubmitApplication} className='font-Poppins' encType='multipart/form-data' >
                <div className="flex justify-between">
                    <h1 className='formTitle'>Faculty Ranking Form</h1>
                    <h1 className='formTitle'>{ApplyingFor}</h1>
                </div>
                <PersonalInformation
                    name={data.name}
                    college={data.college}
                    department={data.department}
                    currentRank={data.currentRank}
                    academicYear={data.academicYear}
                    data={data}
                    setData={setData}
                />

                <div className='pt-4'>
                    <h1 className='text-base font-semibold text-[#35408E] mb-1'>Qualification</h1>
                    
                    {selectedRank?.requirements.map((requirement, i) => {
                        const stateValues = {
                            requirement_1: requirement_1,
                            requirement_2: requirement_2,
                            requirement_3: requirement_3,
                            requirement_4: requirement_4,
                            requirement_5: requirement_5,
                            requirement_6: requirement_6,
                            requirement_7: requirement_7,
                            requirement_8: requirement_8,
                            requirement_9: requirement_9,
                            requirement_10: requirement_10,
                            setRequirement_1: setRequirement_1,
                            setRequirement_2: setRequirement_2,                            
                            setRequirement_3: setRequirement_3,
                            setRequirement_4: setRequirement_4,
                            setRequirement_5: setRequirement_5,
                            setRequirement_6: setRequirement_6,
                            setRequirement_7: setRequirement_7,
                            setRequirement_8: setRequirement_8,
                            setRequirement_9: setRequirement_9,
                            setRequirement_10: setRequirement_10,
                        };

                        const reqState = [`requirement_${i+1}`]
                        const setReqState = [`setRequirement_${i+1}`]
                        const checkReqStateValue = stateValues[reqState]
                        const checkSetReqValue = stateValues[setReqState]

                        return <ReRankingFields
                            key={requirement._id}
                            requirement={requirement.requirement}
                            data = {checkReqStateValue}
                            setData={checkSetReqValue}
                        />
                    })}

                    <div className='flex justify-end mt-4'>
                        {from === 'Application For Re-Ranking' ? (
                            <>
                                <Link to="/application" className='text-sm py-2 px-12 duration-300 mr-3 bg-[#E8E8E8] rounded hover:bg-[#bcbbbb]'>Cancel</Link>
                                <input type='submit' value='Submit' className='py-2 px-12 text-sm bg-[#35408e] text-white hover:bg-[#5d69c6] duration-300 rounded cursor-pointer border-0'/>
                            </>
                        ) : (
                            <>
                                <Link to="/repository" className='text-sm py-2 px-12 duration-300 mr-3 bg-[#E8E8E8] rounded hover:bg-[#bcbbbb]'>Cancel</Link>
                                <input type='submit' value='Save' className='py-2 px-12 text-sm bg-[#35408e] text-white hover:bg-[#5d69c6] duration-300 rounded cursor-pointer border-0'/>
                            </>
                        )}
                    </div>
            
                </div>
            </form>
        </div>
    )
}

export default ReRankingForm
