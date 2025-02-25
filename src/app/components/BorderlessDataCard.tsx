"use client";

import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import { Drawer } from "./Drawer";

interface BorderlessDataCardProps {
    title: React.ReactNode;
    children: React.ReactNode | ((props: { expanded: boolean }) => React.ReactNode);
    onClick?: () => void;
    expandable?: boolean;
    showHeaderBorder?: boolean;
    className?: string;
}

export function BorderlessDataCard({ 
    title, 
    children, 
    onClick, 
    expandable = false, 
    showHeaderBorder = false, 
    className = "" 
}: BorderlessDataCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const [cardBounds, setCardBounds] = useState<DOMRect | null>(null);

    // Handle responsive behavior
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768); // 768px is typical tablet/mobile breakpoint
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleClick = () => {
        if (expandable && cardRef.current) {
            const bounds = cardRef.current.getBoundingClientRect();
            setCardBounds(bounds);
            setIsOpen(true);
        } else if (onClick) {
            onClick();
        }
    };

    const renderChildren = (children: React.ReactNode | ((props: { expanded: boolean }) => React.ReactNode), expanded: boolean) => {
        return typeof children === 'function' ? children({ expanded }) : children;
    };

    return (
        <>
            <div ref={cardRef} className={`${className}`}>
                <div 
                    className={`flex justify-between items-center mb-4 ${showHeaderBorder ? 'border-b border-neutral-200 pb-2' : ''} ${expandable ? 'cursor-pointer' : ''}`}
                    onClick={handleClick}
                >
                    {typeof title === 'string' ? (
                        <h3 className="text-lg font-bold">{title}</h3>
                    ) : (
                        title
                    )}
                    {expandable && (
                        <button
                            className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 transition-colors"
                        >
                            <ArrowsPointingOutIcon className="w-4 h-4" />
                        </button>
                    )}
                </div>
                <div>
                    {renderChildren(children, false)}
                </div>
            </div>

            {/* Render Modal for desktop */}
            {!isMobile && (
                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title={typeof title === 'string' ? title : 'Details'}
                    originRect={cardBounds}
                    useOriginAnimation={false}
                >
                    {renderChildren(children, true)}
                </Modal>
            )}

            {/* Render Drawer for mobile */}
            {isMobile && (
                <Drawer
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    title={typeof title === 'string' ? title : 'Details'}
                >
                    <div>
                        {renderChildren(children, true)}
                    </div>
                </Drawer>
            )}
        </>
    );
} 