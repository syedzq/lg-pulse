"use client";
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { eventEmitter, type DonationCard } from '../utils/eventEmitter';

interface DonationFeedProps {
  backgroundColor: string;
}

export default function LiveDonationFeed({ backgroundColor }: DonationFeedProps) {
    const [donations, setDonations] = useState<DonationCard[]>([]);
    const [hasReceivedFirstDonation, setHasReceivedFirstDonation] = useState(false);
    const [canScroll, setCanScroll] = useState(false);
    const [showLeftGradient, setShowLeftGradient] = useState(false);
    const [showRightGradient, setShowRightGradient] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleNewDonation = (donation: DonationCard) => {
            setHasReceivedFirstDonation(true);
            setDonations(prev => [donation, ...prev].slice(0, 10));
        };

        eventEmitter.on('newDonation', handleNewDonation);
        return () => eventEmitter.off('newDonation', handleNewDonation);
    }, []);

    // Update scroll indicators based on scroll position
    const updateScrollGradients = () => {
        const container = containerRef.current;
        if (container) {
            const { scrollLeft, scrollWidth, clientWidth } = container;
            
            // Check if content is scrollable
            const isScrollable = scrollWidth > clientWidth;
            setCanScroll(isScrollable);
            
            if (isScrollable) {
                // Show left gradient if we've scrolled right
                setShowLeftGradient(scrollLeft > 0);
                
                // Show right gradient if there's more content to scroll to
                // Add small buffer (1px) for rounding errors
                setShowRightGradient(Math.ceil(scrollLeft) < scrollWidth - clientWidth - 1);
            } else {
                setShowLeftGradient(false);
                setShowRightGradient(false);
            }
        }
    };

    // Check scroll on mount, resize, and when donations change
    useEffect(() => {
        updateScrollGradients();
        window.addEventListener('resize', updateScrollGradients);
        return () => window.removeEventListener('resize', updateScrollGradients);
    }, [donations]);

    // Add scroll event listener
    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', updateScrollGradients);
            return () => container.removeEventListener('scroll', updateScrollGradients);
        }
    }, []);

    // Generate skeleton cards
    const skeletonCards = Array(1).fill(null).map((_, index) => (
        <motion.div
            key={`skeleton-${index}`}
            initial={{ opacity: 1.0 }}
            animate={{ opacity: [0.8, 1.0, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex-none w-[300px] bg-white/25 backdrop-blur-lg rounded-xl overflow-hidden"
        >
            <div className="p-4 space-y-4">
                <div className="h-7 bg-white/50 rounded-md w-1/2" />
                <div className="h-5 bg-white/50 rounded-md w-3/4" />
                <div className="h-5 bg-white/50 rounded-md w-full" />
            </div>
        </motion.div>
    ));

    return (
        <div 
            className="min-h-[200px] max-w-screen-lg mx-auto w-full relative"
            style={{
                background: `linear-gradient(to bottom, ${backgroundColor}00, ${backgroundColor}33)`
            }}
        >
            <div 
                ref={containerRef}
                className={`flex gap-4 overflow-x-auto scrollbar-hide py-4 px-4 ${
                    canScroll ? 'justify-start' : 'justify-center'
                }`}
                onScroll={updateScrollGradients}
            >
                <AnimatePresence>
                    {!hasReceivedFirstDonation ? (
                        <>{skeletonCards}</>
                    ) : (
                        donations.map((donation) => (
                            <motion.div
                                key={donation.id}
                                initial={{ opacity: 0, x: -100}}
                                animate={{ opacity: 1, x: 0}}
                                exit={{ opacity: 0, x: 0 }}
                                className="flex-none w-[300px] bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden"
                            >
                                <div className="p-4">
                                    <div className="text-lg font-semibold text-white mb-2">
                                        ${donation.amount.toFixed(2)} {donation.currency}
                                    </div>
                                    <div className="text-sm text-white/80 mb-3">
                                        {donation.fromCity} to {donation.toCity}
                                    </div>
                                    <div className="text-sm text-white/60 border-t border-white/10 pt-3">
                                        {donation.campaignTitle}
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            {/* Scroll indicators */}
            {canScroll && (
                <>
                    {showLeftGradient && (
                        <div 
                            className="absolute left-0 top-0 bottom-0 w-16 pointer-events-none transition-opacity duration-200"
                            style={{
                                background: `linear-gradient(to right, ${backgroundColor}, transparent)`
                            }}
                        />
                    )}
                    {showRightGradient && (
                        <div 
                            className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none transition-opacity duration-200"
                            style={{
                                background: `linear-gradient(to left, ${backgroundColor}, transparent)`
                            }}
                        />
                    )}
                </>
            )}
        </div>
    );
} 