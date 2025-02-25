"use client";
import { motion, AnimatePresence } from 'motion/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from './Button';
import { useEffect, useRef, useState, ReactElement } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    height?: 'full' | 'fit';
    footer?: ReactElement<typeof Button>[];
    originRect?: DOMRect | null;
    useOriginAnimation?: boolean;
    inset?: boolean;
}

function ModalContent({ title, onClose, children, footer, inset = true }: { title?: string, onClose: () => void, children: React.ReactNode, footer?: ReactElement<typeof Button>[], inset?: boolean }) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [showTopFade, setShowTopFade] = useState(false);
    const [showBottomFade, setShowBottomFade] = useState(false);

    const checkScroll = () => {
        const element = contentRef.current;
        if (element) {
            const { scrollTop, scrollHeight, clientHeight } = element;
            setShowTopFade(scrollTop > 0);
            setShowBottomFade(scrollTop < scrollHeight - clientHeight - 1);
        }
    };

    useEffect(() => {
        const element = contentRef.current;
        if (element) {
            checkScroll();
            element.addEventListener('scroll', checkScroll);
            return () => element.removeEventListener('scroll', checkScroll);
        }
    }, []);

    return (
        <>
            <div className="flex items-center justify-between px-6 pt-6 pb-2">
                {title && <div className="text-xl font-bold">{title}</div>}
                <Button
                    variant="secondary"
                    size="extraSmall"
                    onClick={onClose}
                    className="p-1 rounded-full shadow border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors"
                >
                    <XMarkIcon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                </Button>
            </div>
            <div className="flex-1 overflow-y-auto h-full relative">
                {showTopFade && (
                    <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white dark:from-neutral-800 to-transparent z-10 pointer-events-none" />
                )}
                <div ref={contentRef} className={`h-full ${inset ? 'p-6' : ''}`} onScroll={checkScroll}>
                    {children}
                </div>
                {showBottomFade && (
                    <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white dark:from-neutral-800 to-transparent z-10 pointer-events-none" />
                )}
            </div>
            {footer && (
                <div className="flex justify-end gap-2 p-6 pt-4">
                    {footer}
                </div>
            )}
        </>
    );
}

export default function Modal({ isOpen, onClose, children, title, footer, originRect, useOriginAnimation = false, inset = true }: ModalProps) {
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
        console.log('Origin rect dimensions:', {
            width: originRect.width,
            height: originRect.height,
            top: originRect.top,
            left: originRect.left
        });
        return (
            <AnimatePresence mode="sync">
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                onClose();
                            }}
                            className="fixed inset-0 bg-black/30 z-[6000]"
                        />
                        <div className="fixed inset-0 max-h-[60vh] z-[6000] pointer-events-none overflow-auto">
                            <motion.div
                                initial={{
                                    position: 'fixed',
                                    top: originRect.top,
                                    left: originRect.left,
                                    width: `${originRect.width}px`,
                                    height: `${originRect.height}px`,
                                    x: 0,
                                    y: 0,
                                    scale: 0.75,
                                    opacity: 1,
                                    filter: 'blur(20px)'
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
                                    filter: 'blur(0px)'
                                }}
                                exit={{
                                    position: 'fixed',
                                    top: originRect.top,
                                    left: originRect.left,
                                    width: `${originRect.width}px`,
                                    height: `${originRect.height}px`,
                                    x: 0,
                                    y: 0,
                                    scale: 0.75,
                                    opacity: [1, 1, 0],
                                    filter: ['blur(0px)', 'blur(0px)', 'blur(20px)']
                                }}
                                style={{
                                    WebkitBackfaceVisibility: "hidden",
                                    WebkitPerspective: "1000",
                                    WebkitTransform: "translate3d(0,0,0)",
                                    WebkitTransformStyle: "preserve-3d"
                                }}
                                className="bg-white dark:bg-neutral-800 rounded-xl pointer-events-auto max-h-[85vh] overflow-hidden will-change-transform flex flex-col"
                            >
                                <ModalContent title={title} onClose={onClose} footer={footer} inset={inset}>
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
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        className="fixed inset-0 bg-black/30 z-[6000]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.75, y: 0, filter: 'blur(20px)' }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.75, y: 0, filter: 'blur(20px)' }}
                        className="fixed grid place-items-center inset-0 z-[6000] pointer-events-none"
                    >
                        <div className="w-[500px] sm:w-[800px] max-h-[85vh] bg-white dark:bg-neutral-800 rounded-xl shadow-xl pointer-events-auto z-[6000] flex flex-col overflow-hidden">
                            <ModalContent title={title} onClose={onClose} footer={footer} inset={inset}>
                                {children}
                            </ModalContent>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}