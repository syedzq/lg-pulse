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
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

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

// Fundraiser data
const fundraisers = [
    {
        id: 1,
        title: 'Palestine in Pain: Urgent Support Needed',
        amount: '$1.3M',
        target: '$1,474,187 CAD',
        image: '/palestine.jpg',
        progress: 85
    },
    {
        id: 2,
        title: 'Nile Legacy Fundraiser for Sudan',
        amount: '$2.8K',
        target: '$22,113 CAD',
        image: '/sudan.jpg',
        progress: 12
    },
    {
        id: 3,
        title: 'Afghanistan Shaken: Ummah Alert',
        amount: '$44.7K',
        target: '$55,2830 CAD',
        image: '/afghanistan.jpg',
        progress: 80
    },
    {
        id: 4,
        title: 'Lebanon Qurbani Trip 2023 (Sheikh Edition)',
        amount: '$515.3K CAD',
        target: '11 fundraisers',
        image: '/lebanon.jpg',
        progress: 95
    }
];

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
            <div className="flex h-screen">
                <div className="bg-white rounded-lg border border-neutral-200 p-6 mb-6 h-[500px] flex items-center justify-center">
                    <div className="animate-pulse text-neutral-600">Loading data...</div>
                </div>
            </div>
        );
    }

    const minDate = parseISO(data[0]?.date);
    const maxDate = parseISO(data[data.length - 1]?.date);

    return (
        <div className="max-w-[1440px] mx-auto px-24 min-h-screen">
            <ToasterWithBreakpoint />
            
            <div className="flex gap-6">
                {/* Left Sidebar */}
                <div className="w-[280px] flex flex-col gap-4">
                    <button className="w-full py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                        START A CAMPAIGN
                    </button>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                            <div className="font-medium text-sm">The Good Charity&apos;s Business A...</div>
                            <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                        </div>
                        <div className="text-xs text-gray-500 mt-1">#47302 · US · USD</div>
                    </div>
                    
                    <nav>
                        <ul className="flex flex-col gap-1">
                            <li>
                                <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-gray-100 text-gray-900">
                                    <svg className="mr-3 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    Dashboard
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50">
                                    <svg className="mr-3 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    Fundraisers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50">
                                    <svg className="mr-3 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Communities
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50">
                                    <svg className="mr-3 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Recurring
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50">
                                    <svg className="mr-3 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Donations
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50">
                                    <svg className="mr-3 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Payouts
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50">
                                    <svg className="mr-3 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Reports
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <div className="text-sm text-gray-500">Thursday, November 16, 2023 · Jumada al-Awwal 1, 1445</div>
                            <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                <span className="text-xs font-medium text-green-800">LG</span>
                            </div>
                            <button className="text-gray-500">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-neutral-200 p-6 mb-6">
                        <div className="flex justify-between items-baseline gap-3">
                            <div className="text-3xl font-bold">
                                ${totalValue.toLocaleString()}
                            </div>
                            <div className="text-neutral-600">
                                {dateRange?.from && dateRange?.to ? (
                                    `${format(dateRange.from, 'MMM d')} - ${format(dateRange.to, 'MMM d, yyyy')}`
                                ) : 'All time'}
                            </div>
                            <div className="relative">
                                <DatePicker
                                    dateRange={dateRange}
                                    onChange={handleDateRangeChange}
                                    disabledDays={(day: Date) => isBefore(maxDate, day) || isBefore(day, minDate)}
                                />
                            </div>
                        </div>
                        <div className="text-sm text-gray-500">Gross funds raised · November 9 to 16 (EDT)</div>
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

                    <div className="flex justify-between items-center mb-4">
                        <div className="flex space-x-2">
                            <button className="px-4 py-2 text-sm font-medium rounded-full bg-gray-100 text-gray-900">
                                Today
                            </button>
                            <button className="px-4 py-2 text-sm font-medium rounded-full bg-gray-800 text-white">
                                Last 7 days
                            </button>
                            <button className="px-4 py-2 text-sm font-medium rounded-full bg-gray-100 text-gray-900">
                                Last 30 days
                            </button>
                        </div>
                        <div className="relative">
                            <DatePicker
                                dateRange={dateRange}
                                onChange={handleDateRangeChange}
                                disabledDays={(day: Date) => isBefore(maxDate, day) || isBefore(day, minDate)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold text-gray-900">Live fundraisers</h2>
                                <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center">
                                    See all
                                    <ChevronRightIcon className="h-4 w-4 ml-1" />
                                </a>
                            </div>
                            <div className="space-y-4">
                                {fundraisers.slice(0, 3).map((fundraiser) => (
                                    <div key={fundraiser.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                        <div className="flex">
                                            <div className="w-20 h-20 bg-gray-200 flex-shrink-0">
                                                {/* Placeholder for image */}
                                                <div className="w-full h-full bg-gray-300"></div>
                                            </div>
                                            <div className="p-3 flex-1">
                                                <h3 className="text-sm font-medium text-gray-900 mb-1 truncate">{fundraiser.title}</h3>
                                                <div className="flex justify-between items-center mb-1">
                                                    <div className="text-sm font-semibold text-gray-900">{fundraiser.amount}</div>
                                                    <div className="text-xs text-gray-500">raised of {fundraiser.target}</div>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                    <div 
                                                        className="bg-green-600 h-1.5 rounded-full" 
                                                        style={{ width: `${fundraiser.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold text-gray-900">Communities</h2>
                                <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center">
                                    See all
                                    <ChevronRightIcon className="h-4 w-4 ml-1" />
                                </a>
                            </div>
                            <div className="space-y-4">
                                {fundraisers.slice(0, 3).map((fundraiser) => (
                                    <div key={fundraiser.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                        <div className="flex">
                                            <div className="w-20 h-20 bg-gray-200 flex-shrink-0">
                                                {/* Placeholder for image */}
                                                <div className="w-full h-full bg-gray-300"></div>
                                            </div>
                                            <div className="p-3 flex-1">
                                                <h3 className="text-sm font-medium text-gray-900 mb-1 truncate">{fundraiser.title}</h3>
                                                <div className="flex justify-between items-center mb-1">
                                                    <div className="text-sm font-semibold text-gray-900">{fundraiser.amount}</div>
                                                    <div className="text-xs text-gray-500">raised by {fundraiser.target}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Gross raised</h3>
                            <div className="flex items-center justify-between">
                                <div className="text-2xl font-bold text-gray-900">${(totalValue * 0.95).toLocaleString()}</div>
                                <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Net raised</h3>
                            <div className="flex items-center justify-between">
                                <div className="text-2xl font-bold text-gray-900">${(totalValue * 0.9).toLocaleString()}</div>
                                <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Paid to date</h3>
                            <div className="flex items-center justify-between">
                                <div className="text-2xl font-bold text-gray-900">${(totalValue * 0.85).toLocaleString()}</div>
                                <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 