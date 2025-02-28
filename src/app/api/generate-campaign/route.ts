import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
    try {
        const { prompt } = await request.json()

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: `You are a fundraising campaign expert. Generate compelling campaign details based on the user's input.
                    Format your response as a JSON string with the following structure:
                    {
                        "title": "A catchy, clear campaign title",
                        "description": "A one-sentence summary of the campaign",
                        "goal": number (a reasonable fundraising goal in USD),
                        "pitch": "A 5-paragraph campaign pitch with each paragraph separated by two newlines (\\n\\n), covering:\\n\\n1. The problem or need\\n\\n2. The proposed solution\\n\\n3. The impact\\n\\n4. How the funds will be used\\n\\n5. A call to action"
                    }`
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7
        })

        const result = completion.choices[0].message.content
        if (!result) {
            throw new Error('No response from OpenAI')
        }

        // Parse the response and ensure the pitch is properly formatted
        const parsedResult = JSON.parse(result)
        if (typeof parsedResult.pitch !== 'string') {
            throw new Error('Invalid pitch format in response')
        }

        return NextResponse.json(parsedResult)
    } catch (error) {
        console.error('Error in generate-campaign:', error)
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to generate campaign' },
            { status: 500 }
        )
    }
} 