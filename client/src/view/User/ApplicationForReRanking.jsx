import React, { useEffect, useState } from 'react'
import Instruction from '../../components/UserComponents/ApplicationComponents/Instruction.jsx';
import DropDown from '../../components/UserComponents/ApplicationComponents/DropDown.jsx';
import DisabledPage from '../../components/UserComponents/ApplicationComponents/DisabledPage.jsx';
import BackBtn from '../../components/Tools/Back.jsx';
import Header from "../../components/Tools/Header.jsx";
import axios from 'axios';

const ApplicationForReRanking = () => {
    const [ data, setData ] = useState();
    const [ loading, setIsLoading ] = useState(true)
     
    useEffect(() => {
        axios.get('/api/getEntry')
            .then(res => {
                setData(res.data);
                setIsLoading(false); // Set loading to false after data is fetched
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false); // Ensure loading is false even on error
            });
    }, []);

    return (
        <div className="bg-[#f4f7fa] min-h-screen w-screen font-Poppins">
            {loading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <div class="🤚">
                    	<div class="👉"></div>
                    	<div class="👉"></div>
                    	<div class="👉"></div>
                    	<div class="👉"></div>
                    	<div class="🌴"></div>		
                    	<div class="👍"></div>
                    </div>
                </div>
            ) : (
                <>
                <Header location={'Application For Re-Ranking'}/>
                <div className="px-16 py-2 max-sm:px-8">
                    <BackBtn/>
                    <div className="font-Poppins py-5 px-8 shadow-md rounded-xl bg-white max-sm:px-6">
                        {data ? (
                            <DisabledPage rest={data}/>
                        ) : (
                            <>
                                <Instruction/>
                                <DropDown from={ 'Application For Re-Ranking' }/>
                            </>
                        )}
                    </div>
                </div>
                </>
            )}
        </div>
    )
}

export default ApplicationForReRanking
