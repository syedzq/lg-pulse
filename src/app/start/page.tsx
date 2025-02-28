"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../components/Button'

export default function StartFundraiserPage() {
    const [text, setText] = useState('')
    const [progress, setProgress] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        // Count words in text
        const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length
        // Calculate progress (20 words = 100%)
        setProgress(Math.min((wordCount / 20) * 100, 100))
    }, [text])

    const handleGenerate = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/generate-campaign', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: text }),
            })

            if (!response.ok) {
                throw new Error('Failed to generate campaign')
            }

            const data = await response.json()
            // Navigate to the campaign page with the generated data
            router.push(`/campaign/preview?data=${encodeURIComponent(JSON.stringify(data))}`)
        } catch (error) {
            console.error('Error generating campaign:', error)
            // You might want to show an error toast here
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Start a fundraiser</h1>
            
            <div className="space-y-6">
                <div>
                    <label className="block text-lg font-medium mb-2">
                        What would you like to raise funds for?
                    </label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Tell us about your fundraising goals..."
                        className="w-full h-40 p-4 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                    />
                </div>

                <div className="space-y-2">
                    <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-brand-500 transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button
                        variant="brand"
                        onClick={handleGenerate}
                        disabled={progress < 100 || isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Generating...
                            </div>
                        ) : (
                            'Create campaign'
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
} 