"use client";
import { useRef } from 'react';
import { CAMPAIGNS } from './data/campaigns';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function HomePage() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

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
        <div className="min-h-screen bg-white text-black">
            {/* Hero Section */}
            <div className="relative h-[60vh] w-full">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white z-10" />
                <img 
                    src="https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=2400&q=80" 
                    alt="Hero" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                    <h1 className="text-4xl font-bold mb-4 text-black">
                        Support Humanitarian Aid
                    </h1>
                    <p className="text-lg text-black/80 max-w-xl">
                        Join the global community in providing essential support to those in need.
                    </p>
                </div>
            </div>

            {/* Campaigns Section */}
            <div className="px-4 py-8">
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
                                    onClick={() => window.open(campaign.url, '_blank')}
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
