"use client";
import { motion, AnimatePresence } from 'motion/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Button } from './Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
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
                        className="fixed grid place-items-center inset-0 z-[5000] pointer-events-none"
                    >
                        <div className="w-[500px] max-h-[85vh] bg-white dark:bg-neutral-800 rounded-xl shadow-xl pointer-events-auto z-[5000] flex flex-col">
                            <div className="flex flex-row items-center justify-between px-6 pt-6 pb-4">
                                {title && <div className="text-xl font-bold">{title}</div>}
                                <Button 
                                    variant="tertiary" 
                                    size="extraSmall" 
                                    onClick={onClose}
                                >
                                    <XMarkIcon className="h-6 w-6 border border-neutral-200 dark:border-neutral-700 rounded-full" />
                                </Button>
                            </div>
                            <div className="p-6 overflow-y-auto">
                                {children}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}