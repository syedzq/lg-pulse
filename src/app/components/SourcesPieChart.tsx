"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface SourcesPieChartProps {
    data: {
        name: string;
        amount: number;
    }[];
}

export function SourcesPieChart({ data }: SourcesPieChartProps) {
    const COLORS = ['#2C633D', '#3C8653', '#4AA567', '#6BBD85', '#8ECCA2'];

    return (
        <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="amount"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#4AA567"
>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip 
                        formatter={(value: number) => `$${value.toLocaleString()}`}
                        contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #E5E7EB',
                            borderRadius: '6px',
                            padding: '8px'
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
} 