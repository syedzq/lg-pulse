"use client";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useState } from "react";
import worldData from "../data/countries.json";

interface DonorMapProps {
    data: {
        country: string;
        donors: number;
        name: string;
    }[];
}

// Map of country names to ISO codes
const countryToISO: { [key: string]: string } = {
    "United States": "USA",
    "United Kingdom": "GBR",
    "Canada": "CAN",
    "Turkey": "TUR",
    "Saudi Arabia": "SAU",
    "Pakistan": "PAK",
    "Egypt": "EGY",
    "India": "IND",
    "Australia": "AUS",
    "Malaysia": "MYS",
    "Bangladesh": "BGD",
    "UAE": "ARE",
    "Qatar": "QAT",
    "Nigeria": "NGA",
    "Kuwait": "KWT",
    "Germany": "DEU",
    "Kenya": "KEN",
    "Morocco": "MAR",
    "France": "FRA",
    "Bahrain": "BHR",
    "Oman": "OMN",
    "Algeria": "DZA",
    "Indonesia": "IDN",
    "Tunisia": "TUN",
    "New Zealand": "NZL",
    "Singapore": "SGP",
    "Netherlands": "NLD",
    "Brunei": "BRN",
    "South Africa": "ZAF"
};

export function DonorMap({ data }: DonorMapProps) {
    const [tooltipContent, setTooltipContent] = useState("");

    // Sort data by number of donors to create color ranks
    const sortedData = [...data].sort((a, b) => b.donors - a.donors);

    const getColorRank = (countryData: { country: string; donors: number; name: string } | null) => {
        if (!countryData) return -1;
        const index = sortedData.findIndex(d => d.country === countryData.country);
        if (index === -1) return -1;
        return Math.floor((index / sortedData.length) * 5); // 5 color levels
    };

    const getColorByRank = (rank: number) => {
        if (rank === -1) return "#F5F5F5"; // Default color for countries with no data
        const colors = ['#2C633D', '#3C8653', '#4AA567', '#6BBD85', '#8ECCA2'];
        return colors[rank] || colors[colors.length - 1];
    };

    const findCountryData = (geo: any) => {
        const countryName = geo.properties.name;
        const isoCode = countryToISO[countryName];
        
        if (isoCode) {
            return data.find(d => d.country === isoCode);
        }

        // Try direct ISO code matching as fallback
        const possibleCodes = [
            geo.properties.iso_a3,
            geo.properties.ISO_A3,
            geo.id
        ].filter(Boolean);

        for (const code of possibleCodes) {
            const match = data.find(d => d.country === code);
            if (match) return match;
        }

        return null;
    };

    return (
        <div className="relative h-[300px] sm:h-fit w-full">
            <div 
                className="absolute bg-white border border-neutral-200 rounded-md px-2 py-1 text-sm pointer-events-none z-10"
                style={{
                    opacity: tooltipContent ? 1 : 0,
                    transform: `translate(${tooltipContent ? '0, -25px' : '0, 0'})`,
                    transition: 'all 0.2s ease-in-out',
                    left: '50%',
                    top: '50%'
                }}
            >
                {tooltipContent}
            </div>
            <ComposableMap
                projectionConfig={{
                    rotate: [-10, 0, 0],
                    scale: 147
                }}
                width={800}
                height={400}
            >
                <Geographies geography={worldData}>
                    {({ geographies }) =>
                        geographies
                            .filter(geo => geo.properties.continent !== "Antarctica")
                            .map(geo => {
                                const countryData = findCountryData(geo) ?? null;
                                const rank = getColorRank(countryData);

                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill={getColorByRank(rank)}
                                        stroke="#FFFFFF"
                                        strokeWidth={0.5}
                                        style={{
                                            default: { outline: "none" },
                                            hover: { outline: "none", fill: getColorByRank(rank === -1 ? -1 : Math.max(0, rank - 1)) },
                                            pressed: { outline: "none" }
                                        }}
                                        onMouseEnter={() => {
                                            const countryName = countryData?.name || geo.properties.name;
                                            const donors = countryData?.donors || 0;
                                            setTooltipContent(`${countryName}: ${donors.toLocaleString()} donors`);
                                        }}
                                        onMouseLeave={() => {
                                            setTooltipContent("");
                                        }}
                                    />
                                );
                            })
                    }
                </Geographies>
            </ComposableMap>
        </div>
    );
} 