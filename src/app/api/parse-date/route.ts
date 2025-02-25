import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { format } from 'date-fns'

// Check for API key before initializing OpenAI
if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY is not set in environment variables')
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

function normalizeDate(dateStr: string): string {
  try {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date string: ${dateStr}`)
    }
    date.setUTCHours(12, 0, 0, 0)
    return date.toISOString()
  } catch (error) {
    console.error('Error normalizing date:', error)
    throw error
  }
}

export async function POST(request: Request) {
  try {
    // Check for API key first
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key is not configured')
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      )
    }

    const { input, currentYear } = await request.json()
    console.log('Received input:', input, 'currentYear:', currentYear)

    const today = new Date()
    console.log('Current date:', format(today, 'yyyy-MM-dd'))

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a date parser that converts natural language date inputs into specific date ranges, with special support for Islamic calendar dates.

          Current date: ${format(today, 'EEEE, yyyy-MM-dd')}
          
          Always return dates in ISO format (YYYY-MM-DD).
          If no year is specified, use ${currentYear}.
          If a month is specified without dates, use the full month.
          For relative dates (next week, tomorrow, etc), use the current date as reference.
          
          For Islamic calendar inputs:
          - When a Hijri year/month is mentioned, convert it to the corresponding Gregorian dates
          - Account for the offset of the Islamic calendar and that the Hijri day begins at sunset
          - Common Islamic months: Ramadan, Dhul Hijjah, Muharram, etc.
          - Ensure accuracy of Islamic-Gregorian date conversion
          - If no Hijri year specified, use the next occurrence of that Islamic month
          
          Format response as JSON with start and end dates.
          
          Examples:
          "march 2025" → {"start": "2025-03-01", "end": "2025-03-31"}
          "first 2 weeks of the year" → {"start": "2025-01-01", "end": "2025-01-14"}
          "next week" → {"start": "2024-01-22", "end": "2024-01-28"}
          "ramadan 1446" → {"start": "2025-02-28", "end": "2025-03-29"}
          "tomorrow" → {"start": "2024-01-16", "end": "2024-01-16"}
          "next friday" → {"start": "2024-01-19", "end": "2024-01-19"}
          "next ramadan" → {"start": "2024-03-11", "end": "2024-04-09"}
          "on the first night of Ramadan" → {"start": "2025-02-28", "end": "2025-02-28"}
          "on the first day of Ramadan" → {"start": "2025-03-01", "end": "2025-03-01"}
          "on the last 10 nights of Ramadan" → {"start": "2025-03-20", "end": "2025-03-29"}
          "on the first odd night of Ramadan" → {"start": "2025-03-21", "end": "2025-03-21"}
          `
        },
        {
          role: 'user',
          content: input
        }
      ],
      temperature: 0,
      response_format: { type: "json_object" }
    })

    const result = completion.choices[0].message.content
    if (!result) {
      console.error('No response content from OpenAI')
      throw new Error('No response from OpenAI')
    }

    console.log('OpenAI response:', result)

    const parsed = JSON.parse(result)
    if (!parsed.start || !parsed.end) {
      console.error('Invalid date format in response:', parsed)
      throw new Error('Invalid date format in response')
    }

    const response = {
      start: normalizeDate(parsed.start),
      end: normalizeDate(parsed.end)
    }
    console.log('Normalized response:', response)

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error in parse-date route:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to parse date' },
      { status: 500 }
    )
  }
} 