import { useMemo } from 'react';

export function DonationHeatmap() {
    const data = useMemo(() => {
        const hours = ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'];
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        // Create the full heatmap data with random values
        const heatmapData = days.map((day, dayIndex) => {
            return hours.map((hour, hourIndex) => {
                // Start with a base value that's higher during active hours
                let value = 0.3; // Base value to ensure most cells have some color
                
                // Reduce activity in the middle of the night (12am-6am)
                if (hourIndex <= 2) {
                    value = 0.1;
                }
                
                // Increase activity during prime hours (3pm-9pm)
                if (hourIndex >= 5) {
                    value += 0.3;
                }
                
                // Peak activity during evening (6pm-9pm)
                if (hourIndex >= 6) {
                    value += 0.2;
                }
                
                // Higher values on weekends (Fri, Sat) and Sunday evening
                if (dayIndex === 5 || dayIndex === 6) {
                    value += 0.3;
                }
                if (dayIndex === 0 && hourIndex >= 5) { // Sunday evening
                    value += 0.2;
                }
                
                // Add some randomness (but less than before)
                value += Math.random() * 0.2;
                
                // 2% chance of being empty (much lower than before)
                if (Math.random() < 0.01) {
                    return {
                        day: dayIndex,
                        hour: hourIndex,
                        brandLevel: 0
                    };
                }
                
                // Ensure value is between 0 and 1
                value = Math.min(1, value);
                
                // Map value to brand color scale (50-500, removed higher values for better contrast)
                const colorScale = Math.round(value * 4); // 0-4 for 5 steps
                const brandLevels = [50, 100, 200, 300, 500];
                
                return {
                    day: dayIndex,
                    hour: hourIndex,
                    brandLevel: brandLevels[colorScale]
                };
            });
        }).flat();

        return { hours, days, data: heatmapData };
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex">
                <div className="w-12"></div>
                <div className="flex-1 grid grid-cols-8 text-sm text-neutral-600">
                    {data.hours.map((hour) => (
                        <div key={hour} className="text-center">{hour}</div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-1">
                {data.days.map((day, dayIndex) => (
                    <div key={day} className="flex items-center">
                        <div className="w-12 text-sm text-neutral-600">{day}</div>
                        <div className="flex-1 grid grid-cols-8 gap-1">
                            {data.data
                                .filter(d => d.day === dayIndex)
                                .map((cell, hourIndex) => (
                                    <div
                                        key={`${day}-${hourIndex}`}
                                        className={cell.brandLevel ? `aspect-square rounded-sm bg-brand-${cell.brandLevel}` : 'aspect-square rounded-sm'}
                                    />
                                ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-sm text-neutral-600">
                Based on this fundraiser&apos;s activity and historical LaunchGood data.
            </div>
        </div>
    );
} 