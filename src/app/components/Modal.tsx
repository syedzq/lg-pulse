"use client";
import { motion, AnimatePresence } from 'motion/react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Button } from './Button';
import { useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    originRect?: DOMRect | null;
    useOriginAnimation?: boolean;
}

export default function Modal({ isOpen, onClose, children, title, originRect, useOriginAnimation = false }: ModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (useOriginAnimation && originRect) {
        return (
            <AnimatePresence mode="sync">
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            onClick={onClose}
                            className="fixed inset-0 bg-black/30 z-[5000]"
                        />
                        <div className="fixed inset-0 z-[5000] pointer-events-none overflow-auto">
                            <motion.div
                                initial={{
                                    position: 'fixed',
                                    top: originRect.top,
                                    left: originRect.left,
                                    width: originRect.width,
                                    height: originRect.height,
                                    scale: 1,
                                    opacity: 1,
                                    filter: 'blur(0px)',
                                    boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)'
                                }}
                                animate={{
                                    position: 'fixed',
                                    top: `${window.innerHeight / 2}px`,
                                    left: `${window.innerWidth / 2}px`,
                                    x: '-50%',
                                    y: '-50%',
                                    width: window.innerWidth >= 768 ? '800px' : '500px',
                                    height: 'auto',
                                    scale: 1,
                                    opacity: 1,
                                    filter: 'blur(0px)',
                                    boxShadow: '0 16px 70px -12px rgba(0, 0, 0, 0.25)'
                                }}
                                exit={{
                                    position: 'fixed',
                                    top: originRect.top,
                                    left: originRect.left,
                                    width: originRect.width,
                                    height: originRect.height,
                                    x: 0,
                                    y: 0,
                                    scale: 1,
                                    opacity: [1, 1, 0],
                                    filter: ['blur(0px)', 'blur(0px)', 'blur(2px)'],
                                    boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)'
                                }}
                                transition={{
                                    type: "spring",
                                    damping: 25,
                                    stiffness: 350,
                                    restDelta: 0.5,
                                    restSpeed: 0.5,
                                    mass: 0.8,
                                    opacity: {
                                        times: [0, 0.6, 1],
                                        duration: 0.4
                                    },
                                    filter: {
                                        times: [0, 0.6, 1],
                                        duration: 0.4
                                    },
                                    exit: {
                                        type: "spring",
                                        damping: 50,
                                        stiffness: 350,
                                        restDelta: 0.01,
                                        restSpeed: 0.01
                                    }
                                }}
                                style={{
                                    WebkitBackfaceVisibility: "hidden",
                                    WebkitPerspective: "1000",
                                    WebkitTransform: "translate3d(0,0,0)",
                                    WebkitTransformStyle: "preserve-3d"
                                }}
                                className="bg-white dark:bg-neutral-800 rounded-xl pointer-events-auto max-h-[85vh] overflow-hidden will-change-transform flex flex-col"
                            >
                                <ModalContent title={title} onClose={onClose}>
                                    {children}
                                </ModalContent>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        );
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/30 z-[5000]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.75, y: 50, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.75, y: 50, filter: 'blur(10px)' }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 350,
                            exit: {
                                type: "spring",
                                damping: 50,
                                stiffness: 350,
                            }
                        }}
                        className="fixed grid place-items-center inset-0 z-[5000] pointer-events-none"
                    >
                        <div className="w-[500px] sm:w-[800px] max-h-[85vh] bg-white dark:bg-neutral-800 rounded-xl shadow-xl pointer-events-auto z-[5000] flex flex-col">
                            <ModalContent title={title} onClose={onClose}>
                                {children}
                            </ModalContent>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

function ModalContent({ title, onClose, children }: { title?: string, onClose: () => void, children: React.ReactNode }) {
    return (
        <>
            <div className="flex flex-row items-center justify-between px-6 pt-6 pb-4 flex-shrink-0">
                {title && <div className="text-xl font-bold">{title}</div>}
                <motion.div
                    initial={{ rotate: 0, scale: 0.9, borderWidth: 1 }}
                    animate={{ rotate: 45, scale: 1, borderWidth: 1 }}
                    exit={{ rotate: 0, scale: 0.9, borderWidth: 1 }}
                    transition={{
                        type: "spring",
                        damping: 20,
                        stiffness: 300
                    }}
                    className="rounded-full border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors"
                >
                    <Button 
                        variant="tertiary" 
                        size="extraSmall" 
                        onClick={onClose}
                        className="!p-1"
                    >
                        <PlusIcon className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
                    </Button>
                </motion.div>
            </div>
            <div className="flex-1 overflow-y-auto min-h-0">
                <div className="p-6">
                    {children}
                </div>
            </div>
        </>
    );
}