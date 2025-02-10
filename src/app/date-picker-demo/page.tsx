'use client';

import { useState, useEffect } from 'react';
import { DatePicker } from '../components/DatePicker';
import { DateRange } from 'react-day-picker';
import { toast } from 'sonner';
import { ToasterWithBreakpoint } from '../components/ToasterWithBreakpoint';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { 
    format, 
    isWithinInterval, 
    parseISO, 
    eachDayOfInterval, 
    isBefore, 
    subDays,
    differenceInDays,
    startOfDay,
    endOfDay,
    addDays
} from 'date-fns';

interface DataPoint {
    date: string;
    value: number;
}

// Generate data from Jan 1, 2022 to today
const generateData = (): DataPoint[] => {
    const data: DataPoint[] = [];
    const startDate = new Date(2022, 0, 1); // Jan 1, 2022
    const today = new Date();
    
    const days = eachDayOfInterval({ start: startDate, end: today });
    
    days.forEach(date => {
        // Generate a somewhat realistic looking trend with some randomness
        const baseValue = 1000; // Base value
        const yearTrend = (date.getFullYear() - 2022) * 200; // Increase by 200 each year
        const monthSin = Math.sin(date.getMonth() * Math.PI / 6) * 300; // Monthly seasonality
        const randomness = Math.random() * 400 - 200; // Random fluctuation

        data.push({
            date: format(date, 'yyyy-MM-dd'),
            value: Math.floor(baseValue + yearTrend + monthSin + randomness)
        });
    });
    
    return data;
};

// Get default date range (last 7 days)
const getDefaultDateRange = (): DateRange => {
    const today = new Date();
    return {
        from: subDays(today, 6), // 6 days ago (to include today = 7 days total)
        to: today
    };
};

// Function to determine the interval size based on date range
const getIntervalSize = (from: Date, to: Date): number => {
    const daysDiff = differenceInDays(to, from);
    if (daysDiff <= 31) return 1; // Show daily data for up to a month
    if (daysDiff <= 90) return 3; // Show 3-day intervals for up to 3 months
    if (daysDiff <= 365) return 7; // Show weekly data for up to a year
    return 30; // Show monthly data for more than a year
};

// Function to aggregate data points
const aggregateData = (data: DataPoint[], from: Date, to: Date): DataPoint[] => {
    const intervalSize = getIntervalSize(from, to);
    if (intervalSize === 1) return data;

    const aggregated: DataPoint[] = [];
    let currentDate = startOfDay(from);
    const endDate = endOfDay(to);

    while (currentDate <= endDate) {
        const intervalEnd = endOfDay(addDays(currentDate, intervalSize - 1));
        const intervalPoints = data.filter(point => {
            const pointDate = parseISO(point.date);
            return isWithinInterval(pointDate, { start: currentDate, end: intervalEnd });
        });

        if (intervalPoints.length > 0) {
            const avgValue = intervalPoints.reduce((sum, point) => sum + point.value, 0) / intervalPoints.length;
            aggregated.push({
                date: format(currentDate, 'yyyy-MM-dd'),
                value: Math.round(avgValue)
            });
        }

        currentDate = addDays(currentDate, intervalSize);
    }

    return aggregated;
};

