'use client';

import { useState, useRef } from 'react';
import { Button } from '../components/Button';
import { Drawer } from '../components/Drawer';
import Modal from '../components/Modal';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';

const sections = [
    {
        title: 'Components',
        items: [
            { title: 'Modal', hash: 'modal' },
            { title: 'Drawer', hash: 'drawer' },
        ]
    },
    {
        title: 'Features',
        items: [
            { title: 'Responsive', hash: 'responsive' },
            { title: 'Animations', hash: 'animations' },
            { title: 'Footer Actions', hash: 'footer' },
        ]
    }
];

const CodeBlock = ({ children }: { children: string }) => (
    <pre className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-lg overflow-x-auto">
        <code className="text-sm">{children}</code>
    </pre>
);

interface PropControlsProps {
    title: string;
    controls: {
        name: string;
        type: 'boolean' | 'select' | 'string';
        value: any;
        onChange: (value: any) => void;
        options?: string[];
    }[];
}

const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) => (
    <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`${
            checked ? 'bg-brand-500' : 'bg-neutral-200 dark:bg-neutral-700'
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400`}
    >
        <span
            className={`${
                checked ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
    </button>
);

const PropControls = ({ title, controls }: PropControlsProps) => (
    <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-6 mb-8">
        <h3 className="font-semibold mb-4">{title}</h3>
        <div className="space-y-4">
            {controls.map(({ name, type, value, onChange, options }) => (
                <div key={name} className="flex items-center justify-between">
                    <label className="text-sm font-mono text-neutral-600 dark:text-neutral-400">
                        {name}:
                    </label>
                    {type === 'boolean' && (
                        <Toggle
                            checked={value}
                            onChange={onChange}
                        />
                    )}
                    {type === 'select' && options && (
                        <select
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            className="text-sm bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md px-2 py-1"
                        >
                            {options.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    )}
                    {type === 'string' && (
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            className="text-sm bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md px-2 py-1"
                        />
                    )}
                </div>
            ))}
        </div>
    </div>
);

export default function DrawerModalDemo() {
    const [isBasicDrawerOpen, setIsBasicDrawerOpen] = useState(false);
    const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);
    const [isResponsiveOpen, setIsResponsiveOpen] = useState(false);
    const [isAnimatedModalOpen, setIsAnimatedModalOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const isMobile = useMediaQuery("(max-width: 768px)");
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const currentSection = searchParams.get('section') || 'introduction';
    const [drawerWidth, setDrawerWidth] = useState<'sm' | 'md' | 'lg' | 'fit'>('md');
    const [drawerHeight, setDrawerHeight] = useState<'full' | 'fit'>('full');
    const [drawerBreakpoint, setDrawerBreakpoint] = useState<'desktop' | 'mobile'>('desktop');
    const [drawerTitle, setDrawerTitle] = useState('Basic Drawer');
    const [drawerSubtitle, setDrawerSubtitle] = useState('This is a basic drawer example');
    const [modalTitle, setModalTitle] = useState('Basic Modal Example');
    const [useModalAnimation, setUseModalAnimation] = useState(false);
    const [isNestedModalOpen, setIsNestedModalOpen] = useState(false);
    const [isNestedDrawerOpen, setIsNestedDrawerOpen] = useState(false);

    const ExampleContent = () => (
        <div className="space-y-4 p-6">
            <div className="flex flex-col">
                <p className="text-neutral-600">
                    This is an example of content that can be displayed in both a Drawer and Modal.
                    It demonstrates how the components handle different types of content, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-neutral-600 mt-4">
                    <li>Text content with proper line height and spacing</li>
                    <li>Interactive elements like buttons and forms</li>
                    <li>Scrollable content when it exceeds the container height</li>
                    <li>Proper padding and margin handling</li>
                </ul>
                <div className="h-[400px] bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-600 dark:text-neutral-400 mt-4">
                    Scrollable content area
                </div>
            </div>
        </div>
    );

    const NestedExample = () => {
        const handleModalClose = () => {
            setIsNestedModalOpen(false);
        };

        return (
            <div className="space-y-4 p-6">
                <p className="text-neutral-600 dark:text-neutral-400">
                    This example demonstrates how to trigger a modal from within a drawer.
                    This pattern is useful for complex workflows where you need to maintain context
                    while gathering additional input.
                </p>
                <Button
                    variant="secondary"
                    onClick={() => setIsNestedModalOpen(true)}
                >
                    Open Modal
                </Button>

                <Modal
                    isOpen={isNestedModalOpen}
                    onClose={handleModalClose}
                    title="Nested Modal"
                    footer={[
                        <Button key="close" variant="secondary" onClick={handleModalClose}>
                            Close Modal
                        </Button>
                    ]}
                >
                    <div className="p-6">
                        <p className="text-neutral-600 dark:text-neutral-400">
                            This modal is displayed on top of the drawer. Notice how the drawer remains visible
                            in the background, maintaining context for the user.
                        </p>
                    </div>
                </Modal>
            </div>
        );
    };

    return (
        <div className="flex min-h-screen bg-white dark:bg-neutral-900">
            {/* Sidebar */}
            <div className="w-64 border-r border-neutral-200 dark:border-neutral-800 p-6 flex-shrink-0 sticky top-0 h-screen overflow-y-auto">
                <div className="font-bold text-xl mb-6">Documentation</div>
                <nav className="space-y-8">
                    {sections.map((section) => (
                        <div key={section.title}>
                            <div className="font-semibold text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                                {section.title}
                            </div>
                            <ul className="space-y-2">
                                {section.items.map((item) => (
                                    <li key={item.hash}>
                                        <Link 
                                            href={`${pathname}?section=${item.hash}`}
                                            className={`block py-1 px-2 rounded-md text-sm ${
                                                currentSection === item.hash
                                                    ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white'
                                                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                                            }`}
                                        >
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 p-8 max-w-4xl">
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    {currentSection === 'introduction' && (
                        <section id="introduction">
                            <h1>Drawer & Modal Components</h1>
                            <p className="lead text-neutral-600 dark:text-neutral-400">
                                A collection of drawer and modal components built with Framer Motion and Vaul, 
                                designed for smooth animations and responsive behavior.
                            </p>

                            <h2>Features</h2>
                            <ul>
                                <li>Smooth animations powered by Framer Motion</li>
                                <li>Responsive drawer behavior using Vaul</li>
                                <li>Origin-based animations for modals</li>
                                <li>Scroll fade indicators</li>
                                <li>Footer actions support</li>
                                <li>Dark mode support</li>
                            </ul>
                        </section>
                    )}

                    {currentSection === 'installation' && (
                        <section id="installation">
                            <h1>Installation</h1>
                            <h2>Dependencies</h2>
                            <CodeBlock>
                                {`npm install framer-motion vaul-next @heroicons/react`}
                            </CodeBlock>

                            <h2>Required Packages</h2>
                            <ul className="list-disc list-inside space-y-2 text-neutral-600">
                                <li><code>framer-motion</code> - For Modal animations</li>
                                <li><code>vaul</code> - For Drawer component</li>
                                <li><code>@heroicons/react</code> - For icons</li>
                            </ul>
                        </section>
                    )}

                    {currentSection === 'usage' && (
                        <section id="usage">
                            <h1>Usage</h1>
                            <h2>Basic Modal</h2>
                            <CodeBlock>
                                {`<Modal
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
    title="Example Modal"
>
    <div>Your content here</div>
</Modal>`}
                            </CodeBlock>

                            <div className="mt-4">
                                <Button 
                                    variant="secondary"
                                    onClick={() => setIsBasicModalOpen(true)}
                                >
                                    Try Basic Modal
                                </Button>
                            </div>

                            <h2 className="mt-8">Basic Drawer</h2>
                            <CodeBlock>
                                {`<Drawer
    open={isOpen}
    onClose={() => setIsOpen(false)}
    title="Example Drawer"
>
    <div>Your content here</div>
</Drawer>`}
                            </CodeBlock>

                            <div className="mt-4">
                                <Button 
                                    variant="secondary"
                                    onClick={() => setIsBasicDrawerOpen(true)}
                                >
                                    Try Basic Drawer
                                </Button>
                            </div>
                        </section>
                    )}

                    {currentSection === 'modal' && (
                        <section id="modal">
                            <h1>Modal Component</h1>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                                A flexible modal dialog component with support for origin-based animations, scroll fades, and footer actions.
                            </p>

                            <PropControls
                                title="Interactive Demo"
                                controls={[
                                    {
                                        name: 'title',
                                        type: 'string',
                                        value: modalTitle,
                                        onChange: setModalTitle
                                    },
                                    {
                                        name: 'useOriginAnimation',
                                        type: 'boolean',
                                        value: useModalAnimation,
                                        onChange: setUseModalAnimation
                                    }
                                ]}
                            />

                            <div className="mb-8">
                                <Button 
                                    variant="secondary"
                                    onClick={() => setIsBasicModalOpen(true)}
                                >
                                    Open Modal with Current Props
                                </Button>
                            </div>

                            <h2>Props</h2>
                            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-6 space-y-4 not-prose">
                                <div>
                                    <code className="text-sm font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">isOpen: boolean</code>
                                    <p className="text-neutral-600 mt-1">Controls the visibility of the modal</p>
                                </div>
                                <div>
                                    <code className="text-sm font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">{'onClose: () => void'}</code>
                                    <p className="text-neutral-600 mt-1">Callback when modal is closed (clicking overlay, escape key, or close button)</p>
                                </div>
                                <div>
                                    <code className="text-sm font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">title?: string</code>
                                    <p className="text-neutral-600 mt-1">Optional title displayed in the header</p>
                                </div>
                                <div>
                                    <code className="text-sm font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">{'footer?: ReactElement<typeof Button>[]'}</code>
                                    <p className="text-neutral-600 mt-1">Array of Button components to display in footer</p>
                                </div>
                                <div>
                                    <code className="text-sm font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">useOriginAnimation?: boolean</code>
                                    <p className="text-neutral-600 mt-1">When true, animates from the trigger element&apos;s position</p>
                                </div>
                                <div>
                                    <code className="text-sm font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">originRect?: DOMRect | null</code>
                                    <p className="text-neutral-600 mt-1">Required when useOriginAnimation is true, use buttonRef.current?.getBoundingClientRect()</p>
                                </div>
                            </div>

                            <h2 className="mt-8">Common Use Cases</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Basic Modal</h3>
                                    <CodeBlock>
                                        {`<Modal
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
    title="Example Modal"
>
    <div>Content here</div>
</Modal>`}
                                    </CodeBlock>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2">With Footer Actions</h3>
                                    <CodeBlock>
                                        {`<Modal
    isOpen={isOpen}
    onClose={onClose}
    title="Confirm Action"
    footer={[
        <Button key="cancel" variant="secondary" onClick={onClose}>
            Cancel
        </Button>,
        <Button key="confirm" variant="primary" onClick={handleConfirm}>
            Confirm
        </Button>
    ]}
>
    <div>Are you sure?</div>
</Modal>`}
                                    </CodeBlock>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2">With Origin Animation</h3>
                                    <CodeBlock>
                                        {`const buttonRef = useRef<HTMLButtonElement>(null);

<Button ref={buttonRef} onClick={() => setIsOpen(true)}>
    Open Modal
</Button>

<Modal
    isOpen={isOpen}
    onClose={onClose}
    useOriginAnimation
    originRect={buttonRef.current?.getBoundingClientRect()}
>
    <div>Animates from button position</div>
</Modal>`}
                                    </CodeBlock>
                                </div>
                            </div>
                        </section>
                    )}

                    {currentSection === 'drawer' && (
                        <section id="drawer">
                            <h1>Drawer Component</h1>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                                A responsive drawer component that can slide in from the right or bottom based on breakpoint.
                            </p>

                            <PropControls
                                title="Interactive Demo"
                                controls={[
                                    {
                                        name: 'title',
                                        type: 'string',
                                        value: drawerTitle,
                                        onChange: setDrawerTitle
                                    },
                                    {
                                        name: 'subtitle',
                                        type: 'string',
                                        value: drawerSubtitle,
                                        onChange: setDrawerSubtitle
                                    },
                                    {
                                        name: 'width',
                                        type: 'select',
                                        value: drawerWidth,
                                        onChange: setDrawerWidth,
                                        options: ['sm', 'md', 'lg', 'fit']
                                    },
                                    {
                                        name: 'height',
                                        type: 'select',
                                        value: drawerHeight,
                                        onChange: setDrawerHeight,
                                        options: ['full', 'fit']
                                    },
                                    {
                                        name: 'breakpoint',
                                        type: 'select',
                                        value: drawerBreakpoint,
                                        onChange: setDrawerBreakpoint,
                                        options: ['desktop', 'mobile']
                                    }
                                ]}
                            />

                            <div className="mb-8">
                                <Button 
                                    variant="secondary"
                                    onClick={() => setIsBasicDrawerOpen(true)}
                                >
                                    Open Drawer with Current Props
                                </Button>
                            </div>

                            <h2>Props</h2>
                            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-6 space-y-4 not-prose">
                                <div>
                                    <code className="text-sm font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">open: boolean</code>
                                    <p className="text-neutral-600 mt-1">Controls the visibility of the drawer</p>
                                </div>
                                <div>
                                    <code className="text-sm font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">{'onClose: () => void'}</code>
                                    <p className="text-neutral-600 mt-1">Callback when drawer is closed</p>
                                </div>
                                <div>
                                    <code className="text-sm font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">title: string</code>
                                    <p className="text-neutral-600 mt-1">Title displayed in the header</p>
                                </div>
                                <div>
                                    <code className="text-sm font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">subtitle?: string</code>
                                    <p className="text-neutral-600 mt-1">Optional subtitle below the title</p>
                                </div>
                                <div>
                                    <code className="text-sm font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">{'footer?: ReactElement<typeof Button>[]'}</code>
                                    <p className="text-neutral-600 mt-1">Array of Button components to display in footer</p>
                                </div>
                                <div>
                                    <code className="text-sm font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">breakpoint?: &apos;desktop&apos; | &apos;mobile&apos;</code>
                                    <p className="text-neutral-600 mt-1">Controls drawer position (right or bottom), defaults to &apos;mobile&apos;</p>
                                </div>
                                <div>
                                    <code className="text-sm font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">width?: &apos;sm&apos; | &apos;md&apos; | &apos;lg&apos; | &apos;fit&apos;</code>
                                    <p className="text-neutral-600 mt-1">Width of the drawer on desktop, defaults to &apos;md&apos;</p>
                                </div>
                                <div>
                                    <code className="text-sm font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">height?: &apos;full&apos; | &apos;fit&apos;</code>
                                    <p className="text-neutral-600 mt-1">Height of the drawer on mobile, defaults to &apos;fit&apos;</p>
                                </div>
                            </div>

                            <h2 className="mt-8">Common Use Cases</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Basic Drawer</h3>
                                    <CodeBlock>
                                        {`<Drawer
    open={isOpen}
    onClose={() => setIsOpen(false)}
    title="Example Drawer"
>
    <div>Content here</div>
</Drawer>`}
                                    </CodeBlock>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Desktop Side Panel</h3>
                                    <CodeBlock>
                                        {`<Drawer
    open={isOpen}
    onClose={onClose}
    title="Details"
    breakpoint="desktop"
    width="md"
    footer={[
        <Button key="close" variant="secondary" onClick={onClose}>
            Close
        </Button>
    ]}
>
    <div>Side panel content</div>
</Drawer>`}
                                    </CodeBlock>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Mobile Bottom Sheet</h3>
                                    <CodeBlock>
                                        {`<Drawer
    open={isOpen}
    onClose={onClose}
    title="Options"
    subtitle="Select an option below"
    breakpoint="mobile"
    height="fit"
>
    <div>Bottom sheet content</div>
</Drawer>`}
                                    </CodeBlock>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2">With Nested Modal</h3>
                                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                                        Sometimes you need to show a modal on top of a drawer, for example when confirming a destructive action
                                        or collecting additional input while maintaining drawer context.
                                    </p>
                                    <div className="flex gap-4 mb-4">
                                        <Button
                                            variant="secondary"
                                            onClick={() => setIsNestedDrawerOpen(true)}
                                        >
                                            Try Nested Example
                                        </Button>
                                    </div>
                                    <CodeBlock>
                                        {`const [isModalOpen, setIsModalOpen] = useState(false);

<Drawer
    open={isDrawerOpen}
    onClose={() => setIsDrawerOpen(false)}
    title=&quot;Parent Drawer&quot;
>
    <Button onClick={() => setIsModalOpen(true)}>
        Open Modal
    </Button>
</Drawer>

<Modal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    title=&quot;Nested Modal&quot;
>
    <div>Modal content here</div>
</Modal>`}
                                    </CodeBlock>
                                </div>
                            </div>
                        </section>
                    )}

                    {currentSection === 'animations' && (
                        <section id="animations">
                            <h1>Animations</h1>
                            
                            <h2>Modal Animations</h2>
                            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-6 space-y-4">
                                <h3 className="font-semibold">Standard Animation</h3>
                                <p className="text-neutral-600">Scale and blur transition from center with spring physics.</p>
                                <Button 
                                    variant="secondary"
                                    onClick={() => setIsBasicModalOpen(true)}
                                >
                                    Try Standard Animation
                                </Button>

                                <h3 className="font-semibold mt-8">Origin Animation</h3>
                                <p className="text-neutral-600">Morphs from trigger element position with blur effect.</p>
                                <Button 
                                    ref={buttonRef}
                                    variant="secondary"
                                    onClick={() => setIsAnimatedModalOpen(true)}
                                >
                                    Try Origin Animation
                                </Button>
                            </div>

                            <h2 className="mt-8">Drawer Animations</h2>
                            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-6 space-y-4">
                                <h3 className="font-semibold">Desktop Animation</h3>
                                <p className="text-neutral-600">Slides in from the right edge.</p>
                                <Button 
                                    variant="secondary"
                                    onClick={() => setIsBasicDrawerOpen(true)}
                                >
                                    Try Desktop Animation
                                </Button>

                                <h3 className="font-semibold mt-8">Mobile Animation</h3>
                                <p className="text-neutral-600">Slides up from the bottom edge.</p>
                                <p className="text-sm text-neutral-500">Resize your browser to mobile width to test.</p>
                            </div>
                        </section>
                    )}

                    {currentSection === 'responsive' && (
                        <section id="responsive">
                            <h1>Responsive Behavior</h1>
                            <p>
                                Components can adapt their behavior based on screen size. The Drawer component
                                can switch between side and bottom positions, while the Modal adjusts its width.
                            </p>

                            <div className="mt-8 not-prose">
                                <h2 className="text-xl font-bold mb-4">Responsive Example</h2>
                                <p className="text-neutral-600 mb-4">
                                    This component renders as a Modal on desktop and Drawer on mobile.
                                    Try resizing your browser window!
                                </p>
                                <Button 
                                    variant="secondary"
                                    onClick={() => setIsResponsiveOpen(true)}
                                >
                                    Open Responsive Component
                                </Button>
                            </div>

                            <CodeBlock>
                                {`{isMobile ? (
    <Drawer open={isOpen} onClose={onClose}>
        {content}
    </Drawer>
) : (
    <Modal isOpen={isOpen} onClose={onClose}>
        {content}
    </Modal>
)}`}
                            </CodeBlock>
                        </section>
                    )}

                    {currentSection === 'scroll' && (
                        <section id="scroll">
                            <h1>Scroll Behavior</h1>
                            <p>
                                Both components handle scrollable content with fade indicators that appear
                                when content is scrollable in either direction.
                            </p>

                            <div className="mt-8 not-prose">
                                <h2 className="text-xl font-bold mb-4">Scroll Example</h2>
                                <p className="text-neutral-600 mb-4">
                                    Open either component to see the scroll behavior with fade indicators.
                                </p>
                                <div className="flex gap-4">
                                    <Button 
                                        variant="secondary"
                                        onClick={() => setIsBasicModalOpen(true)}
                                    >
                                        Try Modal Scroll
                                    </Button>
                                    <Button 
                                        variant="secondary"
                                        onClick={() => setIsBasicDrawerOpen(true)}
                                    >
                                        Try Drawer Scroll
                                    </Button>
                                </div>
                            </div>
                        </section>
                    )}

                    {currentSection === 'footer' && (
                        <section id="footer">
                            <h1>Footer Actions</h1>
                            <p>
                                Both components support footer actions using an array of Button components.
                                The footer is fixed at the bottom and includes a top border.
                            </p>

                            <div className="mt-8 not-prose">
                                <h2 className="text-xl font-bold mb-4">Footer Example</h2>
                                <p className="text-neutral-600 mb-4">
                                    Open either component to see the footer with action buttons.
                                </p>
                                <div className="flex gap-4">
                                    <Button 
                                        variant="secondary"
                                        onClick={() => setIsBasicModalOpen(true)}
                                    >
                                        Modal with Footer
                                    </Button>
                                    <Button 
                                        variant="secondary"
                                        onClick={() => setIsBasicDrawerOpen(true)}
                                    >
                                        Drawer with Footer
                                    </Button>
                                </div>
                            </div>

                            <CodeBlock>
                                {`<Modal
    footer={[
        <Button key="cancel" variant="secondary" onClick={onClose}>
            Cancel
        </Button>,
        <Button key="save" variant="primary">
            Save Changes
        </Button>
    ]}
>
    {content}
</Modal>`}
                            </CodeBlock>
                        </section>
                    )}
                </div>
            </div>

            {/* Component instances */}
            <Drawer
                open={isBasicDrawerOpen}
                onClose={() => setIsBasicDrawerOpen(false)}
                title={drawerTitle}
                subtitle={drawerSubtitle}
                width={drawerWidth}
                height={drawerHeight}
                breakpoint={drawerBreakpoint}
                footer={[
                    <Button key="cancel" variant="secondary" onClick={() => setIsBasicDrawerOpen(false)}>
                        Cancel
                    </Button>,
                    <Button key="save" variant="primary">
                        Save Changes
                    </Button>
                ]}
            >
                <ExampleContent/>
            </Drawer>

            <Modal
                isOpen={isBasicModalOpen}
                onClose={() => setIsBasicModalOpen(false)}
                title={modalTitle}
                useOriginAnimation={useModalAnimation}
                originRect={useModalAnimation ? buttonRef.current?.getBoundingClientRect() : undefined}
                footer={[
                    <Button key="cancel" variant="secondary" onClick={() => setIsBasicModalOpen(false)}>
                        Cancel
                    </Button>,
                    <Button key="save" variant="primary">
                        Save Changes
                    </Button>
                ]}
            >
                <ExampleContent />
            </Modal>

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

            <Modal
                isOpen={isAnimatedModalOpen}
                onClose={() => setIsAnimatedModalOpen(false)}
                title="Animated Modal Example"
                originRect={buttonRef.current?.getBoundingClientRect()}
                useOriginAnimation={true}
            >
                <ExampleContent />
            </Modal>

            <Drawer
                open={isNestedDrawerOpen}
                onClose={() => setIsNestedDrawerOpen(false)}
                title="Parent Drawer"
                subtitle="Click the button below to open a modal"
                width="sm"
                breakpoint="desktop"
            >
                <NestedExample />
            </Drawer>
        </div>
    );
} 