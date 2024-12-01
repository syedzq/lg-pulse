'use client';
import { Button } from './Button';
import { useRouter } from 'next/navigation';
import { HeartIcon, ShoppingCartIcon, PaperAirplaneIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { ProgressBar } from './ProgressBar';

interface CampaignCardProps {
    title: string;
    url: string;
    imageUrl?: string;
    fundraiser?: string;
}

export function CampaignCard({ title, url, imageUrl }: CampaignCardProps) {
    const router = useRouter();

    return (
        <div className='min-w-[300px] flex flex-col'>
            <div className="flex flex-col h-fit bg-white rounded-xl overflow-hidden shadow-md transition-colors">
                <div className="h-[224px] bg-neutral-100 animate-pulse">
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
                    <div className='flex flex-row items-center gap-2'>
                        <div className='rounded-full bg-neutral-200 w-6 h-6'></div>
                        <div className='text-xs text-neutral-600'>The Good Charity</div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2 min-h-[48px] text-black">
                            {title}
                        </h3>
                    </div>
                    <ProgressBar progress={0.5} />
                    <div className='flex flex-row justify-between items-center'>
                        <div className='flex flex-col'>
                            <div className='text-2xl font-semibold text-neutral-900'>$50,000</div>
                            <div className='text-sm text-neutral-600'>funded of $100k</div>
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
            <div className="flex flex-row  px-4 py-3">
                <div className="flex flex-row gap-2">
                    <HeartIcon className="w-6 h-6 stroke-neutral-500 hover:stroke-neutral-900" />
                    <ShoppingCartIcon className="w-6 h-6 stroke-neutral-500 hover:stroke-neutral-900" />
                    <PaperAirplaneIcon className="w-6 h-6 stroke-neutral-500 hover:stroke-neutral-900" />
                </div>
                <div className='grow justify-end items-center flex flex-row gap-2'>
                    <div className="text-right text-sm text-brand-500">Zakat-verified</div>
                    <InformationCircleIcon className="w-6 h-6 stroke-brand-500" />
                </div>
            </div>
        </div>
    );
} 