import { NextResponse } from 'next/server';
import sharp from 'sharp';
import fs from 'fs/promises';

export async function GET() {
    const zoom = 5;
    const numTiles = Math.pow(2, zoom);
    
    try {
        // Create tiles directory if it doesn't exist
        await fs.mkdir('public/tiles', { recursive: true });
        
        // Download each tile individually
        for (let x = 0; x < numTiles; x++) {
            for (let y = 0; y < numTiles; y++) {
                const url = `https://tiles.stadiamaps.com/tiles/stamen_watercolor/${zoom}/${x}/${y}.jpg`;
                
                try {
                    const response = await fetch(url, {
                        headers: {
                            'User-Agent': 'Mozilla/5.0'
                        }
                    });
                    
                    if (response.ok) {
                        const arrayBuffer = await response.arrayBuffer();
                        const buffer = Buffer.from(arrayBuffer);
                        
                        // Save each tile with coordinates in filename
                        await sharp(buffer)
                            .jpeg({ quality: 100 })
                            .toFile(`public/tiles/tile_${zoom}_${x}_${y}.jpg`);
                        
                        console.log(`Downloaded tile ${x},${y}`);
                    }
                } catch (error) {
                    console.error(`Failed to download tile at ${x},${y}:`, error);
                }
            }
        }

        return NextResponse.json({ 
            success: true,
            message: `Downloaded all tiles for zoom level ${zoom}`
        });
    } catch (error) {
        console.error('Failed to download tiles:', error);
        return NextResponse.json({ 
            success: false, 
            error: error instanceof Error ? error.message : 'Unknown error' 
        }, { status: 500 });
    }
} 