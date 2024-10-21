import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../../components/Tools/Header.jsx";
import BackBtn from '../../components/Tools/AdminBack.jsx';
import ApplicationTable from '../../components/AdminComponents/ApplicationComponents/ApplicationTable.jsx';

const Application = () => {
    const [ data, setData ] = useState([]);
    const [ loading, setIsLoading ] = useState(true)

    useEffect(() => {
        axios.get('/api/getApplications')
        .then(res => {
            setData(res.data);
            setIsLoading(false);
        })
        .catch(err => {
            console.error(err);
            setIsLoading(false);
        });
    }, []);

    return (
        <div className="bg-[#f4f7fa] h-screen">
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
                    <Header location={'Applications For Re-Ranking'}/>
                    <div className="px-16 py-2">
                        <BackBtn/>
                        <div className='bg-white py-6 rounded-xl shadow-md overflow-hidden h-[80vh]'>
                        <ApplicationTable data={data}/>
                      </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Application
