"use client";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useState } from "react";
import worldData from "../data/countries.json";

interface DonorMapProps {
    data: {
        country: string;
        flag: string;
        donors: number;
        name: string;
        amountRaised?: number; // Optional amount for the Raised view
    }[];
    expanded?: boolean;
}

interface GeographyType {
    properties: {
        name: string;
        continent: string;
        iso_a3?: string;
        ISO_A3?: string;
        id?: string;
    };
    rsmKey: string;
}

// Map of country names to ISO codes
const countryToISO: { [key: string]: string } = {
    "United States of America": "USA",
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

type ViewMode = 'donors' | 'raised';

export function DonorMap({ data, expanded = false }: DonorMapProps) {
    const [viewMode, setViewMode] = useState<ViewMode>('donors');
    const [tooltipContent, setTooltipContent] = useState("");

    // Sort data based on view mode
    const sortedData = [...data].sort((a, b) => {
        if (viewMode === 'donors') {
            return b.donors - a.donors;
        }
        return (b.amountRaised || 0) - (a.amountRaised || 0);
    });

    const getColorRank = (countryData: typeof data[0] | null) => {
        if (!countryData) return -1;
        const index = sortedData.findIndex(d => d.country === countryData.country);
        if (index === -1) return -1;
        return Math.floor((index / sortedData.length) * 5);
    };

    const getColorByRank = (rank: number) => {
        if (rank === -1) return "#F5F5F5";
        const colors = ['#2C633D', '#3C8653', '#4AA567', '#6BBD85', '#8ECCA2'];
        return colors[rank] || colors[colors.length - 1];
    };

    const findCountryData = (geo: GeographyType) => {
        const countryName = geo.properties.name;
        const isoCode = countryToISO[countryName];
        
        if (isoCode) {
            return data.find(d => d.country === isoCode);
        }

        const possibleCodes = [
            geo.properties.iso_a3,
            geo.properties.ISO_A3,
            geo.properties.id
        ].filter(Boolean);

        for (const code of possibleCodes) {
            const match = data.find(d => d.country === code);
            if (match) return match;
        }

        return null;
    };

    return (
        <div>
            <div className="flex justify-start -mt-4 -mx-4 border-b border-neutral-200 mb-4">
                {[
                    { label: 'Donors', mode: 'donors' as const },
                    { label: 'Raised', mode: 'raised' as const }
                ].map((tab) => (
                    <button
                        key={tab.label}
                        onClick={() => setViewMode(tab.mode)}
                        className={`py-2 px-4 text-sm font-medium transition-colors ${
                            viewMode === tab.mode
                                ? 'text-neutral-900 dark:text-white border-b-2 border-neutral-900 dark:border-white -mb-px'
                                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border-b-2 border-transparent'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="relative">
                <div 
                    className="absolute bg-white border border-neutral-200 rounded-md px-2.5 py-1.5 text-sm pointer-events-none z-10 translate-x-[-50%] after:content-[''] after:absolute after:left-1/2 after:-bottom-2 after:-translate-x-1/2 after:border-[6px] after:border-transparent after:border-t-white before:content-[''] before:absolute before:left-1/2 before:-bottom-2.5 before:-translate-x-1/2 before:border-[6px] before:border-transparent before:border-t-neutral-200"
                    style={{
                        opacity: tooltipContent ? 1 : 0,
                        transform: `translate(-50%, ${tooltipContent ? '-45px' : '-35px'})`,
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
                                                if (countryData) {
                                                    const value = viewMode === 'donors' 
                                                        ? `${countryData.donors.toLocaleString()} donors`
                                                        : `$${(countryData.amountRaised || 0).toLocaleString()}`;
                                                    setTooltipContent(`${countryName}: ${value}`);
                                                } else {
                                                    setTooltipContent(countryName);
                                                }
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

            <hr className="border-neutral-200 mb-6" />
            <div className="flex flex-col divide-y divide-neutral-200">
                {sortedData
                    .slice(0, expanded ? sortedData.length : 5)
                    .map((country, index) => {
                        const colors = ['#2C633D', '#3C8653', '#4AA567', '#6BBD85', '#8ECCA2'];
                        const colorIndex = Math.min(
                            colors.length - 1,
                            Math.floor((index / (expanded ? sortedData.length : 5)) * colors.length)
                        );
                        return (
                            <div key={index} className="flex items-center gap-4 py-3">
                                <div 
                                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white"
                                    style={{ backgroundColor: colors[colorIndex] }}
                                >
                                    {index + 1}
                                </div>
                                <div className="flex-1 flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl">{country.flag}</span>
                                        <span className="font-bold">{country.name}</span>
                                    </div>
                                    <div className="text-neutral-600">
                                        {viewMode === 'donors' 
                                            ? `${country.donors.toLocaleString()} donors`
                                            : `$${(country.amountRaised || 0).toLocaleString()}`}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
} 