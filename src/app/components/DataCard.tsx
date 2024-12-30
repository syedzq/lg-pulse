"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import { Drawer } from "./Drawer";

interface DataCardProps {
    title: React.ReactNode;
    children: React.ReactNode | ((props: { expanded: boolean }) => React.ReactNode);
    onClick?: () => void;
    expandable?: boolean;
    showHeaderBorder?: boolean;
}

export function DataCard({ title, children, onClick, expandable = false, showHeaderBorder = true }: DataCardProps) {
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
            <div ref={cardRef} className="rounded-lg border border-neutral-200 overflow-hidden">
                <div 
                    className={`flex justify-between items-center p-4 ${showHeaderBorder ? 'border-b border-neutral-200' : ''} ${expandable ? 'cursor-pointer hover:bg-neutral-50' : ''}`}
                    onClick={handleClick}
                >
                    {typeof title === 'string' ? (
                        <h3 className="text-lg font-bold">{title}</h3>
                    ) : (
                        title
                    )}
                    {expandable && (
                        <div className="w-6 h-6 rounded-full border border-neutral-200 flex items-center justify-center">
                            <PlusIcon className="w-4 h-4 text-neutral-600" />
                        </div>
                    )}
                </div>
                <div className="p-4">
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
                    useOriginAnimation={true}
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