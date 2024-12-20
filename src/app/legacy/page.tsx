"use client";
import { Button } from "../components/Button";
import { useEffect, useRef, useState } from "react";
import { fetchDuas, DuaComment } from "../services/launchgood";
import { motion, AnimatePresence } from "motion/react";
import Image from 'next/image';
import { FloatingEmoji } from "../components/FloatingEmoji";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const SECTIONS = [
    { id: 'about', label: 'About' },
    { id: 'duas', label: 'Duas' },
    { id: 'donors', label: 'Donors' },
    { id: 'updates', label: 'Updates' }
] as const;

// Add this interface near the top with other types
interface DuaCounts {
    [key: string]: number;
}

// Add this interface for tracking clicked state
interface DuaClicks {
    [key: string]: boolean;
}

// Add this helper function before the component
const getRandomRotation = () => {
    return Math.random() * 1.5 - 1; // Random number between -1 and 1
};

export default function LegacyPage() {
    const [activeSection, setActiveSection] = useState<string>(SECTIONS[0].id);
    const [duas, setDuas] = useState<DuaComment[]>([]);
    const [duaCounts, setDuaCounts] = useState<DuaCounts>({});
    const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
    // Add state for tracking clicked duas
    const [duaClicks, setDuaClicks] = useState<DuaClicks>({});
    // Add state for floating emojis
    const [floatingEmojis, setFloatingEmojis] = useState<{ id: number; x: number; y: number; }[]>([]);
    // Inside the component, add state for rotations
    const [cardRotations, setCardRotations] = useState<Record<string, number>>({});

    // Add this useEffect to initialize random dua counts
    useEffect(() => {
        const initialCounts: DuaCounts = {};
        duas.forEach(dua => {
            initialCounts[dua.id] = Math.floor(Math.random() * 50) + 1;
        });
        setDuaCounts(initialCounts);
    }, [duas]);

    // Add this useEffect to set initial rotations when duas change
    useEffect(() => {
        const rotations: Record<string, number> = {};
        duas.forEach(dua => {
            rotations[dua.id] = getRandomRotation();
        });
        setCardRotations(rotations);
    }, [duas]);

    // Update the click handler
    const handleDuaClick = (id: string, e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = rect.left;
        const y = rect.top;
        
        // Only show animation when adding a dua, not removing
        if (!duaClicks[id]) {
            setFloatingEmojis(prev => [...prev, { id: Date.now(), x, y }]);
            setTimeout(() => {
                setFloatingEmojis(prev => prev.filter(emoji => emoji.id !== Date.now()));
            }, 1000);
        }

        setDuaClicks(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
        
        setDuaCounts(prev => ({
            ...prev,
            [id]: prev[id] + (duaClicks[id] ? -1 : 1)
        }));
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-50% 0px -50% 0px' // Only consider middle 50% of viewport
            }
        );

        Object.values(sectionRefs.current).forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        async function loadDuas() {
            const comments = await fetchDuas(); // Remove the argument
            setDuas(comments);
        }
        loadDuas();
    }, []);

    const scrollToSection = (sectionId: string) => {
        sectionRefs.current[sectionId]?.scrollIntoView({ behavior: 'smooth' });
    };

    // Update the navigation function to include animation
    const navigateCards = (direction: 'left' | 'right') => {
        if (duas.length === 0) return;
        
        const firstCard = document.querySelector('[data-card="0"]');
        if (!firstCard) return;

        // Reverse the animation direction (swipe left when clicking right)
        const targetX = direction === 'right' ? 400 : -400;
        firstCard.animate([
            { transform: 'translateX(0)' },
            { transform: `translateX(${targetX}px)` }
        ], {
            duration: 300,
            easing: 'ease-out'
        });

        setTimeout(() => {
            setDuas(prev => {
                if (direction === 'right' && prev.length > 3) {
                    const [first, ...rest] = prev;
                    return [...rest, first];
                } else if (direction === 'left') {
                    const last = prev[prev.length - 1];
                    return [last, ...prev.slice(0, prev.length - 1)];
                }
                return prev;
            });
        }, 200);
    };

    return (
        <div className="flex flex-col mx-auto items-center w-full">
            {/* Add this near the top of the JSX */}
            <AnimatePresence>
                {floatingEmojis.map(emoji => (
                    <FloatingEmoji 
                        key={emoji.id} 
                        x={emoji.x} 
                        y={emoji.y}
                    />
                ))}
            </AnimatePresence>

            {/* Header section */}
            <header className="space-y-6 bg-neutral-100 pt-8 p-6 dark:bg-neutral-800 w-full flex flex-col items-center">
                <div className="flex flex-col items-center">
                    <svg
                        className="fill-neutral-400 dark:fill-white"
                        xmlns="http://www.w3.org/2000/svg"
                        height="38"
                        width="163.5"
                        viewBox="0 0 1000 232.5"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <path d="m270.72 199.88c2.2-1.1 12-5.4 21.8-9.6 29.8-12.8 37.7-16.4 51.9-24.4 18.3-10.3 31.2-20 31.2-23.5-0.6-2.4-1.5-4.7-2.6-6.9-3.2-7-6.5-15.1-6.9-17-0.6-1.7-1.3-3.5-2.2-5.1l-1.8-3.7 0.7-5.1c0.3-2.1 0.7-4.3 1.2-6.3l0.5-1.2 1.3 1.4c6.6 6.9 12.2 13 12.2 13.3 0 0.6-2.4 0.6-4 0-0.4-0.2-0.9-0.3-1.4-0.3 0.5 1.7 1.2 3.4 2 5 5 11.4 6.5 17.1 6.1 23.3-0.3 4.7-2.2 11.1-4.1 13.9-2.9 4.2-11.9 11.9-20.8 17.9-12.8 8.6-32.1 18.8-37.2 19.8-1.7 0.3-9.5 2.1-17.3 4-22.8 5.5-29 6.8-32.5 6.8-2.1-0.3-2.1-0.3 1.9-2.3zm-166.6-1.8c-1.7-0.6-3.3-1.4-4.8-2.3-3.1-2.4-5.7-5.6-7.4-9.2-0.8-1.7-1.6-3.2-1.6-3.3-1.4 0.5-2.7 1.1-3.9 1.8-6.1 3-12.6 5.3-19.2 6.9-4.7 1.1-6.4 1.3-13.8 1.3-9.7 0-12-0.4-18.4-3.6-8.5-4.3-15.9-14.1-18.5-24.7-0.7-2.9-0.8-4.6-0.6-11 0.1-3.7 0.4-7.4 1-11 1.2-5.5 3-11.1 3.8-11.8s0.8-0.5 0.5 1.5c-0.1 1.2-0.8 4.6-1.5 7.7-2 9.2-1.5 15.4 1.5 21.7 3.9 8.1 10.2 13.5 19.1 16.3 3.9 1.2 4.5 1.3 13 1.3 7.5 0 9.7-0.2 13.8-1.1 6.5-1.5 12.8-3.6 19-6.1l2.9-1.3 0.3-3.9c0.3-3 0.7-5.9 1.3-8.8 1.6-7.9 5.8-19.3 6.4-17.5-0.5 3.1-1.2 6.1-2 9.1-1.7 6.6-2.2 9.8-2.4 13.9-0.2 2.9-0.1 5.3 0 5.3 0.9 0 7.8-3.9 13.1-7.5 8.9-6 15.2-12.1 15.2-14.9-1.1-3-2.3-5.9-3.8-8.8-2.1-4.4-4.8-11.1-6.2-14.9-0.9-2.8-2-5.6-3.4-8.2-1.6-1.9-1.6-2.4-0.7-7.2 1.2-6.2 1.4-7 2.1-7 0.9 0 14 13.4 13.8 14.1-0.3 0.8-2.6 1-4.7 0.4-0.6-0.2-1.3-0.4-2-0.4-0.1 0.1 1.5 3.6 3.6 7.9 5.2 10.8 5.7 12.3 5.9 18.8s-0.5 10.9-2.8 15.5c-2.6 5.2-13.9 15.4-23.4 21l-2.7 1.6 1 1.1c4.1 4.4 13.8 6 22.5 3.8 5.5-1.4 15-6.2 22.4-11.4 9.4-6.5 21.1-17.2 24.4-22.2 1.2-1.8 1.3-2.2 1-4.7-0.1-0.9-0.2-1.9-0.4-2.8-1 0.1-2 0.3-2.9 0.6-2.1 0.5-4.5 0.7-9.3 0.6-6.2-0.2-6.7-0.2-9.3-1.6-1.6-0.8-3-1.9-4.2-3.2-1.2-1.6-1.4-2.2-1.6-5.4-0.5-6.1 1.7-12.2 5.9-16.6 4.2-4.6 8.8-6.1 12.9-4.4 3.3 1.4 8.6 7.4 11.9 13.7 1.5 2.8 1.6 2.9 3 2.5s11.2-4.3 16.3-6.6l1.7-0.8-2.4-2.3c-5.5-5.2-9.6-7.3-14.4-7.3-2 0-3.9 0.3-5.8 0.8-1.6 0.5-2.8 0.7-3 0.4-0.4-0.4 3.3-9.8 4.7-11.7s6.5-3.7 15.2-5.3c16.1-2.9 29.4-1.4 41.8 4.9 1.6 0.8 3.1 1.7 4.4 2.8 1.6 1.5 1.5 1.7-1.7 7.6-2 3.7-2.7 4.4-4.2 5-1 0.4-4.7 2.1-8.3 3.8l-6.5 3.1 1.7 1.1c3.9 2.6 8.6 3.8 15.2 3.8 9.5 0 21.5-1.7 33.9-4.8 7.3-1.8 25.4-7.6 26.1-8.3 0.2-0.2-5.8-2.2-13.3-4.4-13.6-4-13.7-4.1-14.9-3.2-0.6 0.4-1.3 0.8-1.9 1.1-0.9 0.3-19.5-0.9-20.7-1.3-0.6-0.2-0.7-0.6-0.6-1.3 0.4-1.5 5.3-10.3 6.2-11.1s8.1-1.8 15.4-1.8h5.5l13.6 4.4c23 7.4 27 8.4 47.1 11.5l11.1 1.7c0.8 0.1 1.5 0.5 1.5 0.7 0 0.9-5.4 10.3-6.1 10.7-0.5 0.2-3.9 0.1-8.5-0.4-13.6-1.4-20.6 0-48.1 9.5-25.2 8.7-32 10.2-46.3 10.2-7.7 0-9.5-0.1-11.6-0.8-3-1.1-8.1-4.3-12.9-8.4l-3.7-3.1-4 2c-5.3 2.7-21.4 9.6-22.3 9.6-0.5 0-0.7 0.6-0.7 2 0 4.4-3.4 13.6-6.9 18.5-3 4.2-11.6 13-18.2 18.6-10.1 8.5-17.8 13.3-26.5 16.3-3 1.1-6.2 1.6-9.4 1.6-4.8 0.2-5.7 0.1-8.4-0.9zm56.4-66.4c0.5-0.5-2.1-3.6-4.2-5.1-1.2-1-2.7-1.4-4.2-1.3-3.3 0-4.7 0.8-4.9 2.7-0.1 1.7 0.9 3.3 2.5 3.9 1.1 0.4 10.3 0.2 10.8-0.2zm49.4-17.7 5.4-2.7-2.2-1c-3.8-1.7-12.2-2.7-17.4-2l-2.8 0.3 3.2 2.2c1.8 1.3 3.6 2.6 5.3 4.1 0.8 0.8 1.6 1.4 2.6 1.9 2-0.9 4-1.8 5.9-2.8zm-26.5 82.2c-2.3-1-3.8-3.1-3.9-5.6 0-3.8 1.7-8.4 4.7-12.8l1.3-1.9-1.1-0.3c-1-0.4-1.8-0.9-2.6-1.6-1-0.8-1.6-2-1.5-3.3 0-2.6 0.8-4.4 3.5-7.7 2.3-2.8 5.8-5.4 7.3-5.4 0.8 0 2.3 2.1 2.3 3.2-0.4 0.9-0.9 1.7-1.4 2.4-1.4 2-1.4 2-2.1 1-1.2-1.8-3.7-0.9-5.1 1.9-0.7 1.3-0.7 1.4 0.4 2.5 1.5 1.3 3.6 1.9 5.6 1.5 1.5-0.8 2.9-1.9 4.1-3.1 1.7-1.5 3.2-2.7 3.4-2.5 0.4 0.4-0.2 3.4-1.2 5.3-0.8 1.3-1.9 2.4-3.1 3.4-3.7 2.9-7 6.4-9.7 10.3-2.3 3.5-2.5 5.6-0.6 7.1 1.2 0.9 1.9 1 7 0.9 3.5 0.1 7-0.4 10.3-1.3 1.6-0.5 3.2-0.9 4.8-1.1 0.3 0.3-3 3-5.3 4.3-3.5 2-7.6 3.2-11.6 3.3-2.8 0.1-4.5-0.1-5.5-0.5zm190-3.2c0.4-1.1 0.8-2.1 1.3-3.2l1-2.1 27.1-10.2c14.9-5.6 27.3-10.1 27.5-10.1s-0.1 1.1-0.6 2.3c-0.9 2.2-1 2.2-5.5 3.9-4.9 1.9-46.5 18.4-49.4 19.6l-1.8 0.8zm-141.8-1.5c-1-0.5-1.8-1.1-2.6-1.9-1-1.1-1.2-1.7-1.2-4.1 0-3.9 1.4-6.3 7.3-12.6 2.6-2.8 4.6-5.2 4.4-5.4-0.3-0.6-4.4-1.4-6.6-1.4-1.1 0-2.2 0.3-3.2 0.7-1.9 0.8-2 0.5-0.7-2.1 1.5-2.9 2.8-3.5 7.8-3.5 3.6 0 4.5 0.1 5.6 1 3.1 2.3 1.7 5.6-6.2 13.8-5.2 5.4-6.2 6.9-5.6 8.7s2.4 2.2 8.2 2.2c5-0.1 10-0.8 14.8-2.4 1.9-0.6-2.2 3.1-5.4 4.8-5.2 2.5-13.2 3.7-16.6 2.2zm227.4-3.5c-1.9-1.2-3.6-2.5-5.3-4 0-1 4.7-10.2 5.2-10.2s7.9 4.7 9.6 6.2l1 0.9 2-4c1.1-2.2 2.2-4 2.5-4 0.6 0 8.4 5.2 9.9 6.7 0.5 0.4 0.8 0.9 1 1.5 0 0.7-2.5 5.8-3.9 8.1l-1.2 2-5.1-3.5c-2.8-1.9-5.2-3.5-5.3-3.5-0.9 1.2-1.6 2.4-2.2 3.8-1.1 2.1-2.2 3.7-2.5 3.7-2-1.1-3.9-2.3-5.7-3.7zm213 2.6c0.4-1.1 0.8-2.1 1.3-3.2l1-2.1 27.1-10.2c14.9-5.6 27.3-10.1 27.5-10.1s-0.1 1.1-0.6 2.3c-0.9 2.2-1 2.2-5.5 3.9-4.9 1.9-46.5 18.4-49.4 19.6l-1.8 0.8zm72.1 0c0.4-1.1 0.8-2.1 1.3-3.2l1-2.1 27.1-10.2c14.9-5.6 27.3-10.1 27.5-10.1s-0.1 1.1-0.6 2.3c-0.9 2.2-1 2.2-5.5 3.9-4.9 1.9-46.5 18.4-49.4 19.6l-1.8 0.8zm70.2 0c0.4-1.1 0.8-2.1 1.3-3.2l1-2.1 27.1-10.2c14.9-5.6 27.3-10.1 27.5-10.1s-0.1 1.1-0.6 2.3c-0.9 2.2-1 2.2-5.5 3.9-4.9 1.9-46.5 18.4-49.4 19.6l-1.8 0.8zm-317.3-9.3c0.4-1.1 0.8-2.1 1.3-3.2l1-2.1 27.1-10.2c14.9-5.6 27.3-10.1 27.5-10.1s-0.1 1.1-0.6 2.3c-0.9 2.2-1 2.2-5.5 3.9-4.9 1.9-46.5 18.4-49.4 19.6l-1.8 0.8zm77.2-2.4c0.4-1.1 0.8-2.1 1.3-3.2l1-2.1 11.2-4.2 12-4.6c0.8-0.3 0.8-0.4 0-2.1-2.7-6.4-2.7-18.1-0.1-28.9 1.8-7.2 4.7-15.2 5.6-15.2 0.6 0 0.5 0.9-0.8 5.6-2.9 10.7-3.6 15.3-3.3 20.8 0.2 4.8 0.4 5.5 1.9 8.4 1.7 3.3 4.6 6.5 6.5 7 0.7 0.2 4.5-1 11.1-3.5 5.5-2.1 10.2-3.7 10.4-3.6s-0.1 1.1-0.6 2.3c-0.9 2.2-1 2.2-5.5 3.9-2.5 0.9-5.5 2.1-6.6 2.6l-2.1 0.8h4.5c5.6 0 9.7-1 16.6-4.4 11.9-5.7 31.8-21.2 36.6-28.4 2.9-4.4-1.3-7-12.5-7.6-11.9-0.7-15.9-3.6-15.9-11.5 0-5.5 2.1-10.9 5.9-14.9 5.9-6.6 12.3-7 18.1-1.2 1.1 1.1 2.1 2.3 3 3.6 0.4 0.8 1 1.3 1.2 1.3s3.9-2.1 8.2-4.7c7.9-4.7 14.2-8.9 16.5-11.1l1.3-1.2-2.2-1c-1-0.4-2-1.1-2.8-1.8-1-1.3-1.2-4.5-0.3-6.9 0.5-1.6 0.8-3.3 0.7-5-0.1-2.7 0-2.9 1.4-4.1 1.9-1.6 3.4-1.6 7 0.2 3.5 1.7 8.7 6.7 10 9.4 1 2.1 0.8 4.5-0.6 7.3s-1.8 3-6.2 2.6l-3.9-0.3-2.5 2.8c-4.6 5.3-12.3 10.4-21 13.9l-4.7 1.9 1.2 2.3c2.3 4.5 3.5 9.4 3.7 15.8 0.7 14.5-3 20.9-21 36.4-10.5 9.1-19.1 14.8-26.7 17.8-4.9 1.9-7 2.3-11.7 2.3-6.6 0-11.4-1.9-15.4-6.1l-2.1-2.2-12.2 4.9-14.3 5.8-2.3 0.9zm92.5-70.1c-1.7-2.3-5.2-5.1-6.9-5.5-2.1-0.4-5.6 0-6.5 0.8-0.5 0.6-0.7 1.4-0.7 2.2 0 2.8 2.9 3.7 11.4 3.9l3.7 0.1zm44.6-30.8c-0.3-1.4-2.9-4.2-4.5-5-0.5-0.3-1-0.5-1.5-0.6-0.2 1-0.3 2-0.4 3l-0.3 2.9 3.2 0.4c3.6 0.5 3.8 0.5 3.5-0.7zm-9-4c-0.8-3.4-2.1-3.8-4.5-1.4s-2 3.7 2.1 4.7c2.1 0.5 2.2 0.5 2.5-0.5 0.1-1 0.1-1.9-0.1-2.8zm-436 100.3c0.4-1.1 0.8-2.1 1.3-3.2l1-2.1 27.1-10.2c14.9-5.6 27.3-10.1 27.5-10.1s-0.1 1.1-0.6 2.3c-0.9 2.2-1 2.2-5.5 3.9-4.9 1.9-46.5 18.4-49.4 19.6l-1.8 0.8zm77.3-19.5c0.5-6.3 0.4-23.2-0.2-32.2-0.3-4.1-1.2-17-2-28.5-0.8-11.5-1.5-21.9-1.7-23l-0.2-2-2.7 1c-1.5 0.6-13 5.1-25.6 10s-23 8.9-23.1 8.8c-0.3-0.2 1.8-5.3 2.4-5.8 0.3-0.3 11.4-4.5 24.7-9.5s24.1-9 24.1-9-0.1-2.3-0.3-5-0.7-10.7-1.1-17.8c-0.5-7.8-1-13.7-1.4-15.1-1-3.3-0.9-4.5 1-9.5s2.5-6.2 3.3-5.2c0.5 0.6 7.4 18.3 9.3 24 1.2 3.5 1.5 6.4 0.5 6.4-1.2-0.6-2.2-1.5-3-2.4l-2.6-2.5 0.3 4.2c0.1 2.3 0.5 7.8 0.8 12.2l0.6 8 29.9-11.2c16.5-6.2 30-11.1 30.1-11 0.4 0.4-1.7 4.5-2.5 4.8l-13.9 5.3c-21.8 8.2-42.6 16.2-42.9 16.5-0.2 0.2 0.2 7.4 0.8 16s1.5 20.9 1.9 27.3 0.8 12.9 0.9 14.4c0.1 6.5-0.4 13-1.4 19.4-1.1 4.9-2.6 9.7-4.5 14.3-1.4 3-1.8 2.2-1.4-2.8zm388.2 1.2c-7.2-1.4-12.3-7.5-14.3-16.9-1.5-7.3-0.8-21.2 1.6-29.7 0.4-1.4 0.7-2.7 0.9-4.2 0-2.1-3.1 2.6-4.7 7.1-0.5 1.5-2.6 9.3-4.6 17.4-3.9 15.8-5 18.8-8.3 22-1.8 1.8-2.2 2-4.4 2-9.2 0-15.1-12.9-14.4-31.2 0.4-8.9 2.8-19.8 4.1-18.6 0.3 0.3 0.1 2.8-0.5 7-0.7 4.4-1 8.9-0.7 13.3 0.5 13.4 3.6 19.6 9.6 19.7 1.8 0 2.3-0.2 4-2.1 2.6-2.7 3.5-5.1 7-19.5 3.5-14 4.8-18.1 7.2-23 2.2-4.3 4-7.1 6.1-9.2 1.9-1.8 3.9-2 4.7-0.5s0.2 9.4-1.7 19.6c-2.7 14.6-2.7 19.7 0 25.7 1.5 3.2 4.3 6.1 7 7.1 1.8 0.5 3.7 0.7 5.7 0.6 7.6-0.1 13.6-3.1 17.3-8.5 3.1-4.6 3.7-7 3.6-15.5 0-7.7-1.2-15.4-3.5-22.7-1.2-3.8-1.4-5.1-1.2-7.4 0.3-2.9 2.7-10.7 3.5-11.6 0.4-0.4 1 0.5 2.1 3 2.8 6.2 4.5 13 6.6 27 3.5 23.4 8.3 31.6 19.2 32.3 4.4 0.3 7.6-0.7 9.7-3s1.8-3.5-2.7-13c-5.1-10.7-7.1-17.2-9.2-29.2-0.6-3.7-1.5-7.2-1.9-7.8-0.7-1.1-0.7-1.4 0.9-6.3 0.5-1.8 1.2-3.6 2.1-5.4 0.7-0.4 2.2 1.5 7.3 9.1 6.4 9.7 6.8 11.3 2.1 9.1-0.8-0.5-1.7-0.8-2.7-1-0.1 0.1 1.6 5.7 3.8 12.3 5 15.3 6 19.8 6 26.6-0.1 11.3-4.2 19.8-10.7 22-3.8 1-7.8 0.9-11.6-0.2-6.9-2.4-11.1-7.8-14.8-19-1-3.1-1.6-4.2-1.7-3.4-1 6.3-3.4 12.4-7.1 17.6-5 6.7-13.3 9.9-21.4 8.4zm-450.5-3.7c-1.9-1.2-3.6-2.6-5.3-4.1-0.2-0.7 4.6-10.4 5.1-10.4s6.5 3.9 9.4 6.2c1 0.8 1.8 1.7 1.8 2 0 1.1-4.8 10-5.3 10-2-1.1-3.9-2.3-5.7-3.7zm577.6-2.2c0.6-7.5 0.3-24.3-0.8-39.7-0.5-8-1.7-24.9-2.6-37.7s-1.9-28.8-2.3-35.7c-0.4-7.6-1-13.5-1.4-14.9-1-3.4-0.9-4.5 1-9.5 1.9-5 2.5-6.1 3.3-5.2 0.5 0.6 7.4 18.3 9.3 24 1.2 3.5 1.5 6.4 0.5 6.4-1.1-0.6-2.1-1.5-3-2.4l-2.5-2.4v1.4c0 0.8 1 15.9 2.3 33.7s2.5 36.1 2.8 40.7 0.6 9.5 0.7 10.8c0.1 6.4-0.4 12.9-1.4 19.3-1.1 4.9-2.6 9.7-4.5 14.3-1.5 3-1.9 2.2-1.5-2.8zm-419.2 3.6c-5.7-1.9-10.3-6.1-13.7-12.5-2.8-5.4-4.4-10.1-6-18-0.7-3.5-1.3-5.9-1.3-5.3-0.3 1.7-0.7 3.3-1.2 4.9-1 3.3-1.6 4.2-3.6 6.2-4.5 4.5-13.5 8.2-19.9 8.2-5.8 0-7.5-1.9-7.5-8.3 0-8.8 4-17.2 11.9-25.1 2.9-2.9 10.9-10 12.9-11.3-0.2-1.4-0.5-2.8-1-4.1-1.1-4-1.1-4-0.3-7.2 1.1-4.3 3-9.2 3.6-9.4s2.8 5.2 4.3 10.6c0.6 1.9 1.1 3.8 1.2 4.1 0.2 0.7 3.5-1.5 8.4-5.7 4-3.4 4.4-2.8 1.8 2.4-1.3 2.6-3.1 5-5.2 7l-3.5 3.4 2.9 13.4c1.7 7.7 3.6 15.2 4.5 17.5 2.6 6.8 7.9 12.9 13 15.1 1.5 0.6 2.5 0.7 6.6 0.3 9.2-0.9 13.5-3.1 22.9-12.2 4.9-4.7 7.1-6.5 7.9-6.5 1.4 0 1.7 0.7 1.2 3.2-0.4 2.6 0 5.2 1 7.6 2.2 4.9 8.5 6.1 15.1 2.8 3.6-1.8 5.6-3.7 6-5.7 0.9-4.6 0.4-15.6-3.4-67.1-0.8-10.6-1.6-23.9-1.9-29.7-0.3-7.1-0.7-11.3-1.2-12.8-0.4-1.4-0.6-2.8-0.5-4.2 0.8-3.6 2-7.2 3.6-10.6 1-1.5 1.4-0.5 8 17.1 3.5 9.3 4.5 13.3 3.2 13.3-1.1-0.7-2.1-1.5-3-2.4l-2.5-2.4v2.1c0 1.1 1.1 15.7 2.4 32.2 3.6 45.2 3.6 55 0.1 66.4-2.6 8.8-8 16.2-13 18.2-4.3 1.6-9.2 1.2-13.1-1.2-2.2-1.4-4.1-4.8-4.6-8.4s-1-4.5-2-4c-1.8 1.6-3.5 3.3-5 5.2-5.8 6.6-10.6 10-16.8 11.8-3.1 1.1-10.6 1.6-12.3 1.1zm-34.7-31.3c6.5-2.3 10.5-5.3 11-8.5 0.3-1.8-0.7-7.6-2.1-12.5l-0.8-2.6-3.5 3c-5 4.2-13.2 12.7-15.7 16-2.1 2.9-2.5 4.4-1.5 5.5 1 0.9 9.3 0.4 12.6-0.9zm212.8 25.3c0.6-7.5 0.3-24.3-0.8-39.7-0.5-8-1.7-24.9-2.6-37.7s-2-28.9-2.3-35.8c-0.4-7.6-1-13.5-1.4-14.9-1-3.4-0.9-4.5 1-9.5 1.9-5 2.6-6.1 3.3-5.1 0.5 0.6 7.4 18.3 9.3 24 1.2 3.5 1.5 6.4 0.5 6.4-1.1-0.6-2.1-1.5-3-2.4l-2.5-2.4v1.4c0 0.8 1 15.9 2.3 33.7s2.5 36.1 2.8 40.7c0.3 4.6 0.6 9.5 0.7 10.8 0.1 6.4-0.4 12.9-1.4 19.2-1.1 4.9-2.6 9.7-4.5 14.3-1.3 2.9-1.7 2.1-1.4-2.9zm208.6 4.1c-4.7-0.9-8-3.6-10.4-8.6-3.8-7.7-4.2-12.9-5.9-63.7-0.9-26.3-1.3-32.8-2.6-42.1l-1-7.2-14.8 6c-8.1 3.3-14.8 5.9-14.9 5.8-0.3-0.2 1.8-5.3 2.4-5.8 0.3-0.3 6.2-2.6 13.2-5.2s12.7-4.8 12.8-4.9c-0.2-1.3-0.4-2.6-0.8-3.9-0.5-1.8-0.8-3.6-1-5.4 0-2.9 2.7-10.6 3.7-10.6 0.7 0 3.2 6.7 4.5 11.7 0.4 1.7 0.8 3.4 1.4 5 3.6-1 7.1-2.2 10.6-3.6 5.7-2.1 10.4-3.8 10.5-3.7-0.1 0.8-0.4 1.6-0.8 2.4-0.9 2.1-1.1 2.3-4.8 3.7-14.4 5.5-14.8 5.7-14.8 6.6 0 0.5 0.3 3.5 0.7 6.6 1.2 9.5 1.7 21.4 3.1 66.8 0.3 8.6 0.6 17.4 0.7 19.4 0.7 9.1 3.7 15.2 8.3 16.9 1.8 0.4 3.6 0.6 5.5 0.6 4.8 0 7.2-0.9 9.1-3.4 1.2-1.6 1.3-1.9 0.8-3.4-0.9-2.2-2-4.3-3.2-6.4l-2.6-4.6 0.3-3c0.3-2.9 1.7-7.4 2.7-8.3 0.6-0.6 1.8 0.9 4.1 5.4 2.6 5 3.1 7.6 3.1 15.4 0 7.1-0.6 10.1-2.6 14.2-1.6 2.8-3.8 5.2-6.6 6.9-2 1-6.9 1.2-10.7 0.4zm-296.6-8.7c0.6-7.5 0.3-24.3-0.8-39.7-0.5-8-1.7-24.9-2.6-37.7s-1.9-28.9-2.3-35.8c-0.4-7.6-1-13.6-1.4-14.9-1-3.3-0.9-4.5 1-9.5 1.9-5 2.5-6.1 3.3-5.2 0.5 0.6 7.4 18.3 9.3 24 1.2 3.5 1.5 6.4 0.5 6.4-1.1-0.6-2.1-1.5-3-2.4l-2.5-2.4v1.4c0 0.8 1 15.9 2.3 33.7s2.5 36.1 2.8 40.7c0.3 4.6 0.6 9.5 0.7 10.8 0.1 6.4-0.4 12.9-1.4 19.2-1.1 4.9-2.6 9.7-4.5 14.3-1.3 2.9-1.7 2.1-1.4-2.9zm39.2 4.1c-4.7-0.9-8-3.6-10.4-8.6-3.8-7.7-4.2-12.7-5.9-63.9-0.4-12.2-0.9-24.3-1.1-26.8l-0.3-4.5-7.2 3c-4 1.6-7.3 2.9-7.4 2.8-0.3-0.2 1.8-5.3 2.4-5.8s2.8-1.4 10.9-4.4l1-0.4-1.1-6.9c-0.6-3.8-1.7-9.4-2.5-12.3-0.7-2.3-1.1-4.7-1.4-7.1 0-2.9 2.7-10.7 3.7-10.7 0.6 0 3.1 6.3 4.2 10.5 1.3 5.3 2.3 10.7 2.9 16.1 0.3 2.4 0.6 5.2 0.8 6.1l0.2 1.7 17.8-6.7c9.8-3.7 18-6.6 18.2-6.6s-0.1 1.1-0.6 2.3c-1 2.2-1 2.2-5.9 4.1-2.7 1-10.4 4-17 6.6l-12 4.7v2.2c0 1.2 0.2 6.6 0.5 12s0.7 17.7 1 27.4c1 36.9 1.3 40.4 3.8 45.7 1.2 2.5 3.2 4.5 5.7 5.6 1.8 0.4 3.6 0.6 5.5 0.6 4.8 0 7.2-0.9 9.1-3.4 1.2-1.6 1.3-1.9 0.8-3.4-0.9-2.2-2-4.3-3.2-6.4l-2.6-4.6 0.3-3c0.3-2.9 1.7-7.4 2.7-8.3 0.6-0.6 1.8 0.9 4.1 5.4 2.6 5 3.1 7.6 3.1 15.4 0 7.1-0.6 10.1-2.6 14.2-1.6 2.8-3.8 5.2-6.6 6.9-2 1-6.9 1.2-10.7 0.4zm-563-16.6c-2-0.9-4.2-3.7-5.2-6.8-0.7-2.2-0.9-4.1-0.8-11.3 0-7.7 0.2-9.3 1.3-14.7 2.1-9.2 5.2-18.1 9.4-26.5 3.4-7 4.7-9.2 5.1-8.8-0.6 2.8-1.4 5.5-2.3 8.2-5.9 18.6-7.7 26.2-7.7 33.3 0 7.7 2 12 6 12.6 3.6 0.5 6.3-1.6 10.4-8.1 1.6-2.5 2.4-3.1 2.4-1.6 0 1.3-2.6 11.4-3.7 14-1.8 4.5-4.7 8.5-7.2 9.8-1.5 0.7-5.7 0.7-7.7-0.1zm53-8.2c-1.9-1.2-3.6-2.6-5.3-4.1-0.2-0.7 4.6-10.4 5.1-10.4s6.5 3.9 9.4 6.2c1 0.8 1.8 1.7 1.8 2 0 1.1-4.8 10-5.3 10-2-1.1-3.9-2.3-5.7-3.7zm394.2-17.8c-0.7-0.7-1.3-1.6-1.6-2.6-1-2.7-0.7-8.7 0.7-13.6 0.9-3.1 4.9-11.9 5.4-11.9 0.2 0 0.2 0.3-1.7 6.6-2.5 8.3-2.8 13.2-0.9 15.1 1.4 1.4 3.1 0.8 4.6-1.6s1.9-1.7 1.1 1.4c-1.6 5.9-4.5 8.4-7.5 6.6zm379.9-8.9c-1.9-1.2-3.6-2.6-5.3-4.1-0.2-0.7 4.6-10.4 5.1-10.4s6.5 3.9 9.4 6.2c1 0.8 1.8 1.7 1.8 2 0 1.1-4.8 10.1-5.3 10-2-1.1-3.9-2.3-5.7-3.7zm-797-7.8c-0.3-6.3-0.9-10.6-3.3-23.6-1-5.3-1.1-6.8-0.7-8.9 0.5-3.1 2.6-5.7 5.5-6.7 0.9-0.3 1.8-0.8 2.7-1.2 0.3-0.3-2.2-1.8-2.9-1.8-0.8 0.5-1.5 1.2-2.1 2-1.8 1.9-1.8 1.9-1.8 0.7 0-2.7 0.9-5.4 2.5-7.7l1.4-1.6-1.1-3.4c-2.4-7.3-5.8-13.2-6.5-11.2-0.1 0.3-0.7 0.6-1.3 0.6-1.2 0-4.9-3.2-4.9-4.3 0-0.8 2.6-5.4 3.3-5.8 1-0.6 3.5 0.4 5.4 2.3 2.4 2.4 4.2 6 5.3 10.9 0.5 2 1 3.3 1.1 2.9s0.8-3.2 1.5-6.3c0.6-2.6 1.3-5.2 2.2-7.8 1-2.4 3.6-5 5-5 1.2 0 3.5 2 4.2 3.7 0.6 1.5 0 4.9-1 5.5-0.3 0.2-1.2-0.5-2-1.4-0.6-0.8-1.3-1.4-2.2-1.8-1.8 0-3.1 3-4.9 11.4-0.6 3-1.5 6.4-1.8 7.5-0.3 0.6-0.5 1.3-0.5 2 3.4 1.2 8.5 5.5 9 7.5 0.1 1.2-0.2 2.4-0.7 3.5l-1 2.3-3.8 1c-4.6 1.2-7.3 2.4-8.2 3.4-0.6 0.6-0.5 1.4 0.5 5.5 0.7 2.6 1.6 6.8 2 9.2 1.2 7 1 22.9-0.3 22.9-0.2 0.1-0.5-2.8-0.6-6.3zm14 5.3c0.4-1.1 0.8-2.1 1.3-3.1l1-2.1 35.2-13c19.3-7.2 35.3-12.9 35.5-12.8s-0.2 1.2-0.7 2.4c-1.2 2.5 1 1.5-24 10.8-26 9.7-39.7 14.9-44.6 17.1-3.8 1.6-4 1.7-3.7 0.7zm518.6-4.5c-1.9-1.2-3.6-2.6-5.3-4.1-0.2-0.7 4.6-10.4 5.1-10.4s6.5 3.9 9.4 6.2c1 0.8 1.8 1.7 1.8 2 0 1.1-4.8 10-5.3 10-2-1.1-3.9-2.3-5.7-3.7zm-428.8-9.8c0.1-0.2 5.2-3.4 11.2-7 10.9-6.6 17.1-10.8 19.6-13.4l1.3-1.5-2.1-1.4c-5-3.2-5.2-7.9-0.5-12.8 2.4-2.5 4-3.4 6.1-3.4 2.4 0 3.3 1.5 3.2 5.5 0 1.8-0.3 3.6-0.7 5.3-0.6 2-0.6 2.2 0.1 2.5 0.8 0.4 1.5 0.9 2.1 1.5 1.5 1.4 1.4 2.2-0.4 5l-1.1 1.8-1.9-1.5-1.8-1.5-3.2 3.4c-6 6.5-13.4 11.2-24.1 15.2-7.2 2.8-8.3 3.1-7.8 2.3zm35.2-29.3c0.2-0.9 0.1-1.8-0.1-2.7-0.3-1.2-0.7-1.5-1.9-1.6-1.8-0.2-3.6 1.2-3.2 2.4 0.3 0.8 3.7 3.1 4.5 3.2 0.2-0.1 0.5-0.7 0.7-1.3zm466.5 26.8c0.4-1.1 0.8-2.1 1.4-3.2l1-2.1 27.1-10.1c14.9-5.6 27.3-10.1 27.5-10.1s-0.1 1.1-0.6 2.3c-0.9 2.2-1 2.2-5.5 3.9-4.9 1.8-46.5 18.3-49.4 19.6l-1.8 0.8zm99.3-2.5c-1.6-1.6-2.2-3.8-2.2-8.5 0-3.4-0.1-3.9-0.9-4.3-0.5-0.3-0.9-0.9-0.9-1.5 0.3-1.8 1.3-3.5 2.8-4.5 1.6-0.9 1.9 0.2 1.6 5.2-0.5 7.2 1.2 10 4.8 8.2 1.7-1 2.8-2.7 2.8-4.7-0.1-1.6-0.4-3.1-0.7-4.7-0.7-3.2-0.7-3.7 0-5.3 0.5-1.2 0.9-1.6 1.2-1.3 0.7 0.7 1.8 5.3 2.3 9.4 0.3 3 0.6 3.7 1.6 4.6 1.4 1.2 3.6 1.4 4.7 0.3 0.4-0.4 0.7-0.9 0.6-1-3.5-6.5-4.4-10.4-2.9-13.2 0.6-1.2 0.9-1.4 1.2-0.9s0.4 1.1 0.4 1.7c0.4 1.9 1 3.8 1.7 5.6 1.4 3.8 1.6 5.1 1.5 7-0.4 4-2.8 7.7-4.9 7.7-2-0.1-3.8-1.3-4.6-3.2l-0.9-1.8-1 2.2c-1.7 4.1-5.7 5.5-8.2 3.1zm-300.3-10c1.6-1.3 5.9-3.8 14.2-8.2 2.9-1.5 5.7-3.1 8.4-4.9l1.5-1.2-1-0.5c-1.8-1-9-1.6-16.6-1.4-2.6 0.2-5.3 0.1-7.9-0.1-0.4-0.2 0.3-1.8 2.2-5 4.1-6.9 4.3-7 16.5-6.9s17.3 1 17.9 3.5c0.9 3.2-10.1 16.8-15.8 19.6-2.5 1.2-14.9 5-19 5.8l-1.6 0.3zm132.8-1.3c-1.6-1.6-2.2-3.8-2.2-8.5 0-3.4-0.1-3.9-0.9-4.3-0.5-0.3-0.9-0.9-0.9-1.5 0.3-1.8 1.3-3.5 2.8-4.6 1.6-0.9 1.9 0.2 1.6 5.2-0.5 7.2 1.2 10 4.8 8.2 1.7-1 2.8-2.7 2.9-4.6-0.1-1.6-0.4-3.1-0.7-4.7-0.7-3.2-0.7-3.7 0-5.3 0.5-1.2 0.9-1.6 1.2-1.3 0.7 0.7 1.8 5.3 2.3 9.4 0.3 3 0.6 3.7 1.6 4.6 1.4 1.2 3.6 1.4 4.7 0.3 0.4-0.4 0.7-0.9 0.6-1-3.5-6.5-4.3-10.4-2.9-13.2 0.6-1.2 0.9-1.4 1.2-0.9s0.4 1.1 0.4 1.7c0.4 1.9 1 3.8 1.7 5.6 1.4 3.8 1.6 5.1 1.5 7-0.4 4-2.8 7.7-4.9 7.7-2-0.1-3.7-1.3-4.6-3.1l-0.9-1.8-1 2.2c-1.6 4-5.6 5.4-8.1 2.9zm-735.6-2.1c-0.7-0.7-1.3-1.6-1.6-2.6-1-2.7-0.7-8.7 0.7-13.6 0.9-3.1 4.9-11.9 5.3-11.9 0.2 0 0.2 0.3-1.7 6.5-2.5 8.4-2.8 13.3-0.9 15.2 1.4 1.4 3.1 0.8 4.6-1.6s1.9-1.7 1.1 1.4c-1.6 5.9-4.5 8.4-7.5 6.6zm147-4.6c-0.7-0.7-1.3-1.6-1.6-2.6-1-2.7-0.7-8.7 0.7-13.6 0.9-3.1 4.9-11.9 5.4-11.9 0.2 0 0.2 0.3-1.7 6.5-2.5 8.3-2.8 13.2-0.9 15.1 1.4 1.4 3.1 0.8 4.6-1.6s1.9-1.7 1 1.4c-1.7 5.9-4.6 8.5-7.6 6.7zm58 0c-0.7-0.7-1.3-1.6-1.6-2.6-1-2.7-0.7-8.7 0.7-13.6 0.9-3.1 4.9-11.9 5.4-11.9 0.2 0 0.2 0.3-1.7 6.5-2.5 8.3-2.8 13.2-0.9 15.1 1.4 1.4 3.1 0.8 4.6-1.6s1.9-1.7 1 1.4c-1.6 5.7-4.5 8.3-7.5 6.5zm279.4 0c-0.7-0.7-1.3-1.6-1.6-2.6-1-2.7-0.7-8.7 0.7-13.5 0.9-3.1 4.9-11.9 5.3-11.9 0.2 0 0.2 0.3-1.7 6.6-2.5 8.3-2.8 13.2-0.9 15.1 1.4 1.4 3.1 0.8 4.6-1.6s1.9-1.7 1 1.4c-1.5 5.7-4.4 8.3-7.4 6.5zm91.2-7.2c0.4-7.3-1.6-12.2-7.5-18.4-1.2-1.2-2.3-2.5-3.2-3.9 0-1.1 2-4.2 2.7-4.2 1.2 0 6.5 5.9 8 8.8 3 6 3.7 14 1.7 19.4-1.4 3.8-1.9 3.3-1.7-1.7z" />
                    </svg>
                    <p className="text-center text-sm text-neutral-600 dark:text-neutral-300">To God we belong, and to Him we return.</p>
                </div>
                <div className="w-[342.50px] h-[246.67px] p-2.5 origin-top-left rotate-[1.13deg] bg-white shadow-lg justify-center items-center inline-flex">
                    <Image 
                        className="w-[324.06px] h-[228.77px]" 
                        src="/legacy.jpg" 
                        alt="Legacy photo"
                        width={324}
                        height={229}
                    />
                </div>
                <div className="space-y-1 flex flex-col items-center">
                    <div className="text-neutral-600 dark:text-neutral-300">Sadaqah Jariyah for</div>
                    <div className="font-bold text-3xl ">Hammad Alam</div>
                    <div className="text-neutral-600 dark:text-neutral-300">Organized by <a className="text-neutral-900 dark:text-white underline" href="">Leo Chau</a></div>
                </div>
                <div className="space-y-1 flex flex-col items-center">
                    <div className="text-neutral-600 dark:text-neutral-300 text-sm"><span className="font-bold text-2xl text-brand-500 ">$109,394</span> raised</div>
                    <div className="text-neutral-600 dark:text-neutral-300 text-sm"><span className="text-neutral-900 dark:text-white ">278</span> donors, <span className="text-neutral-900 dark:text-white ">12</span> days left</div>
                </div>
                <div className="flex flex-row space-x-3">
                    <Button size="extraLarge" className="w-fit">Share</Button>
                    <Button variant="brand" size="extraLarge" className="w-fill">Donate</Button>
                </div>
            </header>

            {/* Sticky Navigation */}
            <div className="sticky top-0 z-50 w-full bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700">
                <div className="max-w-screen-lg mx-auto flex justify-center">
                    {SECTIONS.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className={`py-4 px-6 text-sm font-medium transition-colors ${
                                activeSection === section.id
                                    ? 'text-neutral-900 dark:text-white border-b-2 border-neutral-900 dark:border-white'
                                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border-b-2 border-transparent'
                            }`}
                        >
                            {section.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Sections */}
            <div className="w-full max-w-screen-md">
                <div
                    ref={el => void (sectionRefs.current['about'] = el)}
                    id="about"
                    className="p-6"
                >
                    <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                        Join us in providing much-needed support and hope for Haifa and Inara as they navigate life after the heartbreaking loss of their husband and father, Hammad.
                    </h2>
                    
                    <hr className="my-6 border-neutral-200 dark:border-neutral-700" />
                    
                    <div className="h-auto overflow-y-hidden relative">
                        <div className="[&>p]:mb-6 [&>p]:break-words [&_img]:mb-3 text-neutral-600 dark:text-neutral-300">
                            <p><strong>Honoring Hammad&apos;s Legacy - Support Haifa and Inara</strong></p>
                            
                            <p>
                                <strong>Call-to-Action:</strong><br />
                                Join us in honoring the legacy of Hammad, a lawyer who fought for equal justice for Muslim and marginalized communities nationwide. With Hammad&apos;s sudden passing, we must support his wife, Haifa, and their 6-month-old daughter, Inara. Your contribution makes a world of difference in their lives.
                            </p>
                            
                            <p>
                                <strong>Story:</strong><br />
                                Hammad was not just a father to Inara and a husband to Haifa; he was a champion for justice. Through his legal career, he tirelessly advocated for the rights of Muslim and marginalized groups across the country. His impact reached thousands, offering hope to those who needed it most.
                            </p>
                            
                            <p>
                                Hammad&apos;s sudden departure leaves a void in our hearts and communities. Muslim communities far and wide will feel the loss of this extraordinary advocate. But amidst our grief, we have the opportunity to make a lasting impact.
                            </p>
                            
                            <p>
                                <strong>How You Can Support:</strong><br />
                                <strong>1. Donate:</strong> Your financial support will go directly to Haifa, helping her manage bills and expenses during this challenging time.<br />
                                <strong>2. Contribute to Inara&apos;s Future:</strong> We aim to establish a college fund for Inara, ensuring that her father&apos;s dream of education lives on.
                            </p>
                            
                            <p>
                                Hammad&apos;s legacy of fighting for justice can continue through your support. Let&apos;s stand together and ensure that his family receives the help they need during this difficult journey. Donate today to make a meaningful difference in their lives.
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    ref={el => void (sectionRefs.current['duas'] = el)}
                    id="duas"
                    className="p-6"
                >
                    <h2 className="text-2xl font-bold mb-4">Duas</h2>
                    {duas.length === 0 ? (
                        <div className="text-center py-8 text-neutral-600 dark:text-neutral-400">
                            Loading duas...
                        </div>
                    ) : (
                        <div className="relative h-[300px] w-[calc(100vw-48px)] md:w-full max-w-md mx-auto overflow-visible">
                            {/* Add navigation buttons */}
                            <div className="hidden md:flex absolute -left-16 top-1/2 -translate-y-1/2">
                                <button
                                    onClick={() => navigateCards('left')}
                                    className="p-2 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                                >
                                    <ChevronLeftIcon className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
                                </button>
                            </div>
                            <div className="hidden md:flex absolute -right-16 top-1/2 -translate-y-1/2">
                                <button
                                    onClick={() => navigateCards('right')}
                                    className="p-2 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                                >
                                    <ChevronRightIcon className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
                                </button>
                            </div>

                            {duas.slice(0, 3).map((dua, index) => (
                                <motion.div
                                    key={dua.id}
                                    data-card={index}
                                    className="absolute w-full overflow-visible"
                                    style={{ 
                                        zIndex: 3 - index,
                                        filter: `opacity(${index === 0 ? 1 : index === 1 ? 1 : 0.7})`,
                                        transform: `translateY(${index * 8}px)`,
                                        rotate: cardRotations[dua.id] || 0
                                    }}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={1}
                                    onDragEnd={(e, { offset }) => {
                                        const swipe = offset.x;
                                        if (Math.abs(swipe) > 100) {
                                            setDuas(prev => {
                                                const newDuas = prev.filter((_, i) => i !== 0);
                                                if (prev.length > 3) {
                                                    return [...newDuas, prev[3]];
                                                }
                                                return newDuas;
                                            });
                                        }
                                    }}
                                    whileDrag={{ scale: 1.05 }}
                                    initial={{ 
                                        scale: index === 2 ? 0.95 : 1, 
                                        opacity: 0,
                                        y: index === 2 ? (3 * 8) : (index * 8),
                                        rotate: cardRotations[dua.id] || 0
                                    }}
                                    animate={{ 
                                        scale: 1,
                                        opacity: 1,
                                        x: 0,
                                        y: index * 8,
                                        rotate: cardRotations[dua.id] || 0
                                    }}
                                    exit={{ 
                                        x: -400,
                                        opacity: 0,
                                        transition: { duration: 0.3 }
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20
                                    }}
                                >
                                    <div className="bg-white dark:bg-neutral-800 overflow-clip rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] h-[300px] flex flex-col backdrop-blur-sm">
                                        <div className="p-6 flex-1 overflow-y-auto">
                                            <p className="font-serif  font-light text-neutral-900 dark:text-white text-lg">
                                                {dua.comment}
                                            </p>
                                        </div>
                                        <div className="p-6 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1">
                                                    <div className="text-neutral-900 dark:text-white font-medium">
                                                        {dua.userDisplayName}
                                                    </div>
                                                    <div className="text-neutral-600 dark:text-neutral-400 text-sm">
                                                        {dua.userDisplayLocation}
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDuaClick(dua.id, e);
                                                    }}
                                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors ${
                                                        duaClicks[dua.id]
                                                            ? 'bg-brand-100 dark:bg-brand-800 border-2 border-brand-600 dark:border-brand-400'
                                                            : 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-600'
                                                    }`}
                                                >
                                                    <span className={`font-medium ${
                                                        duaClicks[dua.id]
                                                            ? 'text-brand-900 dark:text-brand-100'
                                                            : 'text-neutral-900 dark:text-white'
                                                    }`}>
                                                        {duaCounts[dua.id] || 0}
                                                    </span>
                                                    <span className="text-lg">
                                                        🤲🏼
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                <div
                    ref={el => void (sectionRefs.current['donors'] = el)}
                    id="donors"
                    className="p-6"
                >
                    <h2 className="text-2xl font-bold mb-4">Donors</h2>
                    <p className="text-neutral-600 dark:text-neutral-300">
                        Donors section content...
                    </p>
                </div>

                <div
                    ref={el => void (sectionRefs.current['updates'] = el)}
                    id="updates"
                    className="p-6"
                >
                    <h2 className="text-2xl font-bold mb-4">Updates</h2>
                    <p className="text-neutral-600 dark:text-neutral-300">
                        Updates section content...
                    </p>
                </div>
            </div>
        </div>
    );
}