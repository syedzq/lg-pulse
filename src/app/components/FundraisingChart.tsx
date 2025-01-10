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
import { 
    allTimeData, 
    monthlyData, 
    ramadanData, 
    allTimeChartConfig, 
    ramadanChartConfig 
} from '../data/chartData';

const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

interface FundraisingChartProps {
    mode: 'all-time' | 'ramadan-comparison' | 'monthly';
}

export function FundraisingChart({ mode }: FundraisingChartProps) {
    const formatYAxis = (value: number) => `$${(value / 1000).toFixed(1)}K`;

    if (mode === 'monthly') {
        return (
            <ResponsiveContainer width="100%" height={300}>
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
                        formatter={(value: number) => [`$${formatNumber(value)}`]}
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
        return (
            <ResponsiveContainer width="100%" height={300}>
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
                        domain={[
                            allTimeChartConfig.minAmount - allTimeChartConfig.padding,
                            allTimeChartConfig.maxAmount + allTimeChartConfig.padding
                        ]}
                        tickLine={false}
                    />
                    <Tooltip 
                        formatter={(value: number) => [`$${formatNumber(value)}`]}
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

    return (
        <ResponsiveContainer width="100%" height={300}>
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
                    domain={[
                        ramadanChartConfig.minAmount - ramadanChartConfig.padding,
                        ramadanChartConfig.maxAmount + ramadanChartConfig.padding
                    ]}
                    tickLine={false}
                />
                <Tooltip 
                    formatter={(value: number) => [`$${formatNumber(value)}`]}
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
