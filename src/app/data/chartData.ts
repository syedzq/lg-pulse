export const allTimeData = [
    { year: '2022', amount: 85000 },
    { year: '2023', amount: 112500 },
    { year: '2024', amount: 128000 },
];

export const allTimeChartConfig = {
    minAmount: 85000,
    maxAmount: 128000,
    padding: 4300 // (128000 - 85000) * 0.1
};

export const monthlyData = [
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

export const ramadanData = [
    { day: "1", amount2024: 15000, amount2023: 12000, amount2022: 8000 },
    { day: "2", amount2024: 16500, amount2023: 13200, amount2022: 8800 },
    { day: "3", amount2024: 15750, amount2023: 12600, amount2022: 8400 },
    { day: "4", amount2024: 16000, amount2023: 12800, amount2022: 8500 },
    { day: "5", amount2024: 22500, amount2023: 18000, amount2022: 12000 }, // Friday
    { day: "6", amount2024: 21000, amount2023: 16800, amount2022: 11200 }, // Saturday
    { day: "7", amount2024: 15000, amount2023: 12000, amount2022: 8000 },
    { day: "8", amount2024: 16500, amount2023: 13200, amount2022: 8800 },
    { day: "9", amount2024: 15750, amount2023: 12600, amount2022: 8400 },
    { day: "10", amount2024: 16000, amount2023: 12800, amount2022: 8500 },
    { day: "11", amount2024: 22500, amount2023: 18000, amount2022: 12000 }, // Friday
    { day: "12", amount2024: 21000, amount2023: 16800, amount2022: 11200 }, // Saturday
    { day: "13", amount2024: 15000, amount2023: 12000, amount2022: 8000 },
    { day: "14", amount2024: 16500, amount2023: 13200, amount2022: 8800 },
    { day: "15", amount2024: 15750, amount2023: 12600, amount2022: 8400 },
    { day: "16", amount2024: 16000, amount2023: 12800, amount2022: 8500 },
    { day: "17", amount2024: 22500, amount2023: 18000, amount2022: 12000 }, // Friday
    { day: "18", amount2024: 21000, amount2023: 16800, amount2022: 11200 }, // Saturday
    { day: "19", amount2024: 15000, amount2023: 12000, amount2022: 8000 },
    { day: "20", amount2024: 16500, amount2023: 13200, amount2022: 8800 },
    { day: "21", amount2024: 31500, amount2023: 25200, amount2022: 16800 }, // Last 10 days start
    { day: "22", amount2024: 32000, amount2023: 25600, amount2022: 17000 },
    { day: "23", amount2024: 45000, amount2023: 36000, amount2022: 24000 }, // Friday
    { day: "24", amount2024: 42000, amount2023: 33600, amount2022: 22400 }, // Saturday
    { day: "25", amount2024: 31500, amount2023: 25200, amount2022: 16800 },
    { day: "26", amount2024: 33000, amount2023: 26400, amount2022: 17600 },
    { day: "27", amount2024: 45000, amount2023: 36000, amount2022: 24000 }, // Friday
    { day: "28", amount2024: 42000, amount2023: 33600, amount2022: 22400 }, // Saturday
    { day: "29", amount2024: 33000, amount2023: 26400, amount2022: 17600 },
    { day: "30", amount2024: 35000, amount2023: 28000, amount2022: 18600 }
];

export const ramadanChartConfig = {
    minAmount: 8000,  // Minimum from amount2022
    maxAmount: 45000, // Maximum from amount2024
    padding: 3700    // (45000 - 8000) * 0.1
}; 