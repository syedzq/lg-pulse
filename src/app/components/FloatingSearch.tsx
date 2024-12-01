"use client";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from './Button';

export default function FloatingSearch() {
    const [isVisible, setIsVisible] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const checkScroll = () => {
            const heroHeight = window.innerHeight * 0.6;
            setIsVisible(window.scrollY > heroHeight - 100);
        };

        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, []);

    useEffect(() => {
        // When search icon becomes visible, add class to main tab bar
        const mainTabBar = document.getElementById('main-tab-bar');
        if (mainTabBar) {
            if (isVisible) {
                mainTabBar.style.transform = 'translateX(calc(-50% - 38px))';
            } else {
                mainTabBar.style.transform = 'translateX(-50%)';
            }
        }
    }, [isVisible]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            const encodedQuery = encodeURIComponent(searchQuery);
            window.open(`https://www.launchgood.com/discover#!?search=${encodedQuery}`, '_blank');
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    return (
        <>
            {/* Search Icon */}
            <AnimatePresence>
                {isVisible && !isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-4 z-[2000]"
                        style={{
                            left: 'calc(50% + 143px)'
                        }}
                    >
                        <Button
                            variant="tertiary"
                            size="extraSmall"
                            className="h-16 w-16 bg-neutral-100 rounded-full flex items-center justify-center border border-black/5"
                        >
                            <MagnifyingGlassIcon className="w-6 h-6" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-white/10 backdrop-blur-xl z-[2001]"
                            onClick={() => setIsSearchOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 40, scale: 0.8, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: 40, scale: 0.8, filter: 'blur(10px)' }}
                            className="fixed top-8 left-1/2 -translate-x-1/2 w-full max-w-xl px-4 z-[2002]"
                        >
                            <form 
                                onSubmit={handleSearch}
                                className="w-full flex items-center gap-2 bg-white rounded-full border border-black/10 p-2 shadow-lg"
                            >
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Search campaigns..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="flex-1 px-4 py-2 bg-transparent outline-none"
                                />
                                <Button 
                                    variant="tertiary" 
                                    size="extraSmall" 
                                    className="absolute right-2 top-1/2 -translate-y-1/2"
                                    onClick={() => setSearchQuery('')}
                                >
                                    <XMarkIcon className="h-4 w-4" />
                                </Button>
                                <Button 
                                    variant="tertiary" 
                                    size="extraSmall" 
                                    className="p-2 rounded-full hover:bg-black/5 transition-colors"
                                >
                                    <MagnifyingGlassIcon className="w-5 h-5" />
                                </Button>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
} 