export default function DatePickerDemo() {
    const [dateRange, setDateRange] = useState<DateRange>(getDefaultDateRange());
    const [data, setData] = useState<DataPoint[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Generate data on client-side only
    useEffect(() => {
        setData(generateData());
        setIsLoading(false);
    }, []);

    const handleDateRangeChange = (newDateRange?: DateRange) => {
        if (!newDateRange?.from || !newDateRange?.to) {
            setDateRange(getDefaultDateRange());
            return;
        }

        // Check if the selected date range has data
        const hasData = data.some(point => {
            const pointDate = parseISO(point.date);
            if (newDateRange.from && newDateRange.to) {
                return isWithinInterval(pointDate, { 
                    start: newDateRange.from, 
                    end: newDateRange.to 
                });
            }
            return false;
        });

        if (!hasData) {
            toast('No data available for the selected date range');
            return;
        }

        setDateRange(newDateRange);
    };

    // Filter and aggregate data based on selected date range
    const filteredData = dateRange?.from && dateRange?.to && data.length > 0
        ? aggregateData(
            data.filter(point => {
                const pointDate = parseISO(point.date);
                return isWithinInterval(pointDate, { 
                    start: dateRange.from!, 
                    end: dateRange.to! 
                });
            }),
            dateRange.from,
            dateRange.to
        )
        : data;

    // Calculate total value for the selected date range
    const totalValue = filteredData.reduce((sum, point) => sum + point.value, 0);

    // Calculate Y-axis domain
    const yAxisMin = Math.min(...(filteredData.length > 0 ? filteredData.map(d => d.value) : [0]));
    const yAxisMax = Math.max(...(filteredData.length > 0 ? filteredData.map(d => d.value) : [0]));
    const yAxisPadding = (yAxisMax - yAxisMin) * 0.1; // Add 10% padding

    // Get the appropriate date format based on the interval size
    const getDateFormat = () => {
        if (!dateRange?.from || !dateRange?.to) return 'MMM d, yyyy';
        const intervalSize = getIntervalSize(dateRange.from, dateRange.to);
        if (intervalSize === 1) return 'MMM d';
        if (intervalSize <= 7) return 'MMM d';
        if (intervalSize <= 30) return 'MMM d';
        return 'MMM yyyy';
    };

    if (isLoading) {
        return (
            <div className="max-w-screen-lg mx-auto p-8">
                <h1 className="text-2xl font-bold mb-8">Date Picker Demo</h1>
                <div className="bg-white rounded-lg border border-neutral-200 p-6 mb-6 h-[500px] flex items-center justify-center">
                    <div className="animate-pulse text-neutral-600">Loading data...</div>
                </div>
            </div>
        );
    }

    const minDate = parseISO(data[0]?.date);
    const maxDate = parseISO(data[data.length - 1]?.date);

    return (
        <div className="max-w-screen-lg mx-auto p-8">
            <ToasterWithBreakpoint />
            <h1 className="text-2xl font-bold mb-8">Date Picker Demo</h1>
            
            <div className="bg-white rounded-lg border border-neutral-200 p-6 mb-6">
                <div className="flex flex-col gap-4">
                    <div className="flex items-baseline gap-3">
                        <div className="text-3xl font-bold">
                            ${totalValue.toLocaleString()}
                        </div>
                        <div className="text-neutral-600">
                            {dateRange?.from && dateRange?.to ? (
                                `${format(dateRange.from, 'MMM d')} - ${format(dateRange.to, 'MMM d, yyyy')}`
                            ) : 'All time'}
                        </div>
                    </div>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={filteredData}>
                                <XAxis 
                                    dataKey="date" 
                                    tick={{ fill: '#6B7280', fontSize: 14 }}
                                    axisLine={{ stroke: '#E5E7EB' }}
                                    tickLine={false}
                                    tickFormatter={(value) => format(parseISO(value), getDateFormat())}
                                    interval="preserveStartEnd"
                                />
                                <YAxis 
                                    tick={{ fill: '#6B7280', fontSize: 14 }}
                                    axisLine={{ stroke: '#E5E7EB' }}
                                    tickLine={false}
                                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                                    domain={[
                                        Math.floor(yAxisMin - yAxisPadding),
                                        Math.ceil(yAxisMax + yAxisPadding)
                                    ]}
                                />
                                <Tooltip 
                                    formatter={(value: number) => [`$${value.toLocaleString()}`]}
                                    labelFormatter={(label) => format(parseISO(label as string), 'MMM d, yyyy')}
                                    contentStyle={{ 
                                        backgroundColor: 'white',
                                        border: '1px solid #E5E7EB',
                                        borderRadius: '6px',
                                        padding: '8px'
                                    }}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="value" 
                                    stroke="#4AA567"
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <DatePicker
                    dateRange={dateRange}
                    onChange={handleDateRangeChange}
                    disabledDays={(day: Date) => isBefore(maxDate, day) || isBefore(day, minDate)}
                />
            </div>
        </div>
    );
} 