"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, GlobeAltIcon, PlusCircleIcon, HeartIcon, UserCircleIcon, ChevronLeftIcon, ShareIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

export default function TabBar() {
    const pathname = usePathname();
    const isGlobePage = pathname === '/globe';
    const isCampaignPage = pathname.includes('/campaign');
    
    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[2000] w-full max-w-[350px] px-4">
            <AnimatePresence mode="wait">
                {isCampaignPage ? (
                    <motion.div
                        key="campaign-bar"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="bg-neutral-100 backdrop-blur-xl rounded-full h-16 flex items-center justify-between px-4 border border-black/5"
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
                        className={`${isGlobePage ? 'bg-neutral-900/50' : 'bg-neutral-100'} backdrop-blur-xl rounded-full h-16 flex items-center justify-around border ${isGlobePage ? 'border-white/5' : 'border-black/5'}`}
                    >
                        <Link 
                            href="/" 
                            className={`p-3 rounded-full ${pathname === '/' ? (isGlobePage ? 'text-white' : 'text-black') : (isGlobePage ? 'text-white/50' : 'text-black/50')}`}
                        >
                            <HomeIcon className="w-6 h-6" />
                        </Link>
                        <Link 
                            href="/globe" 
                            className={`p-3 rounded-full ${pathname === '/globe' ? (isGlobePage ? 'text-white' : 'text-black') : (isGlobePage ? 'text-white/50' : 'text-black/50')}`}
                        >
                            <GlobeAltIcon className="w-6 h-6" />
                        </Link>
                        <button 
                            className={`p-3 rounded-full ${isGlobePage ? 'text-white/50' : 'text-black/50'}`}
                            onClick={() => {}}
                        >
                            <PlusCircleIcon className="w-6 h-6" />
                        </button>
                        <button 
                            className={`p-3 rounded-full ${isGlobePage ? 'text-white/50' : 'text-black/50'}`}
                            onClick={() => {}}
                        >
                            <HeartIcon className="w-6 h-6" />
                        </button>
                        <button 
                            className={`p-3 rounded-full ${isGlobePage ? 'text-white/50' : 'text-black/50'}`}
                            onClick={() => {}}
                        >
                            <UserCircleIcon className="w-6 h-6" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
} 