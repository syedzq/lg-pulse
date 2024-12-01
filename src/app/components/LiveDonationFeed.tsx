"use client";
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { eventEmitter } from '../utils/eventEmitter';

interface DonationCard {
    id: string;
    amount: number;
    currency: string;
    fromCity: string;
    toCity: string;
    campaignTitle: string;
    campaignUrl: string;
    timestamp: number;
}

export default function LiveDonationFeed() {
    const [donations, setDonations] = useState<DonationCard[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleNewDonation = (donation: DonationCard) => {
            setDonations(prev => [donation, ...prev].slice(0, 10));
        };

        eventEmitter.on('newDonation', handleNewDonation);
        return () => eventEmitter.off('newDonation', handleNewDonation);
    }, []);

    return (
        <div className="md:hidden w-full overflow-hidden bg-gradient-to-b from-black/0 to-black/20">
            <div 
                ref={containerRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide py-4 px-4"
            >
                <AnimatePresence>
                    {donations.map((donation) => (
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
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
} 