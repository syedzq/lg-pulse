"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

const allTimeData = [
    { date: 'Dec 2021', amount: 72000 },
    { date: 'Jun 2022', amount: 80000 },
    { date: 'Dec 2022', amount: 90000 },
    { date: 'Jun 2023', amount: 105000 },
    { date: 'Dec 2023', amount: 120000 },
    { date: 'Jun 2024', amount: 128000 },
];

const ramadanData = Array.from({ length: 30 }, (_, i) => ({
    day: `${i + 1}`,
    amount2024: Math.round(5000 + Math.random() * 3000 + (i * 800)), // Increasing trend
    amount2023: Math.round(4000 + Math.random() * 2000 + (i * 600)), // Lower but similar pattern
}));

interface FundraisingChartProps {
    mode?: 'all-time' | 'ramadan-comparison';
}

export function FundraisingChart({ mode = 'all-time' }: FundraisingChartProps) {
    const formatYAxis = (value: number) => `$${(value / 1000).toFixed(1)}K`;

    if (mode === 'all-time') {
        const minAmount = Math.min(...allTimeData.map(d => d.amount));
        const maxAmount = Math.max(...allTimeData.map(d => d.amount));
        const padding = (maxAmount - minAmount) * 0.1;

        return (
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={allTimeData}>
                    <XAxis 
                        dataKey="date" 
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
                    />
                    <Line 
                        type="monotone" 
                        dataKey="amount" 
                        stroke="#4AA567"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6, fill: '#3C8653' }}
                    />
                </LineChart>
            </ResponsiveContainer>
        );
    }

    // Ramadan comparison mode
    const minAmount = Math.min(
        ...ramadanData.map(d => Math.min(d.amount2024, d.amount2023))
    );
    const maxAmount = Math.max(
        ...ramadanData.map(d => Math.max(d.amount2024, d.amount2023))
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
                    name="Ramadan 2024"
                    dataKey="amount2024" 
                    stroke="#4AA567"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6, fill: '#3C8653' }}
                />
                <Line 
                    type="monotone" 
                    name="Ramadan 2023"
                    dataKey="amount2023" 
                    stroke="#9333EA"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6, fill: '#7E22CE' }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
} 