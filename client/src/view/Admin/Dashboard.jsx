import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../../components/Tools/Header.jsx";
import BackBtn from '../../components/Tools/AdminBack.jsx';
import BarGraph from '../../components/AdminComponents/DashboardComponents/BarGraph.jsx';
import PieGraph from "../../components/AdminComponents/DashboardComponents/PieGraph.jsx";
import RankTable from '../../components/AdminComponents/DashboardComponents/RankTable.jsx'
import Approvers from '../../components/AdminComponents/DashboardComponents/Approvers.jsx';
import Config from '../../components/AdminComponents/DashboardComponents/Config.jsx';
import GraphDescription from '../../components/AdminComponents/DashboardComponents/GraphDescription.jsx';

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
            <div className="space-y-4">
              <div className="flex h-full space-x-4">
                <div className="flex-1 space-y-4 ">
                  <GraphDescription/>
                  <BarGraph/>
                </div>
                <div className="flex-1 flex flex-col w-[20vw] space-y-4">
                  <PieGraph/>
                  <Config/>
                </div>
              </div>
              <div className="flex h-full space-x-4">
                <div className="flex-1 space-y-4 ">
                  <RankTable/> 
                </div>
                <div className="flex-1 w-[20vw] bg-white border-2 rounded-xl py-4 px-5">
                  <Approvers data={data}/>
                </div>
              </div>
              </div>
          </div>
        </>
      )}
    </div>
  )
}
  
export default Dashboard
