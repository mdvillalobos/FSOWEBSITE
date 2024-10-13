import React, { useContext } from 'react';
import { AnalyticsContext  } from '../../../../context/analyticsContext';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const PieGraph = () => {
    const { statusData } = useContext(AnalyticsContext)

    const totalData = statusData?.approved + statusData?.declined 
    const pieSegments = [
        { id: 0, label: 'Approved', value: (statusData?.approved / totalData) * 100, percentage: `${((statusData?.approved / totalData) * 100).toFixed(2)}%` },
        { id: 1, label: 'Declined', value: (statusData?.declined / totalData) * 100, percentage: `${((statusData?.declined / totalData) * 100).toFixed(2)}%` },
    ];

   /*  const CustomTooltip = ({ value, id }) => {
        const percentageValue = `${value.toFixed(2)}%`
        return <Tooltip title={`${id}: ${percentageValue}}`} arrow>
          <div>{`${id}: ${value}`}</div>
        </Tooltip>
    } */
        const labelColor = '#FFFFFF';
    return (
        <div className='bg-white px-6 py-5 rounded-xl shadow-md'>
            <p className='text-2xl font-medium mb-6'>Total Applications</p>
            <div className="flex">
                <PieChart
                    colors={['#9DB6C9', '#324E66']}
                    series={[{
                        data: pieSegments,
                        arcLabel: (pieSegments) => `${Math.round(pieSegments.value * 100) / 100}%`,
                        highlightScope: { fade: 'global', highlight: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    }]} 
                    width={350}
                    height={200}
                />
            </div>
        </div>
    )
}

export default PieGraph
