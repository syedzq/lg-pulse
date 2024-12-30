"use client"

import Link from "next/link"
import { Button } from "../components/Button"
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import { DataCard } from "../components/DataCard"
import { FundraisingChart } from "../components/FundraisingChart"
import { DonorMap } from "../components/DonorMap"
import { SourcesPieChart } from "../components/SourcesPieChart"
import { useState } from "react";

const topDays = [
    { date: "Friday, April 5, 2024", hijri: "Ramadan 27, 1445", amount: 28450.39 },
    { date: "Friday, April 6, 2024", hijri: "Ramadan 28, 1445", amount: 25320.82 },
    { date: "Friday, April 7, 2024", hijri: "Ramadan 29, 1445", amount: 22180.45 },
    { date: "Thursday, April 4, 2024", hijri: "Ramadan 26, 1445", amount: 18940.23 },
    { date: "Wednesday, April 3, 2024", hijri: "Ramadan 25, 1445", amount: 17650.78 },
    { date: "Tuesday, April 2, 2024", hijri: "Ramadan 24, 1445", amount: 16890.45 },
    { date: "Monday, April 1, 2024", hijri: "Ramadan 23, 1445", amount: 15780.32 },
    { date: "Sunday, March 31, 2024", hijri: "Ramadan 22, 1445", amount: 14950.67 },
    { date: "Saturday, March 30, 2024", hijri: "Ramadan 21, 1445", amount: 13875.91 },
    { date: "Friday, March 29, 2024", hijri: "Ramadan 20, 1445", amount: 12980.45 },
    { date: "Thursday, March 28, 2024", hijri: "Ramadan 19, 1445", amount: 12450.78 },
    { date: "Wednesday, March 27, 2024", hijri: "Ramadan 18, 1445", amount: 11890.34 },
    { date: "Tuesday, March 26, 2024", hijri: "Ramadan 17, 1445", amount: 11340.56 },
    { date: "Monday, March 25, 2024", hijri: "Ramadan 16, 1445", amount: 10980.23 },
    { date: "Sunday, March 24, 2024", hijri: "Ramadan 15, 1445", amount: 10450.67 },
    { date: "Saturday, March 23, 2024", hijri: "Ramadan 14, 1445", amount: 9870.45 },
    { date: "Friday, March 22, 2024", hijri: "Ramadan 13, 1445", amount: 9340.89 },
    { date: "Thursday, March 21, 2024", hijri: "Ramadan 12, 1445", amount: 8950.34 },
    { date: "Wednesday, March 20, 2024", hijri: "Ramadan 11, 1445", amount: 8540.78 },
    { date: "Tuesday, March 19, 2024", hijri: "Ramadan 10, 1445", amount: 8120.45 },
    { date: "Monday, March 18, 2024", hijri: "Ramadan 9, 1445", amount: 7890.23 },
    { date: "Sunday, March 17, 2024", hijri: "Ramadan 8, 1445", amount: 7450.67 },
    { date: "Saturday, March 16, 2024", hijri: "Ramadan 7, 1445", amount: 7120.34 },
    { date: "Friday, March 15, 2024", hijri: "Ramadan 6, 1445", amount: 6890.56 },
    { date: "Thursday, March 14, 2024", hijri: "Ramadan 5, 1445", amount: 6540.23 }
];

const topDonations = [
    { amount: 75000.00, location: "Elizabeth, NJ, United States", timeAgo: "2 days ago" },
    { amount: 50000.00, location: "Plano, TX, United States", timeAgo: "10 hours ago" },
    { amount: 10403.38, location: "London, United Kingdom", timeAgo: "13 days ago" },
    { amount: 10404.39, location: "London, United Kingdom", timeAgo: "4 hours ago" },
    { amount: 9338.29, location: "Doha, Qatar", timeAgo: "1 hour ago" },
];

