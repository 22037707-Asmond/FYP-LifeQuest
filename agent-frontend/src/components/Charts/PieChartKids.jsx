import { useTheme } from '@mui/material';
import { ResponsivePie } from '@nivo/pie';
import React, { useEffect, useState } from 'react';
import { useAccount } from '../../services/LocalStorage'; // Import useAccount hook
import { tokens } from '../../theme';
import { getUserChildrenBins } from './lifequestDataAPI'; // Import the function to fetch real data

const PieChartAge = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { account } = useAccount(); // Get the current agent's account
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (account && account.id) {
                try {
                    const result = await getUserChildrenBins(account.id); // Pass the agent ID to fetch data
                    console.log('Fetched data:', result); // Log fetched data to check its structure
    
                    if (Array.isArray(result)) {
                        // Transform and filter data to remove entries with count of 0
                        const transformedData = result
                            .filter(item => item.count > 0) // Remove entries with count of 0
                            .map(item => ({
                                id: item.childrenBin, // Changed 'label' to 'id' to match Nivo Pie chart data structure
                                value: item.count,
                            }));
    
                        console.log('Transformed data:', transformedData); // Log transformed data
                        setData(transformedData);
                    } else {
                        console.error('Data is not an array:', result);
                        setError('Data is not an array'); // Set a general error message
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setError('Error fetching data'); // Set a general error message
                } finally {
                    setLoading(false);
                }
            } 
        };
    
        fetchData();
    }, [account]);
    

    // Validate data structure
    const isDataValid = data && Array.isArray(data) && data.every(
        item => item.id !== undefined && item.value !== undefined
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data: {error}</div>;
    if (!isDataValid) {
        console.error('Invalid data structure for PieChart:', data);
        return <div>Invalid data for the chart</div>;
    }

    return (
        <ResponsivePie
            data={data}
            theme={{
                axis: {
                    domain: {
                        line: {
                            stroke: colors.grey[100],
                        },
                    },
                    legend: {
                        text: {
                            fill: colors.grey[100],
                        },
                    },
                    ticks: {
                        line: {
                            stroke: colors.grey[100],
                            strokeWidth: 1,
                        },
                        text: {
                            fill: colors.grey[100],
                        },
                    },
                },
                legends: {
                    text: {
                        fill: colors.grey[100],
                    },
                },
            }}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
                from: 'color',
                modifiers: [
                    ['darker', 0.2],
                ],
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor={colors.grey[100]}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            enableArcLabels={false}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    ['darker', 2],
                ],
            }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true,
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                },
            ]}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000',
                            },
                        },
                    ],
                },
            ]}
            tooltip={({ datum: { id, value, color } }) => (
                <div
                    style={{
                        padding: '5px 10px',
                        color,
                        background: '#222',
                        borderRadius: '4px',
                    }}
                >
                    <strong>{id}</strong>: {value} users
                </div>
            )}
        />
    );
};

export default PieChartAge;
