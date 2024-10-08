import React, { useContext, useEffect, useState } from 'react';
import { RankContext } from '../../../../context/rankContext.jsx';
import { AnalyticsContext } from '../../../../context/analyticsContext.jsx';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid  } from 'recharts';
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import ReactMarkdown from 'react-markdown';

const DashboardGraph = () => {
  const { ranks } = useContext(RankContext);
  const { analyticsData } = useContext(AnalyticsContext);
  const [ selected, setSelected ] = useState('Instructor 1');
  const [ isOpen, setIsOpen ] = useState(false);

  const toDisplayData = analyticsData?.find(rankName => rankName.rankName === selected);
  const rankRequirements = ranks?.find(requirement => requirement.rankName === selected);

  const chartData = toDisplayData 
    ? toDisplayData.requirementsCount.map((data, index) => ({
        rankName: rankRequirements.rankName,
        requirement: rankRequirements.requirements[index].requirement,
        requirementNumber: `Requirement ${rankRequirements.requirements[index].requirementNumber}`,
        approved: data.approved,
        declined: data.declined
      }))
    : [];
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { rankName, requirement, declined, approved } = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <div className="bg-[#41518d] w-[33vw] px-5 p-4 text-sm space-y-1.5 rounded-lg text-white">
            <p className='font-medium border-b-2'>{rankName}</p>
            <ReactMarkdown >{requirement}</ReactMarkdown>
            <div>
              <p>Approved: {approved}</p>
              <p>Declined: {declined}</p>
            </div>
          </div>
        </div>
      );
    }
  
    return null;
  };

  return (
    <div className='flex flex-col bg-white px-1.5 py-5 rounded-xl shadow-md font-Poppins w-[75vw]'>
      <div className="flex justify-between z-10 mx-10 mb-2">
        <p className='text-3xl font-medium'>Analytics</p>
        <div className="relative">
          <button  className="relative flex justify-center border-2 py-2 px-2 w-48 text-sm rounded-md font-medium" onClick={() => setIsOpen(!isOpen)}>
            {selected}
            {!isOpen ? (
              <TiArrowSortedDown size={'1.1rem'} className='absolute right-1 top-[9px]'/>
            ) : (
              <TiArrowSortedUp size={'1.1rem'} className='absolute right-1 top-[9px]'/>
            )}
          </button>
          {isOpen && (
            <div className="absolute w-48 text-sm z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              {ranks.map((rank) => (
                <div
                  key={rank._id}
                  onClick={() => {setSelected(rank.rankName), setIsOpen(!isOpen)}}
                  className="cursor-pointer py-2 px-4 hover:bg-blue-500 hover:text-white duration-200"
                >
                  {rank.rankName}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="mr-10 z-0 text-xs select-none">
        <ResponsiveContainer  width="100%" height={250}>
          <BarChart
            data={chartData}
            margin={{ top: 20 }}
          >
            <CartesianGrid vertical={false} stroke="#ECECEC" />
            <XAxis dataKey='requirementNumber' stroke="none" tick={{ fill: '#6a6a6a', dy: 5, }} />
            <YAxis domain={[0, chartData.length + 3]} stroke="none" tick={{ fill: '#6a6a6a' }}  />
            <Tooltip content={<CustomTooltip />} /* position={{ x: 170, y: 0 }} */ />
            <Bar dataKey="approved" fill="#293241" radius={[ 5, 5, 5, 5 ]} />
            <Bar dataKey="declined" fill="#ee6c4d" radius={[ 5, 5, 5, 5 ]} />
            <Legend  />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default DashboardGraph

