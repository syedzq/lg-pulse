'use client';
import { ToasterWithBreakpoint } from '../components/ToasterWithBreakpoint';
import Modal from '../components/Modal';
import { useState } from 'react';
import { Button } from '../components/Button';
import { CampaignCard } from '../components/CampaignCard';
import { ProgressBar } from '../components/ProgressBar';

export default function DS() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    return (
        <>
            <section className='max-w-screen-xl mx-auto p-10 space-y-8'>
                <h1 className="text-4xl font-bold">Design System</h1>
                
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Buttons</h2>
                    <div className="flex flex-wrap gap-4">
                        <Button variant="brand" size="extraSmall">
                            Extra Small
                        </Button>
                        <Button variant="brand" size="base">
                            Base
                        </Button>
                        <Button variant="brand" size="extraLarge">
                            Extra Large
                        </Button>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <Button variant="primary" size="extraSmall">
                            Extra Small
                        </Button>
                        <Button variant="primary" size="base">
                            Base
                        </Button>
                        <Button variant="primary" size="extraLarge">
                            Extra Large
                        </Button>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <Button variant="secondary" size="extraSmall">
                            Extra Small
                        </Button>
                        <Button variant="secondary" size="base">
                            Base
                        </Button>
                        <Button variant="secondary" size="extraLarge">
                            Extra Large
                        </Button>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <Button variant="tertiary" size="extraSmall">
                            Extra Small
                        </Button>
                            <Button variant="tertiary" size="base">
                            Base
                        </Button>
                        <Button variant="tertiary" size="extraLarge">
                            Extra Large
                        </Button>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <Button variant="destructive" size="extraSmall">
                            Extra Small
                        </Button>
                        <Button variant="destructive" size="base">
                            Base
                        </Button>
                        <Button variant="destructive" size="extraLarge">
                            Extra Large
                        </Button>
                    </div>
                </div>
                <h2 className="text-2xl font-bold">Toasts</h2>
                <ToasterWithBreakpoint />
                <Button variant="secondary" onClick={() => toast.message('My first toast', { description: 'This is a description' })}>
                    Give me a toast
                </Button>
                <h2 className="text-2xl font-bold">Modal</h2>
                <Button variant="secondary" onClick={() => setIsModalOpen(true)}>Open modal</Button>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title='Downloading your files...'>
                    <h1>Takbir!</h1>
                </Modal>
                <h2 className="text-2xl font-bold">Campaign Card</h2>
                <CampaignCard title='Splash of Hope: Provide clean drinking water for orphans in Bangladesh' url='https://www.google.com' imageUrl='https://via.placeholder.com/300' />
                <h2 className="text-2xl font-bold">Progress Bar</h2>
                <ProgressBar progress={50} />
            </section>
        </>
    );
}