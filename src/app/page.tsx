"use client";
import { useRef } from 'react';
import { CAMPAIGNS } from './data/campaigns';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function HomePage() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400;
            const targetScroll = scrollContainerRef.current.scrollLeft + 
                (direction === 'left' ? -scrollAmount : scrollAmount);
            scrollContainerRef.current.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="min-w-screen bg-white text-black">
            {/* Hero Section */}
            <div className="relative h-[60vh] w-full">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white z-10" />
                <img 
                    src="https://cdn.builder.io/api/v1/image/assets%2Fc05b786f1645447ab878b73ca4dd6870%2F2107b2375d444a9eb25e0492c9c851d0?format=webp&width=2000" 
                    alt="Hero" 
                    className="w-full h-full object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20 max-w-screen-xl mx-auto">
                    <h1 className="font-serif text-4xl font-bold mb-4 text-black">
                        Grow your Garden of Giving
                    </h1>
                </div>
            </div>

            {/* Campaigns Section */}
            <div className="px-6 py-8 max-w-screen-xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-black">Active Campaigns</h2>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => scroll('left')}
                            className="p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
                        >
                            <ChevronLeftIcon className="w-5 h-5" />
                        </button>
                        <button 
                            onClick={() => scroll('right')}
                            className="p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
                        >
                            <ChevronRightIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div 
                    ref={scrollContainerRef}
                    className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
                    style={{ scrollBehavior: 'smooth' }}
                >
                    {CAMPAIGNS.map((campaign, index) => (
                        <div 
                            key={index}
                            className="flex-none w-[300px] bg-neutral-50 rounded-xl overflow-hidden border border-black/5 hover:border-black/10 transition-colors"
                        >
                            <div className="h-[160px] bg-neutral-100 animate-pulse" />
                            <div className="p-4">
                                <h3 className="font-semibold mb-2 line-clamp-2 min-h-[48px] text-black">
                                    {campaign.title}
                                </h3>
                                <button 
                                    onClick={() => {
                                        console.log('Opening campaign:', campaign.url);
                                        router.push(`/campaign?url=${encodeURIComponent(campaign.url)}`);
                                    }}
                                    className="mt-2 px-4 py-2 bg-black/5 hover:bg-black/10 rounded-full text-sm transition-colors w-full text-black"
                                >
                                    View Campaign
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
