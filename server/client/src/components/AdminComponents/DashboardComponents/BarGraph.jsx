import React, { useContext, useState } from 'react';
import { RankContext } from '../../../../context/rankContext.jsx';
import { AnalyticsContext } from '../../../../context/analyticsContext.jsx';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Rectangle } from 'recharts';
import ReactMarkdown from 'react-markdown';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";

const DashboardGraph = () => {
  const { ranks } = useContext(RankContext);
  const { isApprovedData } = useContext(AnalyticsContext);
  const [ selected, setSelected ] = useState('Instructor 1');
  const [ isOpen, setIsOpen ] = useState(false);

  const toDisplayData = isApprovedData?.find(rankName => rankName.rankName === selected);
  const rankRequirements = ranks?.find(requirement => requirement.rankName === selected);

  const chartData = toDisplayData 
    ? toDisplayData?.requirementsCount?.map((data, index) => ({
        rankName: rankRequirements?.rankName,
        requirement: rankRequirements?.requirements[index].requirement,
        requirementNumber: `Requirement ${rankRequirements?.requirements[index].requirementNumber}`,
        approved: data.approved,
        declined: data.declined
      }))
    : [];


  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { rankName, requirement, declined, approved } = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <div className="bg-white bg-opacity-50 backdrop-blur-md w-[33vw] px-5 p-4 text-sm space-y-1.5 rounded-lg shadow-lg" >
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
    <div className='flex flex-col border-2 bg-white rounded-xl px-1.5 py-5 w-[67vw]'>
      <div className="flex justify-between mx-6 mb-2">
        <p className='text-2xl font-medium tracking-tight'>Rank Summary</p>
        <div>
          <button className="relative flex justify-center items-center py-1.5 px-2 w-56 text-sm rounded-lg border-2 text-gray-600" onClick={() => setIsOpen(!isOpen)}>
            {selected}
            {!isOpen ? (
              <MdOutlineKeyboardArrowDown size={'1.1rem'} className='absolute right-2'/>
            ) : (
              <MdOutlineKeyboardArrowUp size={'1.1rem'} className='absolute right-2'/>
            )}
          </button>
          {isOpen && (
            <div className="absolute w-56 text-sm mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 h-80 overflow-y-auto">
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
      <div className="text-xs ml-5 mr-0 select-none z-0">
        <ResponsiveContainer  width="100%" height={250}>
          <BarChart
            data={chartData.length > 0 ? chartData : [{ requirementNumber: "", approved: 0, declined: 0 }]}
            margin={{ top: 20 }}
          >
            <CartesianGrid vertical={false} stroke="#ECECEC"/>
            <XAxis dataKey='requirementNumber'axisLine={{ stroke: "#41518d", strokeWidth: 1 }} tick={{ fill: '#6a6a6a', dy: 5, }} />
            <YAxis orientation="right" domain={[0, chartData.length + 3]} stroke="#ECECEC" tick={{ fill: '#6a6a6a' }}  padding={{ bottom: 0.5 }} tickLine={false} tickMargin={0}/>
            <Tooltip content={<CustomTooltip />} /* position={{ x: 170, y: 0 }} */ />

            <Bar dataKey="approved" fill="#9DB6C9" />
            <Bar dataKey="declined" fill="#324E66" />
            <Legend  />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default DashboardGraph

