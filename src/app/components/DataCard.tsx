"use client";

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import { Drawer } from "./Drawer";

interface DataCardProps {
    title: string;
    children: React.ReactNode | ((props: { expanded: boolean }) => React.ReactNode);
    onClick?: () => void;
    expandable?: boolean;
}

export function DataCard({ title, children, onClick, expandable = false }: DataCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

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
        if (expandable) {
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
            <div className="rounded-lg border border-neutral-200 overflow-hidden">
                <div 
                    className={`flex justify-between items-center p-4 border-b border-neutral-200 ${expandable ? 'cursor-pointer hover:bg-neutral-50' : ''}`}
                    onClick={handleClick}
                >
                    <h3 className="text-lg font-bold">{title}</h3>
                    {expandable && <ChevronRightIcon className="w-5 h-5 text-neutral-600" />}
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
                    title={title}
                >
                    {renderChildren(children, true)}
                </Modal>
            )}

            {/* Render Drawer for mobile */}
            {isMobile && (
                <Drawer
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    title={title}
                >
                    <div className="p-4">
                        {renderChildren(children, true)}
                    </div>
                </Drawer>
            )}
        </>
    );
} 