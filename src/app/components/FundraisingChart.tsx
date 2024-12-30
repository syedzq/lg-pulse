"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
    BarChart,
    Bar
} from 'recharts';

const allTimeData = [
    { year: '2022', amount: 85000 },
    { year: '2023', amount: 112500 },
    { year: '2024', amount: 128000 },
];

const ramadanData = Array.from({ length: 30 }, (_, i) => ({
    day: `${i + 1}`,
    amount2024: Math.round(5000 + Math.random() * 3000 + (i * 800)), // Increasing trend
    amount2023: Math.round(4000 + Math.random() * 2000 + (i * 600)), // Lower but similar pattern
    amount2022: Math.round(3000 + Math.random() * 1500 + (i * 400)), // Even lower but similar pattern
}));

interface FundraisingChartProps {
    mode: 'all-time' | 'ramadan-comparison' | 'monthly';
}

export function FundraisingChart({ mode }: FundraisingChartProps) {
    const formatYAxis = (value: number) => `$${(value / 1000).toFixed(1)}K`;

    const monthlyData = [
        { month: 'Jan', '2024': 28450, '2023': 22180, '2022': 15780 },
        { month: 'Feb', '2024': 25320, '2023': 18940, '2022': 14950 },
        { month: 'Mar', '2024': 95800, '2023': 17650, '2022': 13875 },
        { month: 'Apr', '2024': 35500, '2023': 82400, '2022': 12980 },
        { month: 'May', '2024': 28750, '2023': 25780, '2022': 12450 },
        { month: 'Jun', '2024': 27800, '2023': 24950, '2022': 11890 },
        { month: 'Jul', '2024': 26900, '2023': 23875, '2022': 11340 },
        { month: 'Aug', '2024': 26200, '2023': 22980, '2022': 10980 },
        { month: 'Sep', '2024': 25800, '2023': 21450, '2022': 10450 },
        { month: 'Oct', '2024': 25400, '2023': 20890, '2022': 9870 },
        { month: 'Nov', '2024': 24900, '2023': 19340, '2022': 9340 },
        { month: 'Dec', '2024': 24500, '2023': 18980, '2022': 8950 }
    ];

    if (mode === 'monthly') {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                    <XAxis 
                        dataKey="month"
                        tick={{ fill: '#6B7280', fontSize: 14 }}
                        axisLine={{ stroke: '#E5E7EB' }}
                        tickLine={false}
                    />
                    <YAxis 
                        tickFormatter={formatYAxis}
                        tick={{ fill: '#6B7280', fontSize: 14 }}
                        axisLine={{ stroke: '#E5E7EB' }}
                        tickLine={false}
                    />
                    <Tooltip 
                        formatter={(value: number) => [`$${value.toLocaleString()}`]}
                        contentStyle={{ 
                            backgroundColor: 'white',
                            border: '1px solid #E5E7EB',
                            borderRadius: '6px',
                            padding: '8px'
                        }}
                    />
                    <Legend />
                    <Line 
                        type="monotone" 
                        dataKey="2024" 
                        stroke="#2C633D"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6 }}
                    />
                    <Line 
                        type="monotone" 
                        dataKey="2023" 
                        stroke="#4AA567"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6 }}
                    />
                    <Line 
                        type="monotone" 
                        dataKey="2022" 
                        stroke="#8ECCA2"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        );
    }

    if (mode === 'all-time') {
        const minAmount = Math.min(...allTimeData.map(d => d.amount));
        const maxAmount = Math.max(...allTimeData.map(d => d.amount));
        const padding = (maxAmount - minAmount) * 0.1;

        return (
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={allTimeData}>
                    <XAxis 
                        dataKey="year" 
                        tick={{ fill: '#6B7280', fontSize: 14 }}
                        axisLine={{ stroke: '#E5E7EB' }}
                        tickLine={false}
                    />
                    <YAxis 
                        tickFormatter={formatYAxis}
                        tick={{ fill: '#6B7280', fontSize: 14 }}
                        axisLine={{ stroke: '#E5E7EB' }}
                        domain={[minAmount - padding, maxAmount + padding]}
                        tickLine={false}
                    />
                    <Tooltip 
                        formatter={(value: number) => [`$${value.toLocaleString()}`]}
                        contentStyle={{ 
                            backgroundColor: 'white',
                            border: '1px solid #E5E7EB',
                            borderRadius: '6px',
                            padding: '8px'
                        }}
                        cursor={{ fill: 'transparent' }}
                    />
                    <Bar 
                        dataKey="amount" 
                        fill="#4AA567"
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        );
    }

    // Ramadan comparison mode
    const minAmount = Math.min(
        ...ramadanData.map(d => Math.min(d.amount2024, d.amount2023, d.amount2022))
    );
    const maxAmount = Math.max(
        ...ramadanData.map(d => Math.max(d.amount2024, d.amount2023, d.amount2022))
    );
    const padding = (maxAmount - minAmount) * 0.1;

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ramadanData}>
                <XAxis 
                    dataKey="day"
                    tick={{ fill: '#6B7280', fontSize: 14 }}
                    axisLine={{ stroke: '#E5E7EB' }}
                    tickLine={false}
                />
                <YAxis 
                    tickFormatter={formatYAxis}
                    tick={{ fill: '#6B7280', fontSize: 14 }}
                    axisLine={{ stroke: '#E5E7EB' }}
                    domain={[minAmount - padding, maxAmount + padding]}
                    tickLine={false}
                />
                <Tooltip 
                    formatter={(value: number) => [`$${value.toLocaleString()}`]}
                    contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '6px',
                        padding: '8px'
                    }}
                    labelFormatter={(label) => `Ramadan ${label}`}
                />
                <Legend />
                <Line 
                    type="monotone" 
                    dataKey="amount2024" 
                    name="Ramadan 2024"
                    stroke="#2C633D"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                />
                <Line 
                    type="monotone" 
                    dataKey="amount2023" 
                    name="Ramadan 2023"
                    stroke="#4AA567"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                />
                <Line 
                    type="monotone" 
                    dataKey="amount2022" 
                    name="Ramadan 2022"
                    stroke="#8ECCA2"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
} 