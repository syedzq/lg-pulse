import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { format } from 'date-fns'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

function normalizeDate(dateStr: string): string {
  // Set the time to 12:00:00 UTC to avoid timezone issues
  const date = new Date(dateStr)
  date.setUTCHours(12, 0, 0, 0)
  return date.toISOString()
}

export async function POST(request: Request) {
  try {
    const { input, currentYear } = await request.json()
    const today = new Date()

    const completion = await openai.chat.completions.create({
      model: process.env.NEXT_PUBLIC_OPENAI_MODEL || 'gpt-4',
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
      throw new Error('No response from OpenAI')
    }

    const parsed = JSON.parse(result)
    return NextResponse.json({
      start: normalizeDate(parsed.start),
      end: normalizeDate(parsed.end)
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to parse date' },
      { status: 500 }
    )
  }
} 