import React, { useContext, useEffect, useState } from 'react';
import { RankContext } from '../../../../context/rankContext.jsx';
import { AnalyticsContext } from '../../../../context/analyticsContext.jsx';

import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';

const DashboardGraph = () => {
  const { ranks } = useContext(RankContext);
  const { analyticsData } = useContext(AnalyticsContext);
  const [ selected, setSelected ] = useState('Instructor 1');

  /* useEffect(()=> {
    axios.get(`/api/getDataAnalytics`)
    .then(response => setResponseData(response.data))
    .catch(error => console.error(`Fetching Analytics Error: ${ error.message }`))
  }, []); 
 */

  const toDisplayData = analyticsData.find(rankName => rankName.rankName === selected);
  const rankRequirements = ranks.find(requirement => requirement.rankName === selected);

  const chartData = toDisplayData 
        ? toDisplayData.requirementsCount.map((req, index) => ({
            name: rankRequirements.requirements[index].requirement, // You can customize the name as needed
            total: req.total,
        }))
        : [];

  
  console.log(chartData)
  const handleChange = (event) => {
    setSelected(event.target.value);
    console.log('Selected Value:', event.target.value); // You can use this for other logic
  };


  return (
    <div className='flex flex-col bg-white px-4 py-6 rounded-xl shadow-md font-Poppins'>
      <div className="">
        {/* {toDisplayData.requirementsCount.map((data, i) => (
          <p>{data.total}</p>
        ))} */}
        <select className='px-2 py-1.5 border-2 text-sm' name="" id="" onChange={handleChange}>
          {ranks ? (
            ranks.map((rank, i) => (
              <option key ={rank._id} value={rank.rankName}>{rank.rankName}</option>
            ))
          ) : (
            <option value={'No Data'}>No Data</option>
          )}
        </select>
      </div>
      <BarChart
        dataset={chartData}
        series={[{ name: chartData.map(item => item.name), data: chartData.map(item => item.total) }]}
        height={290}
        xAxis={[{ data: rankRequirements ? rankRequirements.requirements.map(requirement => `Requirement ${requirement.requirementNumber}`) : [], scaleType: 'band' }]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />
    </div>
  )
}

export default DashboardGraph