const topCountries = [
    { country: "USA", flag: "🇺🇸", donors: 1410, name: "United States" },
    { country: "GBR", flag: "🇬🇧", donors: 201, name: "United Kingdom" },
    { country: "CAN", flag: "🇨🇦", donors: 167, name: "Canada" },
    { country: "TUR", flag: "🇹🇷", donors: 143, name: "Turkey" },
    { country: "SAU", flag: "🇸🇦", donors: 145, name: "Saudi Arabia" },
    { country: "PAK", flag: "🇵🇰", donors: 156, name: "Pakistan" },
    { country: "EGY", flag: "🇪🇬", donors: 112, name: "Egypt" },
    { country: "IND", flag: "🇮🇳", donors: 89, name: "India" },
    { country: "AUS", flag: "🇦🇺", donors: 89, name: "Australia" },
    { country: "MYS", flag: "🇲🇾", donors: 89, name: "Malaysia" },
    { country: "BGD", flag: "🇧🇩", donors: 78, name: "Bangladesh" },
    { country: "ARE", flag: "🇦🇪", donors: 76, name: "UAE" },
    { country: "QAT", flag: "🇶🇦", donors: 67, name: "Qatar" },
    { country: "NGA", flag: "🇳🇬", donors: 67, name: "Nigeria" },
    { country: "KWT", flag: "🇰🇼", donors: 58, name: "Kuwait" },
    { country: "DEU", flag: "🇩🇪", donors: 56, name: "Germany" },
    { country: "KEN", flag: "🇰🇪", donors: 45, name: "Kenya" },
    { country: "MAR", flag: "🇲🇦", donors: 45, name: "Morocco" },
    { country: "FRA", flag: "🇫🇷", donors: 45, name: "France" },
    { country: "BHR", flag: "🇧🇭", donors: 42, name: "Bahrain" },
    { country: "OMN", flag: "🇴🇲", donors: 35, name: "Oman" },
    { country: "DZA", flag: "🇩🇿", donors: 34, name: "Algeria" },
    { country: "IDN", flag: "🇮🇩", donors: 31, name: "Indonesia" },
    { country: "TUN", flag: "🇹🇳", donors: 28, name: "Tunisia" },
    { country: "NZL", flag: "🇳🇿", donors: 25, name: "New Zealand" },
    { country: "SGP", flag: "🇸🇬", donors: 24, name: "Singapore" },
    { country: "NLD", flag: "🇳🇱", donors: 23, name: "Netherlands" },
    { country: "BRN", flag: "🇧🇳", donors: 18, name: "Brunei" },
    { country: "ZAF", flag: "🇿🇦", donors: 98, name: "South Africa" }
];

const topSources = [
    { name: "LaunchGood / Ramadan Challenge", amount: 218432.83 },
    { name: "Custom / HelpBuildOurIslamicCenter", amount: 104433.21 },
    { name: "LaunchGood / User Shares", amount: 13475.32 },
    { name: "LaunchGood Ads / Newsletter", amount: 33475.32 },
];

