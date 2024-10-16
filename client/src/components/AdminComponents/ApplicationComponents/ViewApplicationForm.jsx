import React, { useState, useContext } from 'react';
import { RankContext } from '../../../../context/rankContext.jsx';
import ApplicationMaster from './ViewFormComponents/UserDetails.jsx';
import ApplicationInput from './ViewFormComponents/ApplicationInputs.jsx';
import useSubmitReview from '../../../hooks/AdminHooks/useSubmitReview.jsx';
import useToast from '../../../hooks/Helpers/useToast.jsx';

const ViewApplicationForm = ({ rest }) => {
    const { ranks } = useContext(RankContext);
    const { Toast } = useToast();
    const { submitReview } = useSubmitReview();

    const [ checkedReq1, setCheckedReq1 ] = useState(null);
    const [ checkedReq2, setCheckedReq2 ] = useState(null);
    const [ checkedReq3, setCheckedReq3 ] = useState(null);
    const [ checkedReq4, setCheckedReq4 ] = useState(null);
    const [ checkedReq5, setCheckedReq5 ] = useState(null);
    const [ checkedReq6, setCheckedReq6 ] = useState(null);
    const [ checkedReq7, setCheckedReq7 ] = useState(null);
    const [ checkedReq8, setCheckedReq8 ] = useState(null);
    const [ checkedReq9, setCheckedReq9 ] = useState(null);
    const [ checkedReq10, setCheckedReq10 ] = useState(null);


    const selectedRank = ranks?.find(requirement => requirement.rankName === rest.applyingFor);
    const handleSubmitReview = async (decision) => {
        const requirementState = [
            checkedReq1,
            checkedReq2,
            checkedReq3,
            checkedReq4,
            checkedReq5,
            checkedReq6,
            checkedReq7,
            checkedReq8,
            checkedReq9,
            checkedReq10,
        ]
      
        for (let i = 0; i < selectedRank.requirements.length;  i++) {
            if (selectedRank.requirements[i] !== null && !requirementState[i]) {
                return Toast.fire({
                    icon: 'error',
                    title: 'Review all fields!'
                });
            }
        }
        await submitReview(rest._id, decision, checkedReq1, checkedReq2, checkedReq3, checkedReq4, checkedReq5, checkedReq6, checkedReq7, checkedReq8, checkedReq9, checkedReq10);
    }

    return (
        <div>
            <div className='font-Poppins z-0'>
                <div className="flex justify-between">
                    <h1 className='formTitle'>Faculty Ranking Form</h1>
                    <h1 className='formTitle'>{rest.applyingFor}</h1>
                </div>
                <ApplicationMaster 
                    name={rest.name}
                    college={rest.college}
                    department={rest.department}
                    currentRank={rest.currentRank}
                    status={rest.status}
                    academicYear={rest.academicYear}
                />
                <div className='py-4'>
                    <h1 className='text-base font-semibold text-[#35408E] mb-4'>Qualification</h1>
                    <div>
                        {rest?.requirements?.map((data, i) => {
                            const requirement = selectedRank.requirements[i];
                            const stateValues = {
                                checkedReq1: checkedReq1,
                                checkedReq2: checkedReq2,
                                checkedReq3: checkedReq3,
                                checkedReq4: checkedReq4,
                                checkedReq5: checkedReq5,
                                checkedReq6: checkedReq6,
                                checkedReq7: checkedReq7,
                                checkedReq8: checkedReq8,
                                checkedReq9: checkedReq9,
                                checkedReq10: checkedReq10,
                                setCheckedReq1: setCheckedReq1,
                                setCheckedReq2: setCheckedReq2,                            
                                setCheckedReq3: setCheckedReq3,
                                setCheckedReq4: setCheckedReq4,
                                setCheckedReq5: setCheckedReq5,
                                setCheckedReq6: setCheckedReq6,
                                setCheckedReq7: setCheckedReq7,
                                setCheckedReq8: setCheckedReq8,
                                setCheckedReq9: setCheckedReq9,
                                setCheckedReq10: setCheckedReq10,
                            };
                            
                            const checkedReq = [`checkedReq${i + 1}`];
                            const setCheckedReq = [`setCheckedReq${i+1}`]
                            const checkedValue = stateValues[checkedReq]
                            const setCheckedValue = stateValues[setCheckedReq]

                            return <div key={data._id}>
                                <ApplicationInput
                                    requirement={requirement.requirement}
                                    filePath={data.filePath}
                                    checkedValue={checkedValue}
                                    setCheckedValue={setCheckedValue}
                                />
                            </div>
                        })}
                        <div className="flex justify-end space-x-4 mt-8">
                            {(checkedReq1 === 'Declined' || 
                            checkedReq2 === 'Declined' || 
                            checkedReq3 === 'Declined' || 
                            checkedReq4 === 'Declined' || 
                            checkedReq5 === 'Declined' ||
                            checkedReq6 === 'Declined' ||
                            checkedReq7 === 'Declined' || 
                            checkedReq8 === 'Declined' || 
                            checkedReq9 === 'Declined' || 
                            checkedReq10 === 'Declined') ? (
                                <button onClick={() => handleSubmitReview('Declined')} className='bg-red-500 py-3 px-8 text-white hover:bg-red-400 duration-200 text-sm '>Decline</button>
                            ) : (
                                <button onClick={() => handleSubmitReview('Approved')} className='bg-NuButton py-3 px-8 text-white hover:bg-NuButtonHover duration-200 text-sm '>Approved</button>
                            )}
                
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewApplicationForm
