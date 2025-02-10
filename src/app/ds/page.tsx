'use client';
import { toast } from 'sonner';
import Modal from '../components/Modal';
import { useState } from 'react';
import { Button } from '../components/Button';
import { CampaignCard } from '../components/CampaignCard';
import { ProgressBar } from '../components/ProgressBar';
import { DatePicker } from '../components/DatePicker';
import { SingleDatePicker } from '../components/SingleDatePicker';
import { format } from 'date-fns';
import { DateRange } from "react-day-picker"

export default function DS() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dateRange, setDateRange] = useState<DateRange>();
    const [singleDate, setSingleDate] = useState<Date>();
    
    return (
        <>
            <section className='max-w-screen-lg mx-auto px-4 sm:p-10 sm:pt-40 space-y-8'>
                <h1 className="text-4xl font-bold">Design System</h1>
                <h2 className="text-2xl font-bold">Buttons</h2>
                <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg items-center space-y-4">
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Button variant="brand" size="extraSmall" onClick={() => toast('extraSmall brand button clicked')}>
                            Extra Small
                        </Button>
                        <Button variant="brand" size="base" onClick={() => toast('base brand button clicked')}>
                            Base
                        </Button>
                        <Button variant="brand" size="extraLarge" onClick={() => toast('extraLarge brand button clicked')}>
                            Extra Large
                        </Button>
                    </div>

                    <div className=" flex flex-wrap gap-4 justify-center">
                        <Button variant="primary" size="extraSmall" onClick={() => toast('extraSmall primary button clicked')}>
                            Extra Small
                        </Button>
                        <Button variant="primary" size="base" onClick={() => toast('base primary button clicked')}>
                            Base
                        </Button>
                        <Button variant="primary" size="extraLarge" onClick={() => toast('extraLarge primary button clicked')}>
                            Extra Large
                        </Button>
                    </div>

                    <div className="flex flex-wrap gap-4 justify-center">
                        <Button variant="secondary" size="extraSmall" onClick={() => toast('extraSmall secondary button clicked')}>
                            Extra Small
                        </Button>
                        <Button variant="secondary" size="base" onClick={() => toast('base secondary button clicked')}>
                            Base
                        </Button>
                        <Button variant="secondary" size="extraLarge" onClick={() => toast('extraLarge secondary button clicked')}>
                            Extra Large
                        </Button>
                    </div>

                    <div className="flex flex-wrap gap-4 justify-center">
                        <Button variant="tertiary" size="extraSmall" onClick={() => toast('extraSmall tertiary button clicked')}>
                            Extra Small
                        </Button>
                        <Button variant="tertiary" size="base" onClick={() => toast('base tertiary button clicked')}>
                            Base
                        </Button>
                        <Button variant="tertiary" size="extraLarge" onClick={() => toast('extraLarge tertiary button clicked')}    >
                            Extra Large
                        </Button>
                    </div>

                    <div className="flex flex-wrap gap-4 justify-center">
                        <Button variant="destructive" size="extraSmall" onClick={() => toast('extraSmall destructive button clicked')}>
                            Extra Small
                        </Button>
                        <Button variant="destructive" size="base" onClick={() => toast('base destructive button clicked')}>
                            Base
                        </Button>
                        <Button variant="destructive" size="extraLarge" onClick={() => toast('extraLarge destructive button clicked')}>
                            Extra Large
                        </Button>
                    </div>
                </div>
                <h2 className="text-2xl font-bold">Date Pickers</h2>
                <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg space-y-4">
                    <div className="flex flex-wrap gap-4">
                        <div>
                            <h3 className="text-sm font-medium mb-2 text-neutral-600">Single Day</h3>
                            <SingleDatePicker
                                date={singleDate}
                                onChange={(newDate) => {
                                    setSingleDate(newDate);
                                    if (newDate) {
                                        toast(`Selected date: ${format(newDate, 'PPP')}`);
                                    } else {
                                        toast('Date cleared');
                                    }
                                }}
                            />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium mb-2 text-neutral-600">Date Range</h3>
                            <DatePicker
                                dateRange={dateRange}
                                onChange={(newDateRange) => {
                                    setDateRange(newDateRange);
                                    if (newDateRange?.from) {
                                        if (newDateRange.to && newDateRange.from !== newDateRange.to) {
                                            toast(`Selected range: ${format(newDateRange.from, 'PPP')} - ${format(newDateRange.to, 'PPP')}`);
                                        } else {
                                            toast(`Selected date: ${format(newDateRange.from, 'PPP')}`);
                                        }
                                    } else {
                                        toast('Date range cleared');
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
                <h2 className="text-2xl font-bold">Toasts</h2>
                <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg space-y-4 flex justify-center">
                    <Button variant="secondary" onClick={ () => toast('Added to your Giving List!')}>
                        Give me a toast
                    </Button>
                    
                </div>
                <h2 className="text-2xl font-bold">Modal</h2>
                <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg flex justify-center">
                <Button variant="secondary" onClick={() => setIsModalOpen(true)}>Open modal</Button>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title='Downloading your files...'>
                    <h1>Takbir!</h1>
                </Modal>
                </div>
                <h2 className="text-2xl font-bold">Campaign Card</h2>
                <CampaignCard title='Splash of Hope: Provide clean drinking water for orphans in Bangladesh' url='https://www.google.com' imageUrl='https://via.placeholder.com/300' />
                <h2 className="text-2xl font-bold">Progress Bar</h2>
                <ProgressBar progress={0.5} />
            </section>
        </>
    );
}