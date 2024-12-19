import { motion } from "framer-motion";

interface FloatingEmojiProps {
    x: number;
    y: number;
}

export function FloatingEmoji({ x, y }: FloatingEmojiProps) {
    return (
        <motion.div
            className="fixed pointer-events-none flex flex-col items-center z-[9999]"
            style={{ left: x, top: y }}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ 
                y: -100,
                opacity: 0,
                scale: 1.2,
                transition: { duration: 1, ease: "easeOut" }
            }}
            exit={{ opacity: 0 }}
        >
            <div className="text-3xl">🤲🏼</div>
            <div className="text-sm font-bold text-brand-500">Ameen!</div>
        </motion.div>
    );
} 