"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, GlobeAltIcon, PlusCircleIcon, HeartIcon, UserCircleIcon, ChevronLeftIcon, ShareIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

export default function TabBar() {
    const pathname = usePathname();
    const isGlobePage = pathname === '/globe';
    const isCampaignPage = pathname.includes('/campaign');
    
    // Generate 64 blur layers
    const blurLayers = Array.from({ length: 64 }, (_, i) => {
        const progress = i / 64; // 0 to 1
        const blurAmount = progress * 48; // 0px to 48px blur
        const opacity = progress * 1; // 0 to 1 opacity
        
        return (
            <div
                key={i}
                className={`h-px backdrop-blur-[${blurAmount}px] ${
                    isGlobePage 
                        ? `bg-black/[${opacity}] backdrop-blur-[${blurAmount}px]` 
                        : `bg-white/[${opacity}] backdrop-blur-[${blurAmount}px] dark:bg-neutral-900/[${opacity}]`
                }`}
            />
        );
    });
    
    return (
        <div className="fixed bottom-0 left-0 right-0 z-[2000] pointer-events-none">
            {/* Mobile-only background effects container */}
            <div className="block sm:hidden">
                {/* Progressive gradient */}
                <div className={`absolute bottom-0 left-0 right-0 h-32 ${
                    isGlobePage 
                        ? 'bg-gradient-to-t from-black via-black/50 to-transparent' 
                        : 'bg-gradient-to-t from-white dark:from-neutral-900 via-white/80 dark:via-neutral-900/80 to-transparent'
                }`} />
                
                {/* Progressive blur - using 64 layers */}
                <div className="absolute bottom-0 left-0 right-0">
                    {blurLayers}
                </div>
            </div>
            
            {/* Tab bar container - centered with pointer events */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[350px] px-4 pointer-events-auto">
                <AnimatePresence mode="wait">
                    {isCampaignPage ? (
                        <motion.div
                            key="campaign-bar"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="bg-white dark:bg-neutral-800 backdrop-blur-xl rounded-full h-16 flex items-center justify-between px-4 border border-black/5 dark:border-white/5"
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
                            className={`${isGlobePage ? 'bg-neutral-900/50' : 'bg-white dark:bg-neutral-800'} backdrop-blur-xl rounded-full h-16 flex items-center justify-around border ${isGlobePage ? 'border-white/5' : 'border-black/5 dark:border-white/5'}`}
                        >
                            <Link 
                                href="/" 
                                className={`p-3 rounded-full ${pathname === '/' ? (isGlobePage ? 'text-white' : 'text-black dark:text-white') : (isGlobePage ? 'text-white/50' : 'text-black/50 dark:text-neutral-400')}`}
                            >
                                <HomeIcon className="w-6 h-6" />
                            </Link>
                            <Link 
                                href="/globe" 
                                className={`p-3 rounded-full ${pathname === '/globe' ? (isGlobePage ? 'text-white' : 'text-black dark:text-white') : (isGlobePage ? 'text-white/50' : 'text-black/50 dark:text-neutral-400')}`}
                            >
                                <GlobeAltIcon className="w-6 h-6" />
                            </Link>
                            <button 
                                className={`p-3 rounded-full ${isGlobePage ? 'text-white/50' : 'text-black/50 dark:text-neutral-400'}`}
                                onClick={() => {}}
                            >
                                <PlusCircleIcon className="w-6 h-6" />
                            </button>
                            <button 
                                className={`p-3 rounded-full ${isGlobePage ? 'text-white/50' : 'text-black/50 dark:text-neutral-400'}`}
                                onClick={() => {}}
                            >
                                <HeartIcon className="w-6 h-6" />
                            </button>
                            <button 
                                className={`p-3 rounded-full ${isGlobePage ? 'text-white/50' : 'text-black/50 dark:text-neutral-400'}`}
                                onClick={() => {}}
                            >
                                <UserCircleIcon className="w-6 h-6" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
} 