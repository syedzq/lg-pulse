"use client"

import { Button } from "../../components/Button"
import { ChevronRightIcon, CheckBadgeIcon } from "@heroicons/react/24/solid"
import { BorderlessDataCard } from "../../components/BorderlessDataCard"
import { FundraisingChart } from "../../components/FundraisingChart"
import { DonorMap } from "../../components/DonorMap"
import { SourcesPieChart } from "../../components/SourcesPieChart"
import { DonationHeatmap } from "../../components/DonationHeatmap"
import { useState } from "react";

// Import the same data from the original page
const topDays = [
    { date: "Friday, April 5, 2024", hijri: "Ramadan 27, 1445", amount: 28450.39 },
    { date: "Friday, April 6, 2024", hijri: "Ramadan 28, 1445", amount: 25320.82 },
    { date: "Friday, April 7, 2024", hijri: "Ramadan 29, 1445", amount: 22180.45 },
    { date: "Thursday, April 4, 2024", hijri: "Ramadan 26, 1445", amount: 18940.23 },
    { date: "Wednesday, April 3, 2024", hijri: "Ramadan 25, 1445", amount: 17650.78 }
];

const campaigns = [
    { name: "Bring hope to those in need w/Maryam Malik", url: "https://www.launchgood.com/campaign/bring_hope#!/" },
    { name: "Palestine Children's Relief Fund", url: "https://www.launchgood.com/campaign/palestine_childrens_relief_fund#!/" },
    { name: "Global Food Security Initiative", url: "https://www.launchgood.com/campaign/global_food_security_initiative#!/" },
    { name: "Support for Orphans Worldwide", url: "https://www.launchgood.com/campaign/support_for_orphans_worldwide#!/" },
    { name: "Clean Water Projects in Africa", url: "https://www.launchgood.com/campaign/clean_water_projects_africa#!/" }
];

const topDonations = [
    { amount: 75000.00, location: "Elizabeth, NJ, United States", timeAgo: "2 days ago", name: "Mohammad Khan", campaign: campaigns[0] },
    { amount: 50000.00, location: "Plano, TX, United States", timeAgo: "10 hours ago", name: "Sarah Ahmed", campaign: campaigns[1] },
    { amount: 10403.38, location: "London, United Kingdom", timeAgo: "13 days ago", name: "Yusuf Ali", campaign: campaigns[2] },
    { amount: 10404.39, location: "London, United Kingdom", timeAgo: "4 hours ago", campaign: campaigns[3] },
    { amount: 9338.29, location: "Doha, Qatar", timeAgo: "1 hour ago", campaign: campaigns[4] }
];

const topSources = [
    { name: "LaunchGood / Ramadan Challenge", amount: 218432.83 },
    { name: "Custom / HelpBuildOurIslamicCenter", amount: 104433.21 },
    { name: "LaunchGood / User Shares", amount: 13475.32 },
    { name: "LaunchGood Ads / Newsletter", amount: 33475.32 }
];

const topCountries = [
    { country: "USA", flag: "🇺🇸", donors: 1410, name: "United States of America", amountRaised: 450000.00 },
    { country: "GBR", flag: "🇬🇧", donors: 201, name: "United Kingdom", amountRaised: 120000.00 },
    { country: "CAN", flag: "🇨🇦", donors: 167, name: "Canada", amountRaised: 95000.00 },
    { country: "TUR", flag: "🇹🇷", donors: 143, name: "Turkey", amountRaised: 45000.00 },
    { country: "SAU", flag: "🇸🇦", donors: 145, name: "Saudi Arabia", amountRaised: 85000.00 }
];

