import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../../components/Tools/Header.jsx";
import BackBtn from '../../components/Tools/AdminBack.jsx';
import BarGraph from '../../components/AdminComponents/DashboardComponents/BarGraph.jsx';
import PieGraph from "../../components/AdminComponents/DashboardComponents/PieGraph.jsx";
import Config from '../../components/AdminComponents/DashboardComponents/Config.jsx';
import RankTable from '../../components/AdminComponents/DashboardComponents/RankTable.jsx'

const Dashboard = () => {
  const [ data, setData ] = useState([]);
  const [ loading, setIsLoading ] = useState(true)

  useEffect(() => {
      axios.get('/api/getApprovers')
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
    <div className="bg-[#f4f7fa] h-full pb-4 font-Poppins">
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
          <Header location={'Dashboard'} />
          <div className="px-16 py-2">
            <BackBtn/>
            <div className="flex h-full space-x-4">
              <div className="flex-1 space-y-4 ">
                <BarGraph/>
                <div className="flex space-x-2 ">
                  <PieGraph/>
                  <RankTable/>
                </div>
              </div>
              <div className="flex-1 bg-white px-7 py-5 rounded-xl shadow-md w-[18vw]">
                <Config data={data}/>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
  
export default Dashboard
