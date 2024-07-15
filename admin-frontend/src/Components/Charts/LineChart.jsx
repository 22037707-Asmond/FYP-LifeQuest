import { useTheme } from '@mui/material';
import { ResponsiveLine } from '@nivo/line';
import moment from 'moment';
import { mockdataAgents, mockdataPremium } from '../../Mockdata';
import { tokens } from '../../theme';

// Helper function to sum payments by month on the same date
const sumByMonthOnSameDate = (data, dateKey, valueKey) => {
    const result = {};
    data.forEach(item => {
        let month = moment(item[dateKey], 'MM/DD/YYYY');
        while (month.isBefore(moment())) {
            const monthKey = month.format('YYYY-MM');
            if (!result[monthKey]) {
                result[monthKey] = 0;
            }
            result[monthKey] += item[valueKey];
            month.add(1, 'month');
        }
    });

    // Ensure current month is included
    const currentMonth = moment().format('YYYY-MM');
    if (!result[currentMonth]) {
        result[currentMonth] = 0;
    }

    return result;
};

// Sum payments per month
const paymentsByMonth = sumByMonthOnSameDate(mockdataPremium, 'purchase_date', 'payment');

// Sum salaries per month (assuming salary is paid monthly and same every month)
const salariesByMonth = mockdataAgents.reduce((acc, agent) => {
    for (const month in paymentsByMonth) {
        if (!acc[month]) {
            acc[month] = 0;
        }
        acc[month] += agent.Salary;
    }
    return acc;
}, {});

// Calculate profit or loss per month
const profitOrLossByMonth = {};
for (const month in paymentsByMonth) {
    profitOrLossByMonth[month] = paymentsByMonth[month] - (salariesByMonth[month] || 0);
}

// Prepare data for chart and sort by month
const chartData = [
    {
        id: 'Profit/Loss',
        data: Object.keys(profitOrLossByMonth)
            .sort() // Ensure the data is sorted chronologically
            .map(month => ({
                x: month,
                y: profitOrLossByMonth[month],
            })),
    },
];

const LineChart = ({ isDashboard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

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
