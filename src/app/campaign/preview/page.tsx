"use client"

import { useSearchParams } from 'next/navigation'
import { Button } from '../../components/Button'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'

interface CampaignData {
    title: string
    description: string
    goal: number
    pitch: string
}

export default function CampaignPreviewPage() {
    const searchParams = useSearchParams()
    const campaignDataStr = searchParams.get('data')
    let campaignData: CampaignData | null = null
    
    try {
        campaignData = campaignDataStr ? JSON.parse(decodeURIComponent(campaignDataStr)) : null
    } catch (error) {
        console.error('Error parsing campaign data:', error)
    }

    if (!campaignData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-2">No campaign data found</h1>
                    <p className="text-neutral-600">Please start a new campaign from the home page.</p>
                </div>
            </div>
        )
    }

    const paragraphs = typeof campaignData.pitch === 'string' 
        ? campaignData.pitch.split('\n\n').filter(p => p.trim())
        : Array.isArray(campaignData.pitch) 
            ? campaignData.pitch 
            : ['No pitch content available']

    return (
        <div className="max-w-screen-lg mx-auto">
            {/* Header */}
            <nav className="h-16 sm:h-24 flex flex-row items-center px-4 border-b border-neutral-200">
                <button 
                    onClick={() => window.history.back()}
                    className="p-2 rounded-full hover:bg-neutral-50 transition-colors"
                >
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>
            </nav>

            {/* Campaign Content */}
            <div className="px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    {/* Campaign Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-4">{campaignData.title}</h1>
                        <p className="text-lg text-neutral-600 mb-6">{campaignData.description}</p>
                        <div className="flex items-center gap-4">
                            <div>
                                <div className="text-2xl font-bold text-brand-500">$0</div>
                                <div className="text-sm text-neutral-600">raised of ${campaignData.goal.toLocaleString()} goal</div>
                            </div>
                            <div className="flex-1">
                                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-brand-500 w-0" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Campaign Image Placeholder */}
                    <div className="aspect-video bg-neutral-100 rounded-lg mb-8 flex items-center justify-center">
                        <span className="text-neutral-400">Campaign image will go here</span>
                    </div>

                    {/* Campaign Pitch */}
                    <div className="prose max-w-none">
                        {paragraphs.map((paragraph, index) => (
                            <p key={index} className="mb-6 text-lg leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
                        <div className="bg-white rounded-full shadow-lg border border-neutral-200 p-2 flex gap-2">
                            <Button variant="secondary" className="flex-1">
                                Edit campaign
                            </Button>
                            <Button variant="brand" className="flex-1">
                                Launch campaign
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 