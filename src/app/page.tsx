"use client";
import { useRef, useState } from 'react';
import { CAMPAIGNS } from './data/campaigns';
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { Button } from './components/Button';
import { CampaignCard } from './components/CampaignCard';

export default function HomePage() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            const encodedQuery = encodeURIComponent(searchQuery);
            window.open(`https://www.launchgood.com/discover#!?search=${encodedQuery}`, '_blank');
        }
    };

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

    const campaignSections = [
        {
            title: "Fundraising now",
            campaigns: CAMPAIGNS.slice(0, 5)  // First 5 campaigns
        },
        {
            title: "Most funded",
            campaigns: CAMPAIGNS.slice(5, 10)  // Next 5 campaigns
        },
        {
            title: "Trending now",
            campaigns: [...CAMPAIGNS].sort(() => Math.random() - 0.5).slice(0, 5)  // Random 5
        },
        {
            title: "Ending soon",
            campaigns: [...CAMPAIGNS].sort(() => Math.random() - 0.5).slice(0, 5)  // Random 5
        },
        {
            title: "Recently added",
            campaigns: [...CAMPAIGNS].reverse().slice(0, 5)  // Last 5 campaigns
        }
    ];

    return (
        <div className="min-w-screen bg-white dark:bg-neutral-900 text-black dark:text-white">
            {/* Hero Section */}
            <div className="relative h-[60vh] w-full">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-neutral-900 z-10" />
                <Image 
                    src="https://cdn.builder.io/api/v1/image/assets%2Fc05b786f1645447ab878b73ca4dd6870%2F2107b2375d444a9eb25e0492c9c851d0"
                    alt="Hero"
                    width={2000}
                    height={1000}
                    className="w-full h-full object-cover"
                    priority
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                    <div className="max-w-xl mx-auto flex flex-col items-center">
                        <h1 className="font-serif text-center tracking-tight font-light text-4xl md:text-6xl mb-4 md:mb-8 text-neutral-900 dark:text-white">
                            Grow your <br/> Garden <em>of</em> Giving
                        </h1>
                        <form 
                            onSubmit={handleSearch}
                            className="w-full flex self-center items-center gap-2 bg-white rounded-full border border-black/10 p-2 shadow-lg mb-12"
                        >
                            <input
                                type="text"
                                placeholder="Discover inspiring causes"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 px-4 py-2 bg-transparent outline-none"
                            />
                            <Button 
                                type="submit"
                                className="p-2 rounded-full hover:bg-black/5 transition-colors"
                            >
                                <MagnifyingGlassIcon className="w-5 h-5" />
                            </Button>
                        </form>
                        <div className="text-xs text-neutral-900/75 dark:text-white/75 font-light">
                            Today is the 29th of Jumada al-Awwal, 1446
                        </div>
                    </div>
                </div>
            </div>

            {/* Multiple Campaign Sections */}
            <div className="px-6 py-8 max-w-screen-xl mx-auto space-y-12">
                {campaignSections.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">{section.title}</h2>
                            <div className="invisible sm:visible flex gap-2">
                                <Button 
                                    onClick={() => scroll('left')}
                                    
                                >
                                    <ChevronLeftIcon className="w-5 h-5" />
                                </Button>
                                <Button 
                                    onClick={() => scroll('right')}
                                    
                                >
                                    <ChevronRightIcon className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>

                        <div 
                            ref={scrollContainerRef}
                            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
                            style={{ scrollBehavior: 'smooth' }}
                        >
                            {section.campaigns.map((campaign, index) => (
                                <CampaignCard 
                                    key={index}
                                    title={campaign.title}
                                    url={campaign.url}
                                    imageUrl={campaign.imageUrl}
                                    isZakatVerified={campaign.isZakatVerified}
                                    fundsRaised={campaign.raised}
                                    goal={campaign.goal}
                                    isSponsored={campaign.isSponsored}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
