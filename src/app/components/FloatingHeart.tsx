'use client';
import { motion } from 'framer-motion';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

interface FloatingHeartProps {
    startPosition: { x: number; y: number };
}

export function FloatingHeart({ startPosition }: FloatingHeartProps) {
    return (
        <motion.div
            initial={{ 
                position: 'fixed',
                left: startPosition.x,
                top: startPosition.y,
                scale: 1,
                opacity: 1
            }}
            animate={{
                y: -200,
                x: 200,
                scale: 0.5,
                opacity: 0
            }}
            transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 100,
                damping: 10
            }}
            className="pointer-events-none fixed"
        >
            <HeartIconSolid className="w-6 h-6 fill-red-600" />
        </motion.div>
    );
} 