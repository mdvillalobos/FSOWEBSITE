import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BackBtn from '../../components/Tools/Back.jsx';
import Header from "../../components/Tools/Header.jsx";
import SavedApplication from '../../components/UserComponents/RepositoryComponents/SavedApplication.jsx';
import ControlPanel from '../../components/UserComponents/RepositoryComponents/ControlPanel.jsx'

const Repository = () => {
    const [ data, setData ] = useState();
    const [ loading, setIsLoading ] = useState(true)

    useEffect(() => {
        axios.get('/api/getUserRepository')
        .then(res => {
            setData(res.data);
            setIsLoading(false);
        })
        .catch(err => {
            console.error(err);
            setIsLoading(false);
        });
    }, [])
    return (
        <div className="bg-[#f4f7fa] min-h-screen w-screen ">
            {loading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <div className="cssloader">
                        <div className="triangle1"></div>
                        <div className="triangle2"></div>
                        <p className="text">Please Wait</p>
                    </div>
                </div>
            ) : (
                <>
                    <Header location={ 'Repository' }/>
                    <div className="px-16 py-2 max-sm:px-8">
                        <BackBtn/>
                        <div className='font-Poppins py-5 px-8 border-2 rounded-xl bg-white space-y-4 max-sm:px-5  '>
                            <ControlPanel/>
                            <SavedApplication data={data}/>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Repository
