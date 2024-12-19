"use client";

import { CampaignCard } from "../components/CampaignCard";
import { Button } from "../components/Button";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Drawer } from "../components/Drawer";
import { useState } from "react";

export default function TestPage() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col p-4 gap-8">
            <div className="text-center text-xl font-bold">Here&apos;s a random campaign</div>
            <CampaignCard title="Splash of Hope: Provide clean drinking water for orphans in Bangladesh" url="https://www.google.com"></CampaignCard>
            <Button variant="secondary" className="!w-fit" onClick={() => setIsOpen(true)}>
                <ArrowPathIcon className="w-5 h-5 mr-2" />      
                Shuffle
            </Button>

            <Drawer open={isOpen} onClose={() => setIsOpen(false)} title="Are you sure?">
                <div className="p-4 flex flex-row gap-2">
                    <Button variant="secondary" className="w-full" onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button variant="primary" className="w-full" onClick={() => setIsOpen(false)}>Yes</Button>
                </div>
            </Drawer>
        </div>
    )
}