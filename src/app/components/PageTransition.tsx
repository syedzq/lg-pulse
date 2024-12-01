"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const pageTransitionVariants = {
    initial: (direction: number) => ({
        x: direction > 0 ? "100%" : "-100%",
        opacity: 0,
        filter: "blur(10px)"
    }),
    animate: {
        x: 0,
        opacity: 1,
        filter: "blur(0px)"
    },
    exit: (direction: number) => ({
        x: direction > 0 ? "-100%" : "100%",
        opacity: 0,
        filter: "blur(10px)"
    })
};

const getPageIndex = (pathname: string) => {
    const routes = ['/', '/globe'];
    return routes.indexOf(pathname);
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const currentIndex = getPageIndex(pathname);
    const direction = currentIndex;

    return (
        <motion.div
            key={pathname}
            custom={direction}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransitionVariants}
            transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                filter: { duration: 0.2 }
            }}
            className="w-full h-full"
        >
            {children}
        </motion.div>
    );
} 