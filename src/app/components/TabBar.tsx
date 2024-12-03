"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, GlobeAltIcon, PlusCircleIcon, HeartIcon, UserCircleIcon, ChevronLeftIcon, ShareIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function TabBar() {
    const pathname = usePathname();
    const isCampaignPage = pathname.includes('/campaign');
    const [isAnimating, setIsAnimating] = useState(false);
    
    useEffect(() => {
        const handleHeartArrival = () => {
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 500);
        };

        window.addEventListener('heartArrival', handleHeartArrival);
        return () => window.removeEventListener('heartArrival', handleHeartArrival);
    }, []);
    
    return (
        <div className="fixed bottom-0 md:top-0 md:bottom-auto left-0 right-0 z-[2000] pointer-events-none">
            {/* Mobile-only background effects container */}
            <div className="block sm:hidden">
                {/* Progressive gradient */}
                <div className="absolute bottom-0 md:top-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-neutral-900 via-white/80 dark:via-neutral-900/80 to-transparent" />
                
                {/* Progressive blur */}
                <div className="absolute bottom-0 left-0 right-0">
                    {Array.from({ length: 64 }, (_, i) => {
                        const progress = i / 64;
                        const blurAmount = progress * 48;
                        const opacity = progress;
                        
                        return (
                            <div
                                key={i}
                                className={`h-px backdrop-blur-[${blurAmount}px] bg-white/[${opacity}] dark:bg-neutral-900/[${opacity}]`}
                            />
                        );
                    })}
                </div>
            </div>
            
            {/* Tab bar container */}
            <div className="absolute bottom-8 md:top-10 left-1/2 -translate-x-1/2 w-full max-w-[350px] md:max-w-2xl px-4 pointer-events-auto">
                <AnimatePresence mode="wait">
                    {isCampaignPage ? (
                        <motion.div
                            key="campaign-bar"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="bg-white dark:bg-neutral-800 backdrop-blur-xl rounded-full h-16 flex items-center justify-between px-4 border border-black/5 dark:border-white/5 shadow-md"
                        >
                            <button 
                                onClick={() => window.history.back()}
                                className="p-3 rounded-full hover:bg-black/5 transition-colors"
                            >
                                <ChevronLeftIcon className="w-6 h-6" />
                            </button>

                            <div className="flex gap-2 flex-1 justify-end items-center">
                                <button 
                                    onClick={() => {
                                        if (navigator.share) {
                                            navigator.share({
                                                title: 'Campaign',
                                                url: window.location.href
                                            });
                                        }
                                    }}
                                    className="px-4 py-2 rounded-full bg-white border border-neutral-200 text-sm font-medium hover:bg-neutral-50 transition-colors shrink-0"
                                >
                                    <ShareIcon className="w-5 h-5" />
                                </button>
                                <button
                                    className='w-full' 
                                    style={{
                                        width: '100%',
                                        padding: '8px 24px',
                                        borderRadius: '9999px',
                                        backgroundColor: '#22c55e',
                                        color: 'white',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        transition: 'background-color 0.2s ease',
                                        cursor: 'pointer',
                                        border: 'none',
                                        outline: 'none',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#16a34a';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#22c55e';
                                    }}
                                >
                                    Donate
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="main-bar"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className='bg-white dark:bg-neutral-800 backdrop-blur-xl rounded-full h-16 flex items-center justify-around shadow-sm border border-black/5 dark:border-white/5'
                        >
                            <Link 
                                href="/" 
                                className={`p-3 flex flex-row gap-2 items-center rounded-full ${pathname === '/' ? 'text-black dark:text-white' : 'text-black/50 dark:text-neutral-400'}`}
                            >
                                <HomeIcon className="w-6 h-6" />
                                <div className='hidden md:block'>Home</div>
                            </Link>
                            <Link 
                                href="/pulse" 
                                className={`p-3 flex flex-row gap-2 items-center rounded-full ${pathname === '/pulse' ? 'text-black dark:text-white' : 'text-black/50 dark:text-neutral-400'}`}
                            >
                                <GlobeAltIcon className="w-6 h-6" />
                                <div className='hidden md:block'>Pulse</div>
                            </Link>
                            <button 
                                className="p-3 flex flex-row gap-2 items-center rounded-full text-black/50 dark:text-neutral-400"
                                onClick={() => {}}
                            >
                                <PlusCircleIcon className="w-6 h-6" />
                            </button>
                            <Link
                                href="/list"
                                className={`p-3 flex flex-row gap-2 items-center rounded-full ${pathname === '/list' ? 'text-black dark:text-white' : 'text-black/50 dark:text-neutral-400'}`}
                            >
                                <motion.div
                                    animate={isAnimating ? {
                                        scale: [1, 0.8, 1],
                                        transition: { duration: 0.25, ease: "easeOut" }
                                    } : {}}
                                    data-heart-target
                                >
                                    <HeartIcon className="w-6 h-6" />
                                </motion.div>
                                <div className='hidden md:block'>Giving List</div>
                            </Link>
                            <Link
                                href="/profile"
                                className={`p-3 flex flex-row gap-2 items-center rounded-full ${pathname === '/profile' ? 'text-black dark:text-white' : 'text-black/50 dark:text-neutral-400'}`}
                            >
                                <UserCircleIcon className="w-6 h-6" />
                                <div className='hidden md:block'>Profile</div>
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
} 