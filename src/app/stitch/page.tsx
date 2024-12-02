'use client';
import { useState } from 'react';
import { Button } from '../components/Button';

export default function StitchPage() {
    const [isStitching, setIsStitching] = useState(false);

    const handleStitch = async () => {
        setIsStitching(true);
        try {
            const response = await fetch('/api/stitch-tiles');
            const data = await response.json();
            if (data.success) {
                alert('Map has been stitched and saved to public folder!');
            }
        } catch (error) {
            console.error('Failed to stitch tiles:', error);
            alert('Failed to stitch tiles');
        }
        setIsStitching(false);
    };

    return (
        <div className="p-8">
            <Button
                onClick={handleStitch}
                disabled={isStitching}
            >
                {isStitching ? 'Stitching...' : 'Stitch Map Tiles'}
            </Button>
        </div>
    );
} 