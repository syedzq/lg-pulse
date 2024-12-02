'use client';
import { Button } from './Button';
import { useRouter } from 'next/navigation';
import { HeartIcon, ShoppingBagIcon, PaperAirplaneIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { ProgressBar } from './ProgressBar';
import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { createPortal } from 'react-dom';

interface CampaignCardProps {
    title: string;
    url: string;
    imageUrl?: string;
    fundraiser?: string;
    isZakatVerified?: boolean;
    isSponsored?: boolean;
    fundsRaised?: number;
    goal?: number;
    donorCount?: number;
    daysLeft?: number;
}

function formatCurrency(amount: number, useShorthand: boolean = false): string {
    if (useShorthand) {
        // Format with k/M for goal amounts
        if (amount >= 1000000) {
            return `$${(amount / 1000000).toFixed(1)}M`;
        } else if (amount >= 10000) {
            return `$${Math.round(amount / 1000)}k`;
        }
    }
    
    // Format with commas for fundsRaised
    return `$${amount.toLocaleString('en-US', { 
        maximumFractionDigits: 0,
        useGrouping: true
    })}`;
}

export function CampaignCard({ title, url, imageUrl, isZakatVerified = false, fundsRaised = 0, goal = 0, donorCount = 0, daysLeft = 0, isSponsored = false }: CampaignCardProps) {
    const router = useRouter();
    const [isLiked, setIsLiked] = useState(false);
    const [showFloatingHeart, setShowFloatingHeart] = useState(false);
    const heartRef = useRef<HTMLDivElement>(null);
    const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 });

    const handleHeartClick = async () => {
        if (!heartRef.current || isLiked) return;
        
        const heartRect = heartRef.current.getBoundingClientRect();
        const tabBarHeart = document.querySelector('[data-heart-target]');
        if (!tabBarHeart) return;
        
        const targetRect = tabBarHeart.getBoundingClientRect();
        
        setDeltaPosition({
            x: targetRect.left - heartRect.left,
            y: targetRect.top - heartRect.top
        });

        setShowFloatingHeart(true);
        setIsLiked(true);
    };

    const handleUnlike = () => {
        setIsLiked(false);
        setShowFloatingHeart(false);
    };

    return (
        <div className='min-w-[300px] max-w-[400px] flex flex-col'>
            <div className="flex flex-col h-fit bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-md transition-colors">
                <div className="h-[224px] bg-neutral-100 dark:bg-neutral-700 animate-pulse">
                    <div className='relative'>
                         {isSponsored && (
                            <div className='absolute left-3 top-3 drop-shadow-lg text-sm text-white/90'>Sponsored</div>
                        )}
                    </div>
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt={title}
                            className="w-full h-full object-cover"
                            onLoad={(e) => {
                                const target = e.target as HTMLElement;
                                target.parentElement?.classList.remove('animate-pulse');
                            }}
                        />
                    )}
                </div>
                <div className='flex-none h-fit flex-col space-y-4 p-4'>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-row items-center gap-2'>
                            <div className='rounded-full bg-neutral-200 w-6 h-6'></div>
                            <div className='text-xs text-neutral-600 dark:text-neutral-300'>The Good Charity</div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg mb-2 line-clamp-2 min-h-12 leading-6 text-neutral-900 dark:text-white">
                                {title}
                            </h3>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-row gap-2 text-sm text-neutral-600 dark:text-neutral-400'>
                            <div>{donorCount} donors</div>
                            <div>•</div>
                            <div>{daysLeft} days left</div>
                        </div>
                        <ProgressBar progress={fundsRaised / goal} />
                    </div>
                    <div className='flex flex-row justify-between items-center'>
                        <div className='flex flex-col'>
                            <div className='text-2xl font-semibold text-neutral-900 dark:text-white'>
                                {formatCurrency(fundsRaised)}
                            </div>
                            <div className='text-sm text-neutral-600 dark:text-neutral-400'>
                                funded of {formatCurrency(goal, true)}
                            </div>
                        </div>
                        <Button
                            variant="brand"
                            size="extraLarge"
                            onClick={() => {
                                console.log('Opening campaign:', url);
                                router.push(`/campaign?url=${encodeURIComponent(url)}`);
                            }}
                        >
                            Donate
                        </Button>
                    </div>
                    
                </div>
            </div>
            <div className="flex flex-row  px-2 py-3">
                <div className="flex flex-row gap-3">
                    <div ref={heartRef} className="relative">
                        {isLiked ? (
                            <HeartIconSolid 
                                className="w-5 h-5 fill-red-600 cursor-pointer" 
                                onClick={handleUnlike}
                            />
                        ) : (
                            <HeartIcon 
                                className="w-5 h-5 stroke-neutral-500 hover:stroke-neutral-900 dark:hover:stroke-white cursor-pointer" 
                                onClick={handleHeartClick}
                            />
                        )}
                        {showFloatingHeart && typeof window !== 'undefined' && createPortal(
                            <motion.div
                                initial={{ 
                                    x: 0,
                                    y: 0,
                                    scale: 1,
                                    opacity: 1 
                                }}
                                animate={{ 
                                    x: deltaPosition.x,
                                    y: deltaPosition.y,
                                    scale: 0.8,
                                    opacity: 0
                                }}
                                transition={{
                                    x: { 
                                        type: "spring",
                                        stiffness: 80,
                                        damping: 15,
                                        mass: 0.2,
                                        restSpeed: 2
                                    },
                                    y: {
                                        type: "spring",
                                        velocity: -4400,
                                        stiffness: 50,
                                        damping: 13,
                                        mass: 0.8,
                                        restSpeed: 2,
                                        onComplete: () => {
                                            window.dispatchEvent(new Event('heartArrival'));
                                        }
                                    },
                                    opacity: {
                                        duration: 1,
                                        delay: 1,
                                        ease: "easeOut"
                                    }
                                }}
                                onAnimationComplete={() => {
                                    setShowFloatingHeart(false);
                                    toast('Added to your Giving List!', {
                                        icon: <HeartIconSolid className="w-5 h-5 fill-red-600" />,
                                        classNames: {
                                            toast: 'flex flex-row items-center justify-between w-96 font-sans p-4 rounded-md shadow-lg bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900',
                                            title: 'font-bold ml-3',
                                        }
                                    });
                                }}
                                style={{
                                    position: 'fixed',
                                    top: heartRef.current?.getBoundingClientRect().top,
                                    left: heartRef.current?.getBoundingClientRect().left,
                                    pointerEvents: 'none',
                                    zIndex: 9999,
                                }}
                            >
                                <HeartIconSolid className="w-6 h-6 fill-red-600" />
                            </motion.div>,
                            document.body
                        )}
                    </div>
                    <ShoppingBagIcon className="w-5 h-5 stroke-neutral-500 hover:stroke-neutral-900 dark:hover:stroke-white" />
                    <PaperAirplaneIcon className="w-5 h-5 stroke-neutral-500 hover:stroke-neutral-900 dark:hover:stroke-white" />
                </div>
                <div className='grow justify-end items-center flex flex-row gap-2'>
                    {isZakatVerified && (
                        <>
                            <div className="text-right text-sm text-brand-500">Zakat-verified</div>
                            <InformationCircleIcon className="w-5 h-5 stroke-brand-500" />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
} 