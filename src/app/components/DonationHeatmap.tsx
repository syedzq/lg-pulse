import { useMemo } from 'react';

const STATIC_HEATMAP_DATA = {
    hours: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    cells: [
        // Sunday
        [50, 50, 50, 100, 200, 300, 500, 300],
        // Monday
        [50, 50, 100, 200, 300, 300, 500, 300],
        // Tuesday
        [50, 50, 100, 200, 300, 300, 500, 300],
        // Wednesday
        [50, 50, 100, 200, 300, 300, 500, 300],
        // Thursday
        [50, 50, 100, 200, 300, 300, 500, 300],
        // Friday
        [50, 50, 100, 200, 300, 500, 500, 500],
        // Saturday
        [50, 50, 50, 100, 200, 300, 500, 300],
    ]
};

export function DonationHeatmap() {
    const data = useMemo(() => {
        const heatmapData = STATIC_HEATMAP_DATA.days.map((day, dayIndex) => {
            return STATIC_HEATMAP_DATA.hours.map((hour, hourIndex) => {
                return {
                    day: dayIndex,
                    hour: hourIndex,
                    brandLevel: STATIC_HEATMAP_DATA.cells[dayIndex][hourIndex]
                };
            });
        }).flat();

        return {
            hours: STATIC_HEATMAP_DATA.hours,
            days: STATIC_HEATMAP_DATA.days,
            data: heatmapData
        };
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