export default function InfluencerPage() {
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
            <nav className="h-16 sm:h-24 flex flex-row sm:justify-center items-center px-4">
                <Link href="/">
                    <svg width="136" height="18" viewBox="0 0 136 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_9240_13904)">
                            <path d="M87.2727 0.977539C90.0634 0.977539 93.3801 2.07082 93.3801 4.03786V5.82449C93.3801 6.02012 93.2204 6.17878 93.0241 6.17878H91.1231C90.9264 6.17878 90.7667 6.02012 90.7667 5.82449V5.04203C90.7667 3.97048 89.0755 3.42492 87.406 3.42492C84.0893 3.42492 82.0222 5.52238 82.0222 8.82394C82.0222 12.1451 84.087 14.5729 87.5371 14.5729C88.7893 14.5729 91.1185 14.2447 91.1185 12.9558V11.2952H88.6407C88.444 11.2952 88.2847 11.1366 88.2847 10.941V9.5086C88.2847 9.313 88.444 9.15435 88.6407 9.15435H93.7342V13.8318C93.7342 16.1922 89.5583 17.0225 87.2532 17.0225C82.4634 17.0225 79.0352 13.5688 79.0352 8.9348C79.0329 4.32259 82.4176 0.977539 87.2727 0.977539Z" fill="#1D1F24" />
                            <path d="M0.943951 3.66613C1.21053 3.66613 1.42685 3.88131 1.42685 4.14648V15.2727C1.42685 16.0943 2.09548 16.7594 2.92144 16.7594H9.79784C10.6238 16.7594 11.2924 16.0943 11.2924 15.2727V13.2666C11.2924 13.071 11.1329 12.9123 10.9363 12.9123H9.03525C8.83862 12.9123 8.67909 13.071 8.67909 13.2666V13.8513C8.67909 14.1164 8.46279 14.3316 8.19622 14.3316H4.78968C4.52311 14.3316 4.30677 14.1164 4.30677 13.8513V2.72717C4.30677 1.69909 3.8676 1.24048 2.81219 1.24048H0.356168C0.159511 1.24048 0 1.39914 0 1.59476V3.31185C0 3.50746 0.159511 3.66613 0.356168 3.66613H0.943951Z" fill="#1D1F24" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M20.2863 9.76499H19.9345C18.11 9.76499 13.2766 10.0475 13.2744 13.5448C13.2744 15.7748 15.099 17.0202 17.0983 17.0202C19.6264 17.0202 20.483 15.0532 20.483 15.0532H20.5267C20.5267 15.0532 20.5048 15.2488 20.5048 15.5335C20.5048 16.1899 20.9003 16.7572 21.9339 16.7572H24.438V14.4185H23.5596C23.293 14.4185 23.0767 14.2033 23.0767 13.9382V9.78455C23.0767 7.29369 21.9776 5.34839 18.2433 5.34839C17.0786 5.34839 14.1353 5.5679 14.1353 7.64362V8.46955C14.1353 8.66518 14.2948 8.82384 14.4915 8.82384H16.3707C16.5673 8.82384 16.7268 8.66518 16.7268 8.46955V8.23484C16.7268 7.62188 17.7167 7.4915 18.2214 7.4915C19.6483 7.4915 20.2863 8.08268 20.2863 9.67804V9.76499ZM20.33 11.9277C20.33 13.2817 19.2746 14.8554 17.78 14.8554C16.6372 14.8554 16.0888 14.1577 16.091 13.4122C16.091 11.8603 18.3962 11.6646 19.8471 11.6646H20.33V11.9277Z" fill="#1D1F24" />
                            <path d="M26.2717 8.45237C26.2717 8.12417 26.0969 7.97205 25.7888 7.97205H25.2666C25.0699 7.97205 24.9104 7.81336 24.9104 7.61776V5.96804C24.9104 5.77244 25.0699 5.61375 25.2666 5.61375H27.5674C28.601 5.61375 29.0402 6.07237 29.0402 7.07873V12.2148C29.0402 13.5689 29.392 14.4882 30.7751 14.4882C32.7963 14.4882 33.9173 12.719 33.9173 10.7281V5.61157H36.7076V13.9384C36.7076 14.2035 36.9239 14.4187 37.1905 14.4187H37.7127C37.9094 14.4187 38.0689 14.5774 38.0689 14.773V16.401C38.0689 16.5966 37.9094 16.7552 37.7127 16.7552H35.4993C34.5335 16.7552 34.0265 16.2966 34.0265 15.5098V15.2034C34.0265 14.9403 34.0484 14.7013 34.0484 14.7013H34.0047C33.4781 15.8597 32.0709 17.0182 30.1371 17.0182C27.7423 17.0182 26.2695 15.8163 26.2695 12.7777V8.45237H26.2717Z" fill="#1D1F24" />
                            <path d="M39.4456 7.97183C39.7539 7.97183 39.9285 8.12399 39.9285 8.45219H39.9266V16.7572H42.6951V11.6451C42.6951 11.1191 42.7627 10.617 42.9155 10.1584C43.3113 8.82386 44.4321 7.88488 45.9266 7.88488C47.3317 7.88488 47.6835 8.8043 47.6835 10.1584V15.2705C47.6835 16.0921 48.3521 16.7572 49.178 16.7572H51.8373V14.4207H50.959C50.6924 14.4207 50.4761 14.2055 50.4761 13.9403V9.59111C50.4761 6.63945 49.047 5.35059 46.5646 5.35059C44.3011 5.35059 43.0928 6.72858 42.6099 7.66755H42.566C42.566 7.66755 42.6099 7.42844 42.6099 7.1872V6.859C42.6099 6.07219 42.127 5.61357 41.1372 5.61357H39.7975C39.6011 5.61357 39.4414 5.77222 39.4414 5.96786V7.61755C39.4414 7.81318 39.6011 7.97183 39.7975 7.97183H39.4456Z" fill="#1D1F24" />
                            <path d="M59.2254 5.34839C60.6763 5.34839 63.2893 5.93743 63.2893 7.86099V8.81734C63.2893 9.01294 63.13 9.17163 62.9333 9.17163H61.1851C60.9888 9.17163 60.8291 9.01294 60.8291 8.81734V8.56085C60.8291 7.94794 59.9069 7.68709 59.2254 7.68709C57.2916 7.68709 55.9083 9.15203 55.9083 11.1625C55.9083 13.4361 57.5995 14.5946 59.4022 14.5946C60.7787 14.5946 61.893 13.8121 62.4088 13.3752C62.5772 13.2318 62.8328 13.2731 62.9463 13.4622L63.7439 14.7815C63.8291 14.9228 63.8073 15.101 63.6893 15.2162C63.1671 15.7291 61.6092 17.0224 59.1596 17.0224C55.4689 17.0224 53.0962 14.4207 53.0962 11.1865C53.0962 8.03702 55.3795 5.34839 59.2254 5.34839Z" fill="#1D1F24" />
                            <path d="M65.5597 3.60095C65.868 3.60095 66.0425 3.75309 66.0425 4.0813V16.4052C66.0425 16.6008 66.2022 16.7594 66.399 16.7594H68.4768C68.6735 16.7594 68.8328 16.6008 68.8328 16.4052V11.6452C68.8328 11.1192 68.8768 10.6388 69.0078 10.2019C69.425 8.84566 70.568 7.88495 72.0407 7.88495C73.4458 7.88495 73.8194 8.80437 73.8194 10.1584V15.2706C73.8194 16.3204 74.2583 16.7573 75.2921 16.7573H77.5972C77.7939 16.7573 77.9536 16.5986 77.9536 16.403V14.775C77.9536 14.5794 77.7939 14.4207 77.5972 14.4207H77.075C76.8083 14.4207 76.5921 14.2056 76.5921 13.9404V9.59118C76.5921 6.63952 75.1851 5.35062 72.6809 5.35062C70.7472 5.35062 69.3619 6.4874 68.8351 7.55894H68.7916C68.7916 7.55894 68.8351 7.16553 68.8351 6.61996V2.70763C68.8351 1.70129 68.374 1.24268 67.3407 1.24268H65.0374C64.8407 1.24268 64.6814 1.40134 64.6814 1.59696V3.24666C64.6814 3.44228 64.8407 3.60095 65.0374 3.60095H65.5597Z" fill="#1D1F24" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M108.107 11.1843C108.107 7.77404 105.383 5.34839 101.954 5.34839C98.55 5.34839 95.8254 7.77622 95.8254 11.1843C95.8254 14.6163 98.5477 17.0202 101.954 17.0202C105.383 17.0202 108.107 14.6163 108.107 11.1843ZM105.295 11.1843C105.295 13.26 103.779 14.6598 101.954 14.6598C100.154 14.6598 98.6375 13.26 98.6375 11.1843C98.6375 9.13033 100.152 7.70883 101.954 7.70883C103.779 7.70883 105.295 9.13033 105.295 11.1843Z" fill="#1D1F24" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M115.803 5.34839C119.232 5.34839 121.956 7.77404 121.956 11.1843C121.956 14.6163 119.232 17.0202 115.803 17.0202C112.397 17.0202 109.674 14.6163 109.674 11.1843C109.672 7.77622 112.397 5.34839 115.803 5.34839ZM115.803 14.6598C117.628 14.6598 119.144 13.26 119.144 11.1843C119.144 9.13033 117.628 7.70883 115.803 7.70883C114 7.70883 112.487 9.13033 112.487 11.1843C112.487 13.26 114 14.6598 115.803 14.6598Z" fill="#1D1F24" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M131.848 6.70254C131.848 6.70254 131.057 5.34842 128.619 5.34842C125.651 5.34842 123.521 7.64369 123.521 11.1822C123.521 14.6359 125.477 17.0181 128.51 17.0181C131.081 17.0181 132.004 15.2032 132.004 15.2032H132.047V15.6183C132.047 16.2747 132.418 16.7551 133.43 16.7551H135.644C135.84 16.7551 136 16.5964 136 16.4008V14.7728C136 14.5772 135.84 14.4186 135.644 14.4186H135.143C134.877 14.4186 134.661 14.2034 134.661 13.9382V2.72717C134.661 1.90558 133.992 1.24048 133.166 1.24048H130.865C130.668 1.24048 130.509 1.39915 130.509 1.59476V3.24447C130.509 3.44008 130.668 3.59875 130.865 3.59875H131.387C131.695 3.59875 131.87 3.7509 131.87 4.0791V6.04615C131.87 6.41782 131.892 6.70254 131.892 6.70254H131.848ZM129.167 7.7306C131.036 7.7306 131.936 9.43683 131.936 11.1626C131.936 13.6317 130.574 14.6815 129.123 14.6815C127.476 14.6815 126.355 13.3035 126.355 11.1843C126.355 8.97603 127.629 7.7306 129.167 7.7306Z" fill="#1D1F24" />
                        </g>
                        <defs>
                            <clipPath id="clip0_9240_13904">
                                <rect width="136" height="16.0449" fill="white" transform="translate(0 0.977539)" />
                            </clipPath>
                        </defs>
                    </svg>

                </Link>
            </nav>
            <div className="flex flex-col sm:flex-row gap-6 px-4">
                <section className="flex flex-col gap-6 sm:w-1/2">
                    <div className="flex flex-row gap-3 justify-start items-center">
                        <img className="w-16 h-16 rounded-full" src="/influencer/maryam.png" />
                        <div className="flex flex-col">
                            <h1 className="text-xl font-bold">Salam, Maryam!</h1>
                            <p className="text-neutral-600">Fundraising since 2021</p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-6">
                        <div className="flex flex-col">
                            <p className="text-neutral-600">Total raised</p>
                            <p className="text-lg font-bold">$937,849</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-neutral-600">Supporters</p>
                            <p className="text-lg font-bold">24,010</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-neutral-600">Fundraisers</p>
                            <p className="text-lg font-bold">4</p>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-neutral-600 mb-2">Your partners</div>
                        <div className="flex -space-x-3">
                            <div className="relative group">
                                <img 
                                    className="w-12 h-12 rounded-full border-2 border-white bg-neutral-100 hover:z-10 transition-transform hover:scale-105" 
                                    src="/influencer/charity.png" 
                                />
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2.5 py-1.5 bg-white text-neutral-600 border border-neutral-200 rounded-full text-sm shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap after:content-[''] after:absolute after:left-1/2 after:-bottom-[10px] after:-translate-x-1/2 after:border-[6px] after:border-transparent after:border-t-white before:content-[''] before:absolute before:left-1/2 before:-bottom-[11px] before:-translate-x-1/2 before:border-[6px] before:border-transparent before:border-t-neutral-200">
                                    The Good Charity
                                </div>
                            </div>
                            <div className="relative group">
                                <img 
                                    className="w-12 h-12 rounded-full border-2 border-white bg-neutral-100 hover:z-10 transition-transform hover:scale-105" 
                                    src="/influencer/hci.png" 
                                />
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2.5 py-1.5 bg-white text-neutral-600 border border-neutral-200 rounded-full text-sm shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap after:content-[''] after:absolute after:left-1/2 after:-bottom-[10px] after:-translate-x-1/2 after:border-[6px] after:border-transparent after:border-t-white before:content-[''] before:absolute before:left-1/2 before:-bottom-[11px] before:-translate-x-1/2 before:border-[6px] before:border-transparent before:border-t-neutral-200">
                                Human Concern International
                                </div>
                            </div>
                            <div className="relative group">
                                <img 
                                    className="w-12 h-12 rounded-full border-2 border-white bg-neutral-100 hover:z-10 transition-transform hover:scale-105" 
                                    src="/influencer/ha.jpeg" 
                                />
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2.5 py-1.5 bg-white text-neutral-600 border border-neutral-200 rounded-full text-sm shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap after:content-[''] after:absolute after:left-1/2 after:-bottom-[10px] after:-translate-x-1/2 after:border-[6px] after:border-transparent after:border-t-white before:content-[''] before:absolute before:left-1/2 before:-bottom-[11px] before:-translate-x-1/2 before:border-[6px] before:border-transparent before:border-t-neutral-200">
                                Human Appeal
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="flex flex-col gap-4 pb-4 rounded-lg border border-neutral-200 sm:w-1/2">
                    <div className="flex flex-row justify-between items-center p-4 pb-0">
                        <h3 className="text-lg font-bold">Your live fundraisers</h3>
                        <Button variant="tertiary" className="font-normal text-neutral-600">
                            See all
                            <ChevronRightIcon className="w-4 h-4" />
                        </Button>
                    </div>
                    <div className="flex flex-row gap-4 px-4 justify-start items-center">
                        <img className="w-24 h-20 rounded-lg" src="influencer/campaign.png"/>
                        <div className="flex-col justify-center items-start gap-2">
                            <div className="flex-col justify-center items-start flex">
                                <div className="self-stretch text-neutral-900 text-base font-semibold leading-tight">Bring hope to those in need w/Maryam Malik</div>
                                <div className="justify-start items-start gap-2 inline-flex">
                                    <div className="text-neutral-600 text-sm font-normal leading-tight">with </div>
                                    <div className="justify-start items-center gap-1 flex">
                                        <img className="w-5 h-5 rounded-full border border-neutral-200" src="/influencer/charity.png" />
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
            <hr className="border-neutral-200 my-6" />
            
            <div className="px-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold">Your insights</h2>
                        <p className="text-neutral-600">Across all your fundraisers</p>
                    </div>
                </div>

                <div className="columns-1 sm:columns-2 gap-4 space-y-4 [&>*]:break-inside-avoid-column [&>*]:mb-4">
                    <div>
                        <DataCard title="Total funds raised" expandable showHeaderBorder={false}>
                            <div className="space-y-4">
                                <div className="flex justify-center -mt-4 -mx-4 border-b border-neutral-200">
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
                        </DataCard>
                    </div>

                    <div>
                        <DataCard title="Top fundraising days" expandable>
                            {({ expanded }) => renderDaysList(expanded ? 25 : 5)}
                        </DataCard>
                    </div>

                    <div>
                        <DataCard title="Top donations">
                            <div className="flex flex-col divide-y divide-neutral-200">
                                {topDonations.map((donation, index) => (
                                    <div key={index} className="flex items-center gap-4 py-3">
                                        <div className="w-8 h-8 rounded-full text-neutral-600 border border-neutral-200 flex items-center justify-center text-sm">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-bold">${donation.amount.toLocaleString()}</div>
                                            <div className="text-sm text-neutral-600">
                                                {donation.timeAgo} · {donation.location}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </DataCard>
                    </div>

                    <div>
                        <DataCard title="Top countries" expandable>
                            {({ expanded }) => (
                                <div className="relative">
                                    <div className="sm:sticky top-0 bg-white z-10">
                                        <DonorMap data={topCountries} />
                                        <hr className="border-neutral-200 mb-6" />
                                        <div className="h-12 absolute -bottom-6 left-0 w-full bg-gradient-to-b from-white via-white to-transparent"></div>
                                    </div>
                                    <div className="flex flex-col divide-y divide-neutral-200">
                                        {topCountries
                                            .slice(0, expanded ? topCountries.length : 5)
                                            .map((country, index) => {
                                                const colors = ['#2C633D', '#3C8653', '#4AA567', '#6BBD85', '#8ECCA2'];
                                                const colorIndex = Math.min(
                                                    colors.length - 1,
                                                    Math.floor((index / (expanded ? topCountries.length : 5)) * colors.length)
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
                                                                {country.donors.toLocaleString()} donors
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </div>
                            )}
                        </DataCard>
                    </div>

                    <div className="sm:!column-span-all">
                        <DataCard title="Top sources" expandable>
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
                        </DataCard>
                    </div>

                    <div className="sm:!column-span-all">
                        <DataCard title="Donations summary">
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
                        </DataCard>
                    </div>
                </div>
            </div>
        </div>
    )
}