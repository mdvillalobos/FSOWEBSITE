import React, { useContext, useEffect, useState } from 'react';
import { RankContext } from '../../../../context/rankContext.jsx';
import { AnalyticsContext } from '../../../../context/analyticsContext.jsx';

import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';

const DashboardGraph = () => {
  const { ranks } = useContext(RankContext);
  const { analyticsData } = useContext(AnalyticsContext);
  const [ currentData, setCurrentData ] = useState([])
  const [ selected, setSelected ] = useState();

  /* useEffect(()=> {
    axios.get(`/api/getDataAnalytics`)
    .then(response => setResponseData(response.data))
    .catch(error => console.error(`Fetching Analytics Error: ${ error.message }`))
  }, []); 
 */

  console.log(ranks)
  const toDisplayData = analyticsData.find(rankName => rankName.rankName === selected)
  /* const rankRequirements = ranks.find(requirement => requirement.rankName === selected) */
  /* console.log(rankRequirements) */
  console.log(toDisplayData)
  const handleChange = (event) => {
    setSelected(event.target.value);
    console.log('Selected Value:', event.target.value); // You can use this for other logic
  };


  return (
    <div className='flex flex-col bg-white px-4 py-6 rounded-xl shadow-md font-Poppins'>
      <div className="">
        <select className='px-2 py-1.5 border-2 text-sm' name="" id="" onChange={handleChange}>
          {ranks ? (
            ranks.map((rank, i) => (
              <option key ={rank._id} value={rank.rankName}>{rank.rankName}</option>
            ))
          ) : (
            <p>No Data</p>
          )}
        </select>
      </div>
      <BarChart
        series={[
          { data: [35, 23, 54, 54] },
        ]}
        height={290}
        xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />
    </div>
  )
}

export default DashboardGraph

