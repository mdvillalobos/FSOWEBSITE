import React, { useState, useContext, useEffect }from 'react';
import { Link } from 'react-router-dom';
import { RankContext } from '../../../../context/rankContext.jsx';
import PersonalInformation from '../../ReRankingFormComponents/PersonalInformation.jsx';
import ReRankingFields from '../../ReRankingFormComponents/ReRankingFields.jsx';
import useToast from '../../../hooks/Helpers/useToast.jsx';
import useUpdateRepository from '../../../hooks/UserHooks/useUpdateRepository.jsx';
import useSubmitFromRepository from '../../../hooks/ApplicationHooks/useSubmitFromRepository.jsx';

const RepositoryForm = ({ files, from }) => {
    const { ranks } = useContext(RankContext);
    const { Toast } = useToast();
    const { SubmitFromRepository } = useSubmitFromRepository();
    const { updateRepository } = useUpdateRepository();

    const [ data, setData ] = useState({
        name: files?.name,
        college: files?.college,
        department: files?.department,
        currentRank: files?.currentRank,
        academicYear: files.academicYear,
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

    const stateValues = [
        { value: requirement_1, setValue: setRequirement_1 },
        { value: requirement_2, setValue: setRequirement_2 },
        { value: requirement_3, setValue: setRequirement_3 },
        { value: requirement_4, setValue: setRequirement_4 },
        { value: requirement_5, setValue: setRequirement_5 },
        { value: requirement_6, setValue: setRequirement_6 },
        { value: requirement_7, setValue: setRequirement_7 },
        { value: requirement_8, setValue: setRequirement_8 },
        { value: requirement_9, setValue: setRequirement_9 },
        { value: requirement_10, setValue: setRequirement_10 },
    ];

    const selectedRank = ranks?.find(rankRequirement => rankRequirement.rankName === files?.applyingFor);
    useEffect(() => {
        const validRequirements = files?.requirements.filter(requirement => requirement.requirementNumber <= stateValues.length);
        validRequirements.forEach(requirement => {
            const index = requirement.requirementNumber - 1;
            stateValues[index].setValue({
                filename: requirement.fileName,
                filePath: requirement.filePath
            });
            
        });
    }, [selectedRank, files]);


    const handleSaveApplication = async (e) => {
        e.preventDefault();
        const formID = files?._id
        
            await updateRepository(formID, requirement_1, requirement_2, requirement_3, requirement_4, requirement_5,
                requirement_6, requirement_7, requirement_8, requirement_9, requirement_10
        );
    }


    const handleSubmitApplication = async (e) => {
        e.preventDefault();
        const purpose = 'application'
        const formID = files?._id
        for (let i = 0; i < selectedRank.requirements.length;  i++) {
            if (selectedRank.requirements[i] !== null && !stateValues[i].value) {
                return Toast.fire({
                    icon: 'error',
                    title: 'Required all fields!'
                });
            }
        }

        await SubmitFromRepository(formID, purpose,
            requirement_1, requirement_2, requirement_3, requirement_4, requirement_5,
            requirement_6, requirement_7, requirement_8, requirement_9, requirement_10
        );
    }

    return (
        <div>
             <form className='font-Poppins' encType='multipart/form-data' >
                <div className="flex justify-between">
                    <h1 className='formTitle'>Faculty Ranking Form</h1>
                    <h1 className='formTitle'>{files?.applyingFor}</h1>
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
                    
                    {selectedRank?.requirements.map((requirement, i) => (
                        <ReRankingFields
                            key={requirement._id}
                            requirement={requirement.requirement}
                            data={stateValues[i].value}
                            setData={stateValues[i].setValue}
                        />
                    ))}

                    <div className='flex justify-end mt-4'>
                        <>
                            {from === 'Repository' ? (
                                <>
                                    <Link to="/repository" className='text-sm py-2 px-12 duration-300 mr-3 bg-[#E8E8E8] rounded hover:bg-[#bcbbbb]'>Cancel</Link>
                                    <button type='button' className='py-2 px-12 text-sm bg-[#35408e] text-white hover:bg-[#5d69c6] duration-300 rounded cursor-pointer border-0' onClick={handleSaveApplication}>Save</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/application" className='text-sm py-2 px-12 duration-300 mr-3 bg-[#E8E8E8] rounded hover:bg-[#bcbbbb]'>Cancel</Link>
                                    <button type='button' className='py-2 px-12 text-sm bg-[#35408e] text-white hover:bg-[#5d69c6] duration-300 rounded cursor-pointer border-0' onClick={handleSubmitApplication}>Submit</button>
                                </>
                            )}
                        </>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RepositoryForm
