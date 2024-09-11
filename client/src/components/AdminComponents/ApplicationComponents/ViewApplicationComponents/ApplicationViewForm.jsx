import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FocusOn } from 'react-focus-on'

import ApplicationMaster from './UserDetails.jsx'
import ViewImage from './ViewImage.jsx';
import ApplicationInput from './ApplicationInputs.jsx';
import useSubmitReview from '../../../../hooks/AdminHooks/useSubmitReview.jsx';
import { NavLink } from 'react-router-dom'

const ViewApplicationForm = ({rest}) => {
    const { submitReview } = useSubmitReview();
    const [ requirement, setRequirement ] = useState([]);
    const [ showImage, setShowImage ] = useState({
        show: false,
        image: null
    });

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

    useEffect(() => {
        axios.get(`/api/getRequirement?rank=${rest.applyingFor}`)
        .then(res => setRequirement(res.data))
        .catch(err => console.log(err))
    }, []);

    const handleExit = () => {
        setShowImage({show: false});
    }

    const handleViewImage = (image) => {
        setShowImage({show: true, image: image});
    }

    const handleSubmitReview = async (decision) => {
        console.log(decision)
        await submitReview(rest._id, decision, checkedReq1, checkedReq2, checkedReq3, checkedReq4, checkedReq5, checkedReq6, checkedReq7, checkedReq8, checkedReq9, checkedReq10);
    }
    return (
        <div>
            {showImage.show && (
                <FocusOn>
                    <ViewImage 
                        handleExit ={handleExit}
                        image={showImage.image}
                    />
                </FocusOn>
            )}
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
                        <ApplicationInput
                            requirement={requirement.requirement_1}
                            rest={rest.requirement_1}
                            checkedValue={checkedReq1}
                            setCheckedValue={setCheckedReq1}
                            handleViewImage={handleViewImage}
                        />
                        <ApplicationInput
                            requirement={requirement.requirement_2}
                            rest={rest.requirement_2}
                            checkedValue={checkedReq2}
                            setCheckedValue={setCheckedReq2}
                            handleViewImage={handleViewImage}
                        />
                        <ApplicationInput
                            requirement={requirement.requirement_3}
                            rest={rest.requirement_3}
                            checkedValue = {checkedReq3}
                            setCheckedValue={setCheckedReq3}
                            handleViewImage={handleViewImage}
                        />

                        {requirement.requirement_4 != null && 
                            <ApplicationInput
                                requirement={requirement.requirement_4}
                                rest={rest.requirement_4}
                                checkedValue = {checkedReq4}
                                setCheckedValue={setCheckedReq4}
                                handleViewImage={handleViewImage}
                            />
                        }

                        {requirement.requirement_5 != null && 
                            <ApplicationInput
                                requirement={requirement.requirement_5}
                                rest={rest.requirement_5}
                                checkedValue = {checkedReq5}
                                setCheckedValue={setCheckedReq5}
                                handleViewImage={handleViewImage}
                            />
                        }

                        {requirement.requirement_6 != null && 
                            <ApplicationInput
                                requirement={requirement.requirement_6}
                                rest={rest.requirement_6}
                                checkedValue = {checkedReq6}
                                setCheckedValue={setCheckedReq6}
                                handleViewImage={handleViewImage}
                            />
                        }
                        {requirement.requirement_7 != null && 
                            <ApplicationInput
                                requirement={requirement.requirement_7}
                                rest={rest.requirement_7}
                                checkedValue = {checkedReq7}
                                setCheckedValue={setCheckedReq7}
                                handleViewImage={handleViewImage}
                            />
                        }
                        {requirement.requirement_8 != null && 
                            <ApplicationInput
                                requirement={requirement.requirement_8}
                                rest={rest.requirement_8}
                                checkedValue = {checkedReq8}
                                setCheckedValue={setCheckedReq8}
                                handleViewImage={handleViewImage}
                            />
                        }
                        {requirement.requirement_9 != null && 
                            <ApplicationInput
                                requirement={requirement.requirement_9}
                                rest={rest.requirement_9}
                                checkedValue = {checkedReq9}
                                setCheckedValue={setCheckedReq9}
                                handleViewImage={handleViewImage}
                            />
                        }
                        {requirement.requirement_10 != null && 
                            <ApplicationInput
                                requirement={requirement.requirement_10}
                                rest={rest.requirement_10}
                                checkedValue = {checkedReq10}
                                setCheckedValue={setCheckedReq10}
                                handleViewImage={handleViewImage}
                            />
                        }
  
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
