import React, { useContext, useEffect, useState } from 'react';
import { RankContext } from '../../../../context/rankContext.jsx';
import { AnalyticsContext } from '../../../../context/analyticsContext.jsx';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid  } from 'recharts';
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import ReactMarkdown from 'react-markdown';

const DashboardGraph = () => {
  const { ranks } = useContext(RankContext);
  const { isApprovedData } = useContext(AnalyticsContext);
  const [ selected, setSelected ] = useState('Instructor 1');
  const [ isOpen, setIsOpen ] = useState(false);

  const toDisplayData = isApprovedData?.find(rankName => rankName.rankName === selected);
  const rankRequirements = ranks?.find(requirement => requirement.rankName === selected);

  const chartData = toDisplayData 
    ? toDisplayData?.requirementsCount?.map((data, index) => ({
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
          <div className="bg-gray-200 w-[33vw] px-5 p-4 text-sm space-y-1.5 rounded-lg" >
            <p>{rankName}</p>
            <ReactMarkdown >{requirement}</ReactMarkdown>
            <div>
              <p className="font-medium">Approved: {approved}</p>
              <p className="font-medium">Declined: {declined}</p>
            </div>
          </div>
        </div>
      );
    }
  
    return null;
  };

  return (
    <div className='flex flex-col bg-white px-1.5 py-5 rounded-xl shadow-md w-[72vw]'>
      <div className="flex justify-between mx-7 mb-2">
        <p className='text-3xl font-medium'>Analytics</p>
        <div>
          <button  className="flex justify-center items-center border-2 py-2 px-2 w-48 text-sm rounded-md font-medium bg-gray-200" onClick={() => setIsOpen(!isOpen)}>
            {selected}
            {!isOpen ? (
              <TiArrowSortedDown size={'1.1rem'} className=''/>
            ) : (
              <TiArrowSortedUp size={'1.1rem'} className=''/>
            )}
          </button>
          {isOpen && (
            <div className="absolute w-48 text-sm mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
              {ranks.map((rank) => (
                <div
                  key={rank._id}
                  onClick={() => {setSelected(rank.rankName), setIsOpen(!isOpen)}}
                  className="cursor-pointer py-2 px-4 hover:bg-[#41518d] hover:text-white duration-200"
                >
                  {rank.rankName}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="mr-10 text-xs select-none z-0">
        <ResponsiveContainer  width="100%" height={250}>
          <BarChart
            data={chartData}
            margin={{ top: 20 }}
          >
            <CartesianGrid vertical={false} stroke="#ECECEC" />
            <XAxis dataKey='requirementNumber' stroke="none" tick={{ fill: '#6a6a6a', dy: 5, }} />
            <YAxis domain={[0, chartData.length + 3]} stroke="none" tick={{ fill: '#6a6a6a' }}  />
            <Tooltip content={<CustomTooltip />} /* position={{ x: 170, y: 0 }} */ />
            <Bar dataKey="approved" fill="#9DB6C9" radius={[ 5, 5, 5, 5 ]} />
            <Bar dataKey="declined" fill="#324E66" radius={[ 5, 5, 5, 5 ]} />
            <Legend  />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default DashboardGraph