export default function InfluencerCardlessPage() {
    const [chartMode, setChartMode] = useState<'all-time' | 'ramadan-comparison' | 'monthly'>('all-time');

    const renderDaysList = (limit: number) => (
        <div className="flex flex-col divide-y divide-neutral-200">
            {topDays.slice(0, limit).map((day, index) => (
                <div key={index} className="flex items-center gap-4 py-3">
                    <div className="w-8 h-8 rounded-full text-neutral-600 border border-neutral-200 flex items-center justify-center text-sm">
                        {index + 1}
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="font-bold">{day.date}</div>
                                <div className="text-sm text-neutral-600">{day.hijri}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-neutral-600">${day.amount.toLocaleString()}</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="max-w-screen-lg mx-auto">
            {/* Profile section */}
            <div className="flex flex-col sm:flex-row gap-6 px-4 sm:items-center mb-8">
                <section className="flex flex-col gap-6 sm:w-1/2">
                    <div className="flex flex-row gap-4 justify-start items-center">
                        <img className="w-20 h-20 sm:w-24 sm:h-24 rounded-full" src="/influencer/maryam.png" alt="Maryam Malik" />
                        <div className="flex-1 gap-1">
                            <div className="flex items-center gap-2 mb-4">
                                <h1 className="text-xl sm:text-2xl font-bold">Maryam Malik</h1>
                                <CheckBadgeIcon className="w-6 h-6 text-brand-500" />
                            </div>
                            <div className="flex flex-row gap-6">
                                <div className="flex flex-col">
                                    <p className="font-bold">$2.1M</p>
                                    <p className="text-sm text-neutral-600">raised</p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold">281K</p>
                                    <p className="text-sm text-neutral-600">donors</p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold">3</p>
                                    <p className="text-sm text-neutral-600">fundraisers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Live fundraisers section */}
                <section className="flex flex-col gap-1 sm:w-1/2">
                    <div className="flex flex-row justify-between items-center">
                        <h3 className="text-lg font-bold">Your live fundraisers</h3>
                        <Button variant="tertiary" className="font-normal text-neutral-600">
                            See all
                            <ChevronRightIcon className="w-4 h-4" />
                        </Button>
                    </div>
                    <div className="flex flex-row gap-4 justify-start items-center border border-neutral-200 rounded-lg p-4 shadow-md hover:bg-neutral-50 transition-colors hover:cursor-pointer">
                        <img className="w-20 h-16 rounded-lg" src="/campaign.png" alt="Campaign"/>
                        <div className="flex-col justify-center items-start gap-2">
                            <div className="flex-col justify-center items-start flex">
                                <div className="self-stretch text-neutral-900 text-base font-semibold leading-tight">Bring hope to those in need w/Maryam Malik</div>
                                <div className="justify-start items-start gap-2 inline-flex">
                                    <div className="text-neutral-600 text-sm font-normal leading-tight">with </div>
                                    <div className="justify-start items-center gap-1 flex">
                                        <img className="w-5 h-5 rounded-full border border-neutral-200" src="influencer/charity.png" alt="Charity" />
                                        <div className="text-neutral-600 text-sm font-normal">The Good Charity</div>
                                    </div>
                                </div>
                            </div>
                            <div className="justify-start items-center gap-1 inline-flex">
                                <div className="text-center text-brand-500 text-base font-bold">$281,372</div>
                                <div className="justify-start items-center gap-2.5 flex">
                                    <div className="text-center text-neutral-600 text-sm font-normal">raised of $300K goal</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <hr className="border-neutral-200 mb-8" />

            {/* Insights section */}
            <div className="px-4">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold">Your insights</h2>
                        <p className="text-neutral-600">Across all your fundraisers</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 sm:gap-x-16 gap-y-4">
                    {/* First row */}
                    <BorderlessDataCard title="Total funds raised" expandable showHeaderBorder={false}>
                        <div className="space-y-4">
                            <div className="flex justify-start -mt-4 -mx-4 border-b border-neutral-200">
                                {[
                                    { label: 'By year', mode: 'all-time' as const },
                                    { label: 'By month', mode: 'monthly' as const },
                                    { label: 'Ramadan', mode: 'ramadan-comparison' as const }
                                ].map((tab) => (
                                    <button
                                        key={tab.label}
                                        onClick={() => setChartMode(tab.mode)}
                                        className={`py-2 px-4 text-sm font-medium transition-colors ${
                                            chartMode === tab.mode
                                                ? 'text-neutral-900 dark:text-white border-b-2 border-neutral-900 dark:border-white -mb-px'
                                                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border-b-2 border-transparent'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                            <div className="h-[300px]">
                                <FundraisingChart mode={chartMode} />
                            </div>
                        </div>
                    </BorderlessDataCard>

                    <BorderlessDataCard title="Top countries" expandable showHeaderBorder={false}>
                        {({ expanded }) => (
                            <div className="relative">
                                <div>
                                    <DonorMap data={topCountries} expanded={expanded} />
                                </div>
                            </div>
                        )}
                    </BorderlessDataCard>

                    <hr className="col-span-1 md:col-span-2 border-neutral-200 my-4" />

                    {/* Second row */}
                    <BorderlessDataCard title="Top fundraising days" expandable>
                        {({ expanded }) => renderDaysList(expanded ? 25 : 5)}
                    </BorderlessDataCard>

                    <BorderlessDataCard title="Top donated times">
                        <DonationHeatmap />
                    </BorderlessDataCard>

                    <hr className="col-span-1 md:col-span-2 border-neutral-200 my-4" />

                    {/* Third row */}
                    <BorderlessDataCard title="Top donations">
                        <div className="flex flex-col divide-y divide-neutral-200">
                            {topDonations.map((donation, index) => (
                                <div key={index} className="flex items-center gap-4 py-3">
                                    <div className="w-8 h-8 rounded-full text-neutral-600 border border-neutral-200 flex items-center justify-center text-sm">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-bold">
                                            ${donation.amount.toLocaleString()}
                                            {donation.name ? <span className="font-normal text-neutral-600"> · {donation.name}</span> : <span className="font-normal text-neutral-600"> · Anonymous</span>}
                                        </div>
                                        <div className="text-sm text-neutral-600">
                                            {donation.timeAgo} · {donation.location}
                                        </div>
                                    </div>
                                    <a 
                                        href={donation.campaign.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 transition-colors"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.5 11.5L11.5 4.5M11.5 4.5H6.5M11.5 4.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </BorderlessDataCard>

                    <BorderlessDataCard title="Top sources" expandable>
                        <div className="flex flex-col gap-6">
                            <SourcesPieChart data={topSources} />
                            <div className="flex flex-col divide-y divide-neutral-200">
                                {topSources.map((source, index) => (
                                    <div key={index} className="flex items-center gap-4 py-3">
                                        <div 
                                            className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white"
                                            style={{ 
                                                backgroundColor: ['#2C633D', '#3C8653', '#4AA567', '#6BBD85', '#8ECCA2'][index] 
                                            }}
                                        >
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-bold">{source.name}</div>
                                            <div className="text-sm text-neutral-600">
                                                ${source.amount.toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </BorderlessDataCard>

                    <hr className="col-span-1 md:col-span-2 border-neutral-200 my-4" />

                    {/* Fourth row */}
                    <BorderlessDataCard title="Donations summary" className="md:col-span-2">
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <div className="text-neutral-600">Average donation amount</div>
                                <div className="font-bold">$19.74</div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="text-neutral-600">Most common donation amount</div>
                                <div className="font-bold">$1.00</div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="text-neutral-600">Repeat donors (2+ donations)</div>
                                <div className="font-bold">2,458</div>
                            </div>
                        </div>
                    </BorderlessDataCard>
                </div>
            </div>
        </div>
    )
} 