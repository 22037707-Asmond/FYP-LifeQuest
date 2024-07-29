import { useTheme } from '@mui/material';
import { ResponsiveLine } from '@nivo/line';
import React from 'react';
import { tokens } from '../../theme';

const LineChart = ({ isDashboard = false, data }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // Validate data structure
    const isDataValid = data && Array.isArray(data) && data.every(
        series => series.id && Array.isArray(series.data) && series.data.every(d => d.x !== undefined && d.y !== undefined)
    );

    if (!isDataValid) {
        console.error('Invalid data structure for LineChart:', data);
        return <div>Invalid data for the chart</div>;
    }

    return (
        <ResponsiveLine
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
                legend: isDashboard ? undefined : 'Profit/Loss',
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

export default LineChart;
