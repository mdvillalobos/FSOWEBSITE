import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Table from '../../components/UserComponents/ReportComponents/ReportTable.jsx';
import BackBtn from '../../components/Tools/Back.jsx';
import Header from "../../components/Tools/Header.jsx";

const Report = () => {
    const [ data, setData ] = useState([]);
    const [ loading, setIsLoading ] = useState(true)

    useEffect(() => {
        axios.get('/api/getreport')
            .then(res => {
                setData(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }, []);


    console.log(data)

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
                    <div className="px-16 py-2 max-sm:px-8">
                        <BackBtn/>
                        <div className='bg-white py-6 rounded-xl border-2 overflow-hidden h-[80vh]'>
                            <Table data={data}/>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Report
