import React, { useState, useEffect }from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PersonalInformation from './PersonalInformation.jsx';
import useGetApplicationData from '../../hooks/ApplicationHooks/useGetApplicationData.jsx';
import useToast from '../../hooks/Helpers/useToast.jsx';

const ReRankingForm = ({ ApplyingFor, userTrack }) => {
    const { getApplicationData } = useGetApplicationData();
    const { Toast } = useToast();
    const [ requirement, setRequirement ] = useState([]);
    const [ data, setData ] = useState({
        name: "",
        college: "",
        department: "",
        currentRank: "",
        academicYear: "",
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

    useEffect(() => {
        const fetchData = async () => {
            const [requirementResponse, profileResponse] = await Promise.all([
                axios.get(`/api/getRequirement?rank=${ApplyingFor}`),
                axios.get('/api/getProfile'),
            ]);
            setData({ 
                name: `${profileResponse.data.firstName} ${profileResponse.data.lastName}`,
                college: '',
                department: profileResponse.data.department, 
                currentRank: profileResponse.data.rank,
                academicYear: ''
            })
            setRequirement(requirementResponse.data);
        }
        fetchData();
    }, []);

    const handleSubmitApplication = async (e) => {
        e.preventDefault();

        const hasEmptyFields = 
            (requirement.requirement_1 !== '' && !requirement_1) ||
            (requirement.requirement_2 !== '' && !requirement_2) ||
            (requirement.requirement_3 !== '' && !requirement_3) ||
            (requirement.requirement_4 !== '' && !requirement_4) ||
            (requirement.requirement_5 !== '' && !requirement_5) ||
            (requirement.requirement_6 !== '' && !requirement_6) ||
            (requirement.requirement_7 !== '' && !requirement_7) ||
            (requirement.requirement_8 !== '' && !requirement_8) ||
            (requirement.requirement_9 !== '' && !requirement_9) ||
            (requirement.requirement_10 !== '' && !requirement_10)
        
        if(hasEmptyFields) {
            return Toast.fire({
                icon: 'error',
                title: 'Please fill up all fields'
            });
        }
        else {
            await getApplicationData(data.name, data.college, data.department, data.currentRank, data.academicYear, ApplyingFor, userTrack, 
                requirement_1, requirement_2, requirement_3, requirement_4, requirement_5,
                requirement_6, requirement_7, requirement_8, requirement_9, requirement_10
            )
        }
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
                    {requirement.requirement_1 != '' && 
                        <ReRankingFields
                            requirement={requirement.requirement_1}
                            setData={setRequirement_1}
                        />
                    }

                    {requirement.requirement_2 != ''  && 
                        <ReRankingFields
                            requirement={requirement.requirement_2}
                            setData={setRequirement_2}
                        />
                    }

                    {requirement.requirement_3 != '' && 
                        <ReRankingFields
                            requirement={requirement.requirement_3}
                            setData={setRequirement_3}
                        />
                    }

                    {requirement.requirement_4 != '' && 
                        <ReRankingFields
                            requirement={requirement.requirement_4}
                            setData={setRequirement_4}
                        />
                    }

                    {requirement.requirement_5 != '' && 
                        <ReRankingFields
                            requirement={requirement.requirement_5}
                            setData={setRequirement_5}
                        />
                    }

                    {requirement.requirement_6 != '' && 
                        <ReRankingFields
                            requirement={requirement.requirement_6}
                            setData={setRequirement_6}
                        />
                    }

                    {requirement.requirement_8 != '' && 
                        <ReRankingFields
                            requirement={requirement.requirement_7}
                            setData={setRequirement_7}
                        />
                    }

                    {requirement.requirement_8 != '' && 
                        <ReRankingFields
                            requirement={requirement.requirement_8}
                            setData={setRequirement_8}
                        />
                    }

                    {requirement.requirement_9 != '' && 
                        <ReRankingFields
                            requirement={requirement.requirement_9}
                            setData={setRequirement_9}
                        />
                    }

                    {requirement.requirement_10 != '' && 
                        <ReRankingFields
                            requirement={requirement.requirement_10}
                            setData={setRequirement_10}
                        />
                    }

                    <div className="flex justify-end mt-4">
                        <Link to="/application" className='text-sm py-2 px-6 duration-300 mr-3 bg-[#E8E8E8] rounded hover:bg-[#bcbbbb]'>Cancel</Link>
                        <input type="submit" value="Submit" className=' py-2 px-6 text-sm bg-[#35408e] text-white hover:bg-[#5d69c6] duration-300 rounded cursor-pointer' />
                    </div>
            
                </div>
            </form>
        </div>
    )
}

export default ReRankingForm
