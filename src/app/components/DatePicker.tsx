"use client"

import * as React from "react"
import { format, parseISO, subDays } from "date-fns"
import { CalendarDaysIcon } from "@heroicons/react/24/solid"
import { SparklesIcon } from "@heroicons/react/24/solid"
import { cn } from "@/lib/utils"
import { Button as ShadcnButton } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from "react-day-picker"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "../components/Button"
import { Drawer } from "../components/Drawer"
import { useMediaQuery } from "@/hooks/useMediaQuery"

export type DatePickerProps = {
  dateRange?: DateRange
  onChange?: (dateRange?: DateRange) => void
  disabledDays?: (date: Date) => boolean
}

async function parseDateInput(input: string): Promise<DateRange | null> {
  try {
    const currentYear = new Date().getFullYear()
    const response = await fetch('/api/parse-date', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input,
        currentYear,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to parse date')
    }

    const result = await response.json()
    return {
      from: parseISO(result.start),
      to: parseISO(result.end),
    }
  } catch (error) {
    console.error('Error parsing date:', error)
    return null
  }
}

export function DatePicker({ dateRange, onChange, disabledDays }: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [selected, setSelected] = React.useState<DateRange | undefined>(dateRange)
  const [month, setMonth] = React.useState<Date>(new Date())
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [selectedChip, setSelectedChip] = React.useState<string | null>(null)

  // Update when external date range changes
  React.useEffect(() => {
    setSelected(dateRange)
    setInputValue("")
    if (dateRange?.from) {
      setMonth(dateRange.from)
    }
  }, [dateRange])

  // Focus input when popover opens
  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleInputKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      setIsLoading(true)
      const newDateRange = await parseDateInput(inputValue.trim())
      setIsLoading(false)

      if (newDateRange) {
        setSelected(newDateRange)
        if (newDateRange.from) {
          setMonth(newDateRange.from)
        }
      }
    } else if (e.key === "Escape") {
      setIsOpen(false)
    }
  }

  const handleCalendarSelect = (newDateRange: DateRange | undefined) => {
    setSelected(newDateRange)
    setInputValue("")
    if (newDateRange?.from) {
      setMonth(newDateRange.from)
    }
  }

  const handleOK = () => {
    onChange?.(selected)
    setIsOpen(false)
  }

  const formatDateRange = (range: DateRange) => {
    if (!range.from) return ""
    if (!range.to || range.from === range.to) {
      return format(range.from, "MM/dd/yy")
    }
    return `${format(range.from, "MM/dd/yy")} - ${format(range.to, "MM/dd/yy")}`
  }

  const getDefaultDateRange = (): DateRange => {
    const today = new Date();
    return {
        from: subDays(today, 6),
        to: today
    };
  };

  const handleChipClick = (range: DateRange, label: string) => {
    setSelected(range)
    setSelectedChip(label)
    onChange?.(range)
  }

  const datePickerContent = (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-neutral-200">
        <div className="relative">
          <div className="absolute left-2 top-1/2 -translate-y-1/2">
            <SparklesIcon className="h-4 w-4 text-violet-500" />
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder='Try "Mar 1-15" or "last 10 nights of Ramadan"'
            value={selected ? formatDateRange(selected) : inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleInputKeyDown}
            className="w-full pl-8 pr-2 py-1 text-sm border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            disabled={isLoading}
          />
          {isLoading && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-violet-500 border-t-transparent"></div>
            </div>
          )}
        </div>
      </div>
      <div className="max-w-[400px] flex justify-start gap-1 p-3 overflow-x-auto">
        <button className={`px-3 py-2 whitespace-nowrap text-sm font-medium rounded-full ${selectedChip === 'Today' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900 border border-neutral-200 shadow-sm'}`} onClick={() => handleChipClick(getDefaultDateRange(), 'Today')}>Today</button>
        <button className={`px-3 py-2 whitespace-nowrap text-sm font-medium rounded-full ${selectedChip === 'Last 7 days' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900 border border-neutral-200 shadow-sm'}`} onClick={() => handleChipClick({ from: subDays(new Date(), 6), to: new Date() }, 'Last 7 days')}>Last 7 days</button>
        <button className={`px-3 py-2 whitespace-nowrap text-sm font-medium rounded-full ${selectedChip === 'Last 30 days' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900 border border-neutral-200 shadow-sm'}`} onClick={() => handleChipClick({ from: subDays(new Date(), 29), to: new Date() }, 'Last 30 days')}>Last 30 days</button>
        <button className={`px-3 py-2 whitespace-nowrap text-sm font-medium rounded-full ${selectedChip === 'Year to date' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900 border border-neutral-200 shadow-sm'}`} onClick={() => handleChipClick({ from: new Date(new Date().getFullYear(), 0, 1), to: new Date() }, 'Year to date')}>Year to date</button>
        <button className={`px-3 py-2 whitespace-nowrap text-sm font-medium rounded-full ${selectedChip === 'Last year' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900 border border-neutral-200 shadow-sm'}`} onClick={() => handleChipClick({ from: new Date(new Date().getFullYear() - 1, 0, 1), to: new Date(new Date().getFullYear() - 1, 11, 31) }, 'Last year')}>Last year</button>
      </div>
      <div className="flex-1 overflow-auto">
        <Calendar
          mode="range"
          selected={selected}
          onSelect={handleCalendarSelect}
          initialFocus={false}
          numberOfMonths={1}
          month={month}
          onMonthChange={setMonth}
          disabled={disabledDays}
          className="w-full"
          classNames={{
            months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4 w-full",
            table: "w-full border-collapse space-y-1",
            head_row: "flex w-full",
            row: "flex w-full mt-2",
            cell: "h-9 flex-1 text-center text-sm p-0 relative",
            day: "h-9 w-9 p-0 font-normal"
          }}
        />
      </div>
      <div className="p-3 border-t border-neutral-200 flex justify-between mt-auto">
        <Button 
          variant="secondary" 
          size="extraSmall"
          onClick={() => {
            const today = new Date()
            setSelected({ from: today, to: today })
            setMonth(today)
          }}
        >
          Cancel
        </Button>
        <Button 
          variant="primary" 
          size="extraSmall"
          onClick={handleOK}
          disabled={!selected?.from}
        >
          Apply
        </Button>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <>
        <ShadcnButton
          variant={"outline"}
          className={cn(
            "w-fit justify-start text-left font-semibold",
            !dateRange && "text-muted-foreground"
          )}
          onClick={() => setIsOpen(true)}
        >
          <CalendarDaysIcon className="mr-1 h-5 w-5 text-neutral-600" />
          {dateRange?.from ? (
            <span>{formatDateRange(dateRange)}</span>
          ) : (
            <span className="text-neutral-600 font-semibold text-sm">Select date range</span>
          )}
        </ShadcnButton>
        <Drawer
          open={isOpen}
          onClose={() => setIsOpen(false)}
          title="Select Date Range"
        >
          {datePickerContent}
        </Drawer>
      </>
    )
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <ShadcnButton
          variant={"outline"}
          className={cn(
            "w-fit justify-start text-left font-semibold",
            !dateRange && "text-muted-foreground"
          )}
        >
          <CalendarDaysIcon className="mr-1 h-5 w-5 text-neutral-600" />
          {dateRange?.from ? (
            <span>{formatDateRange(dateRange)}</span>
          ) : (
            <span className="text-neutral-600 font-semibold text-sm">Select date range</span>
          )}
        </ShadcnButton>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        {datePickerContent}
      </PopoverContent>
    </Popover>
  )
}
