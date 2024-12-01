"use client";
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { eventEmitter, type DonationCard } from '../utils/eventEmitter';

export default function LiveDonationFeed() {
    const [donations, setDonations] = useState<DonationCard[]>([]);
    const [hasReceivedFirstDonation, setHasReceivedFirstDonation] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleNewDonation = (donation: DonationCard) => {
            setHasReceivedFirstDonation(true);
            setDonations(prev => [donation, ...prev].slice(0, 10));
        };

        eventEmitter.on('newDonation', handleNewDonation);
        return () => eventEmitter.off('newDonation', handleNewDonation);
    }, []);

    // Generate skeleton cards
    const skeletonCards = Array(3).fill(null).map((_, index) => (
        <motion.div
            key={`skeleton-${index}`}
            initial={{ opacity: 1.0 }}
            animate={{ opacity: [0.8, 1.0, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex-none w-[300px] bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden"
        >
            <div className="p-4 space-y-4">
                <div className="h-7 bg-neutral-700/50 rounded-md w-1/2" /> {/* Amount */}
                <div className="h-5 bg-neutral-700/50 rounded-md w-3/4" /> {/* Cities */}
                <div className="h-5 bg-neutral-700/50 rounded-md w-full" /> {/* Campaign title */}
            </div>
        </motion.div>
    ));

    return (
        <div className="md:hidden min-h-[200px] w-full overflow-hidden bg-gradient-to-b from-black/0 to-black/20">
            <div 
                ref={containerRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide py-4 px-4"
            >
                <AnimatePresence>
                    {!hasReceivedFirstDonation ? (
                        // Show skeletons if no donations yet
                        <>{skeletonCards}</>
                    ) : (
                        // Show actual donations once we have them
                        donations.map((donation) => (
                            <motion.div
                                key={donation.id}
                                initial={{ opacity: 0, x: -100, scale: 0.8 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 0, scale: 1 }}
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
        </div>
    );
} 