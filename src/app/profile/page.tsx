"use client";
import { Button } from "../components/Button";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { CAMPAIGNS } from "../data/campaigns";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

export default function ProfilePage() {
    const router = useRouter();
    const [isFollowing, setIsFollowing] = useState(false);
    const userCampaigns = CAMPAIGNS.slice(0, 3); // Get first 3 campaigns for demo
    const totalRaised = userCampaigns.reduce((sum, campaign) => sum + (campaign.raised || 0), 0);
    const totalDonors = userCampaigns.reduce((sum, campaign) => sum + (campaign.donorCount || 0), 0);

    const handleFollowClick = () => {
        setIsFollowing(!isFollowing);
        
        if (!isFollowing) {
            toast("You'll receive an email update when The Golden Balance has a new fundraiser.");
        } else {
            toast("You'll no longer receive email updates from The Golden Balance.");
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'The Golden Balance',
                    text: 'Check out The Golden Balance on LaunchGood',
                    url: window.location.href
                });
            } catch (error) {
                if ((error as Error).name !== 'AbortError') {
                    console.error('Error sharing:', error);
                }
            }
        }
    };

    return (
        <div className="max-w-screen-md mx-auto">
            <div className="flex items-center justify-center my-5">
                <img src="https://launchgood.s3.amazonaws.com/static/logos/launchgood-black.svg"
                    className="h-4 dark:invert"
                />
            </div>
            <div className="flex flex-col items-center gap-6 pt-12 pb-6 bg-gradient-to-b from-[#F3E8B7] dark:from-[#90803b] to-white dark:to-neutral-900 sm:rounded-lg">
                <img
                    src="https://yt3.googleusercontent.com/0bIQ4Cv7b4AYt5dV8dl9JsLivwdS2Po-7kcjHVcx2ofbrHv24VFa2eEop6-iSE06xTfVMoobEQ=s900-c-k-c0x00ffffff-no-rj"
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border border-neutral-200"
                />
                <div className="flex flex-col items-center gap-2">
                    <span className="flex items-center gap-2"><h1 className="text-2xl font-bold">The Golden Balance</h1><CheckBadgeIcon className="w-6 h-6 fill-brand-500"/></span>
                    <p className="text-sm leading-3 text-neutral-600 dark:text-white/75">@thegoldenbalance</p>
                </div>
                <div className="flex gap-8">
                    <div className="flex flex-col items-center">
                        <div className="text-lg font-bold">${(totalRaised / 1000).toFixed(0)}K</div>
                        <div className="text-sm leading-3 text-neutral-600 dark:text-white/75">raised</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-lg font-bold">{userCampaigns.length}</div>
                        <div className="text-sm leading-3 text-neutral-600 dark:text-white/75">fundraisers</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-lg font-bold">{totalDonors.toLocaleString()}</div>
                        <div className="text-sm leading-3 text-neutral-600 dark:text-white/75">donors</div>
                    </div>
                </div>
                <div>Now Bismillah. 27. Flint, MI</div>
                <div className="flex flex-col gap-2 w-full max-w-xs">
                    <Button 
                        variant={isFollowing ? "secondary" : "brand"}
                        onClick={handleFollowClick}
                    >
                        {isFollowing ? "Unfollow" : "Follow"}
                    </Button>
                    <Button 
                        variant="tertiary"
                        onClick={handleShare}
                    >
                        Share profile <PaperAirplaneIcon className="ml-2 w-5 h-5" />
                    </Button>
                </div>
            </div>

            <div className="max-w-screen-sm mx-auto px-4 pt-6 pb-4 space-y-8">
                {/* Current Fundraiser */}
                <div className="space-y-4">
                    <h2 className="text-lg sm:text-xl font-bold">Fundraising now</h2>
                    <CampaignPreview campaign={userCampaigns[0]} onClick={() => router.push(`/campaign?url=${encodeURIComponent(userCampaigns[0].url)}`)} />
                </div>

                {/* Previous Fundraisers */}
                <div className="space-y-4">
                    <h2 className="text-lg sm:text-xl font-bold">Previous fundraisers</h2>
                    {userCampaigns.slice(1).map((campaign, index) => (
                        <CampaignPreview 
                            key={index} 
                            campaign={campaign}
                            onClick={() => router.push(`/campaign?url=${encodeURIComponent(campaign.url)}`)}
                        />
                    ))}
                </div>

                {/* Social Links Section */}
                <div className="space-y-4">
                    <h2 className="text-lg sm:text-xl font-bold text-left">Find The Golden Balance elsewhere</h2>
                    <div className="grid grid-cols-4 gap-4">
                        <a 
                            href="https://www.instagram.com/thegoldenbalance"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-2 group"
                        >
                            <div className="w-full p-6 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 transition-colors">
                                <img 
                                    src="/instagram.svg" 
                                    alt="Instagram"
                                    className="w-9 h-9"
                                />
                            </div>
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">Instagram</span>
                        </a>
                        
                        <a 
                            href="https://www.tiktok.com/@thegoldenbalance"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-2 group"
                        >
                            <div className="w-full p-6 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 transition-colors">
                                <img 
                                    src="/tiktok.svg" 
                                    alt="TikTok"
                                    className="w-9 h-9"
                                />
                            </div>
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">TikTok</span>
                        </a>
                        
                        <a 
                            href="https://www.youtube.com/@TheGoldenBalance"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-2 group"
                        >
                            <div className="w-full p-6 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 transition-colors">
                                <img 
                                    src="/youtube.svg" 
                                    alt="YouTube"
                                    className="w-9 h-9"
                                />
                            </div>
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">YouTube</span>
                        </a>
                        
                        <a 
                            href="https://twitter.com/thegoldenbalance"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-2 group"
                        >
                            <div className="w-full p-6 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 transition-colors">
                                <img 
                                    src="/x.svg" 
                                    alt="X"
                                    className="w-9 h-9 dark:invert"
                                />
                            </div>
                            <span className="text-sm text-neutral-600 dark:text-neutral-400">X</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface CampaignPreviewProps {
    campaign: typeof CAMPAIGNS[0];
    onClick: () => void;
}

function CampaignPreview({ campaign }: CampaignPreviewProps) {
    const handleCampaignClick = () => {
        window.open(campaign.url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="flex gap-4">
            <img 
                src={campaign.imageUrl} 
                alt={campaign.title}
                className="w-24 h-20 rounded-lg object-cover cursor-pointer"
                onClick={handleCampaignClick}
            />
            <div className="flex flex-col justify-between flex-1">
                <div>
                    <h3 
                        className="font-bold text-base mb-1 hover:text-brand-500 cursor-pointer transition-colors"
                        onClick={handleCampaignClick}
                    >
                        {campaign.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                        <span>with</span>
                        <div className="flex items-center gap-1">
                            <img 
                                src={campaign.organizer.avatarUrl} 
                                alt={campaign.organizer.name}
                                className="w-5 h-5 rounded-full border border-neutral-200"
                            />
                            <span>{campaign.organizer.name}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-baseline gap-1">
                    <span className="text-brand-500 font-bold">
                        ${campaign.raised?.toLocaleString()}
                    </span>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        raised of ${(campaign.goal || 0).toLocaleString()} goal
                    </span>
                </div>
            </div>
        </div>
    );
}