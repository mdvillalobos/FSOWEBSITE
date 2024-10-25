import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../../components/Tools/Header.jsx";
import BackBtn from '../../components/Tools/AdminBack.jsx';
import ReportTable from '../../components/AdminComponents/ReportComponents/AdminReportTable.jsx';

const Survey = () => {
    const [ data, setData ] = useState([]);
    const [ loading, setIsLoading ] = useState(true)

    useEffect(() => {
        axios.get('/api/getAllReports')
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
        <div className='bg-[#f4f7fa] min-h-screen'>
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
                    <Header location={'Weekly Report'}/>
                    <div className="px-16 py-2">
                        <BackBtn/>
                        <div className='bg-white py-6 rounded-xl border-2 overflow-hidden h-[80vh]'>
                            <ReportTable data={data}/>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Survey
