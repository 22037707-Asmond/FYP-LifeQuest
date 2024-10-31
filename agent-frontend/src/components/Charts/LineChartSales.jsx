import { useTheme } from '@mui/material';
import { ResponsiveLine } from '@nivo/line';
import React, { useEffect, useState } from 'react';
import { useAccount } from '../../services/LocalStorage'; // Import useAccount hook
import { tokens } from '../../theme';
import { getSalesPerMonth } from './lifequestDataAPI'; // Import the function to fetch real data

// Transform the data into the required format for Nivo's ResponsiveLine
const transformData = (data) => {
    return [
        {
            id: 'Sales',
            data: data.map(item => ({
                x: item.month, // Month in "yyyy-MM" format
                y: item.totalSales // Total sales for that month
            }))
        }
    ];
};

const LineChartSales = ({ isDashboard = false }) => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { account } = useAccount(); // Get the current agent's account

    // Fetch data and update state
    useEffect(() => {
        const fetchData = async () => {
            if (account && account.id) {
                try {
                    const data = await getSalesPerMonth(account.id); // Pass the agent ID to fetch data
                    const transformedData = transformData(data);
                    console.log(data)
                    console.log(transformedData)
                    setChartData(transformedData);
                } catch (error) {
                    console.error('Error fetching sales per month:', error);
                    setError('Error fetching data');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [account]);

    // Validate data structure
    const isDataValid = chartData && Array.isArray(chartData) && chartData.every(
        series => series.id && Array.isArray(series.data) && series.data.every(d => d.x !== undefined && d.y !== undefined)
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!isDataValid) {
        console.error('Invalid data structure for LineChart:', chartData);
        return <div>Invalid data for the chart</div>;
    }

    return (
        <ResponsiveLine
            data={chartData}
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
                tooltip: {
                    container: {
                        color: colors.primary[500],
                    },
                },
            }}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: true,
                reverse: false,
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? undefined : 'Month',
                legendOffset: 36,
                legendPosition: 'middle',
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? undefined : 'Total Sales',
                legendOffset: -40,
                legendPosition: 'middle',
            }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabel="y"
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1,
                            },
                        },
                    ],
                },
            ]}
        />
    );
};

export default LineChartSales;
