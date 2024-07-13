import { useTheme } from '@mui/material';
import { ResponsivePie } from '@nivo/pie';
import { mockdataUsers as rawData } from '../../Mockdata';
import { tokens } from '../../theme';

const getAge = dob => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
};

const binUsersByAge = users => {
    const bins = {
        Adolescence: { label: '(10-17)', count: 0 },
        EarlyAdulthood: { label: '(18-35)', count: 0 },
        Midlife: { label: '(36-50)', count: 0 },
        MatureAdulthood: { label: '(51-65)', count: 0 },
        LateAdulthood: { label: '(66+)', count: 0 },
    };

    users.forEach(user => {
        const age = getAge(user.dob);

        if (age >= 10 && age <= 17) bins.Adolescence.count++;
        else if (age >= 18 && age <= 35) bins.EarlyAdulthood.count++;
        else if (age >= 36 && age <= 50) bins.Midlife.count++;
        else if (age >= 51 && age <= 65) bins.MatureAdulthood.count++;
        else if (age >= 66) bins.LateAdulthood.count++;
    });

    return Object.values(bins)
        .filter(bin => bin.count > 0)
        .map(bin => ({
            id: bin.label,
            label: bin.label,
            value: bin.count,
        }));
};

const PieChart = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const data = binUsersByAge(rawData);

    return (
        <ResponsivePie
            data={data}
            theme={{
                axis: {
                    domain: {
                        line: {
                            stroke: colors.grey[100]
                        }
                    },
                    legend: {
                        text: {
                            fill: colors.grey[100]
                        }
                    },
                    ticks: {
                        line: {
                            stroke: colors.grey[100],
                            strokeWidth: 1
                        },
                        text: {
                            fill: colors.grey[100]
                        }
                    }
                },
                legends: {
                    text: {
                        fill: colors.grey[100]
                    }
                }
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
                    [
                        'darker',
                        0.2
                    ]
                ]
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
                    [
                        'darker',
                        2
                    ]
                ]
            }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
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
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
            tooltip={({ datum: { id, value, color } }) => (
                <div
                    style={{
                        padding: '5px 10px',
                        color,
                        background: '#222',
                    }}
                >
                    <strong>{id}</strong>: {value}
                </div>
            )}
        />
    );
};

export default PieChart;