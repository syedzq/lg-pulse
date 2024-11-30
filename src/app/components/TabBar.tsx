"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, GlobeAltIcon, PlusCircleIcon, HeartIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function TabBar() {
    const pathname = usePathname();
    
    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[2000] w-full max-w-[350px] px-4">
            <div className="bg-neutral-900/50 backdrop-blur-xl rounded-full h-16 flex items-center justify-around border border-white/5">
                <Link 
                    href="/" 
                    className={`p-3 rounded-full ${pathname === '/' ? 'text-white' : 'text-white/50'}`}
                >
                    <HomeIcon className="w-6 h-6" />
                </Link>
                <Link 
                    href="/globe" 
                    className={`p-3 rounded-full ${pathname === '/globe' ? 'text-white' : 'text-white/50'}`}
                >
                    <GlobeAltIcon className="w-6 h-6" />
                </Link>
                <button 
                    className="p-3 text-white/50 rounded-full"
                    onClick={() => {}}
                >
                    <PlusCircleIcon className="w-6 h-6" />
                </button>
                <button 
                    className="p-3 text-white/50 rounded-full"
                    onClick={() => {}}
                >
                    <HeartIcon className="w-6 h-6" />
                </button>
                <button 
                    className="p-3 text-white/50 rounded-full"
                    onClick={() => {}}
                >
                    <UserCircleIcon className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
} 