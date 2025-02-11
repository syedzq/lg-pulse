'use client';

import { useState, useRef } from 'react';
import { Button } from '../components/Button';
import { Drawer } from '../components/Drawer';
import Modal from '../components/Modal';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function DrawerModalDemo() {
    const [isBasicDrawerOpen, setIsBasicDrawerOpen] = useState(false);
    const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);
    const [isResponsiveOpen, setIsResponsiveOpen] = useState(false);
    const [isAnimatedModalOpen, setIsAnimatedModalOpen] = useState(false);
    const buttonRef = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery("(max-width: 768px)");

    const ExampleContent = () => (
        <div className="space-y-4 h-full">
            <div className="flex flex-col h-full p-6">
                <p className="text-neutral-600">
                    This is an example of content that can be displayed in both a Drawer and Modal.
                    It demonstrates how the components handle different types of content, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-neutral-600">
                    <li>Text content with proper line height and spacing</li>
                    <li>Interactive elements like buttons and forms</li>
                    <li>Scrollable content when it exceeds the container height</li>
                    <li>Proper padding and margin handling</li>
                </ul>
                <div className="h-[400px] bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-600">
                    Scrollable content area
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-screen-lg mx-auto p-8">
            <h1 className="text-2xl font-bold mb-8">Drawer &amp; Modal Demo</h1>

            <div className="space-y-8">
                {/* Basic Examples */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold">Basic Examples</h2>
                    <div className="flex flex-wrap gap-4">
                        <Button 
                            variant="secondary"
                            onClick={() => setIsBasicDrawerOpen(true)}
                        >
                            Open Basic Drawer
                        </Button>
                        <Button 
                            variant="secondary"
                            onClick={() => setIsBasicModalOpen(true)}
                        >
                            Open Basic Modal
                        </Button>
                    </div>
                </section>

                {/* Responsive Example */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold">Responsive Behavior</h2>
                    <p className="text-neutral-600">
                        Opens as a Modal on desktop and Drawer on mobile. Try resizing your browser!
                    </p>
                    <Button 
                        variant="secondary"
                        onClick={() => setIsResponsiveOpen(true)}
                    >
                        Open Responsive Component
                    </Button>
                </section>

                {/* Animated Modal Example */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold">Animated Modal</h2>
                    <p className="text-neutral-600">
                        This modal animates from the button&apos;s position.
                    </p>
                    <div ref={buttonRef}>
                        <Button 
                            variant="secondary"
                            onClick={() => setIsAnimatedModalOpen(true)}
                        >
                            Open Animated Modal
                        </Button>
                    </div>
                </section>
            </div>

            {/* Basic Drawer */}
            <Drawer
                open={isBasicDrawerOpen}
                onClose={() => setIsBasicDrawerOpen(false)}
                title="Basic Drawer Example"
                width='md'
                footer={
                    <div className="flex justify-end gap-2 p-6">
                        <Button variant="secondary" size="base">Cancel</Button>
                        <Button variant="primary" size="base">Save Changes</Button>
                    </div>
                }
            >
                <div className="flex flex-col h-full">
                    <ExampleContent/>
                    
                </div>
            </Drawer>

            {/* Basic Modal */}
            <Modal
                isOpen={isBasicModalOpen}
                onClose={() => setIsBasicModalOpen(false)}
                title="Basic Modal Example"
            >
                <ExampleContent />
            </Modal>

            {/* Responsive Component */}
            {isMobile ? (
                <Drawer
                    open={isResponsiveOpen}
                    onClose={() => setIsResponsiveOpen(false)}
                    title="Responsive Component"
                >
                    <ExampleContent />
                </Drawer>
            ) : (
                <Modal
                    isOpen={isResponsiveOpen}
                    onClose={() => setIsResponsiveOpen(false)}
                    title="Responsive Component"
                >
                    <ExampleContent />
                </Modal>
            )}

            {/* Animated Modal */}
            <Modal
                isOpen={isAnimatedModalOpen}
                onClose={() => setIsAnimatedModalOpen(false)}
                title="Animated Modal Example"
                originRect={buttonRef.current?.getBoundingClientRect()}
                useOriginAnimation={true}
            >
                <ExampleContent />
            </Modal>
        </div>
    );
} 