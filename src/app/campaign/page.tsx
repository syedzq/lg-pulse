"use client";
import { useSearchParams, useRouter } from 'next/navigation';
import { ChevronLeftIcon, ShareIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CampaignPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const url = searchParams.get('url');
    const [imageUrl, setImageUrl] = useState<string>('');

    useEffect(() => {
        if (url) {
            const screenshotUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url&waitUntil=networkidle2&type=jpeg&overlay.browser=false&viewport.width=1440&viewport.height=2000`;
            setImageUrl(screenshotUrl);
        }
    }, [url]);

    if (!url) {
        console.log('No URL found, redirecting home');
        router.push('/');
        return null;
    }

    return (
        <motion.div 
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.2
            }}
            className="absolute inset-0 bottom-0 bg-white"
            style={{
                position: 'absolute',
                zIndex: 50,
                willChange: 'transform'
            }}
        >
            {/* Campaign Content */}
            <div className="h-full w-full overflow-auto">
                {imageUrl && (
                    <img 
                        src={imageUrl}
                        alt="Campaign Preview"
                        className="w-full h-auto"
                        loading="eager"
                    />
                )}
            </div>
        </motion.div>
    );
} 