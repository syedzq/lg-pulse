"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, GlobeAltIcon, PlusCircleIcon, HeartIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function TabBar() {
    const pathname = usePathname();
    const isGlobePage = pathname === '/globe';
    
    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[2000] w-full max-w-[350px] px-4">
            <div className={`${isGlobePage ? 'bg-neutral-900/50' : 'bg-neutral-100'} backdrop-blur-xl rounded-full h-16 flex items-center justify-around border ${isGlobePage ? 'border-white/5' : 'border-black/5'}`}>
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
            </div>
        </div>
    );
} 