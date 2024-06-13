import { clsx, type ClassValue } from 'clsx'
import exp from 'constants'
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function convertAmountToMiliunits(amount: number) {
    return Math.round(amount * 1000)
}

export function convertMiliunitsToAmount(miliunits: number) {
    return miliunits / 1000
}

export const formatCurrency = (amount: number) => {
    return Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
    }).format(amount)
}

export const calculatePercentageChange = (current: number, previous: number) => {
    if (previous === 0 || previous === null) {
        return previous === current ? 0 : 100
    }
    console.log(previous)
    return ((current - previous) / previous) * 100
}

export const fillMissingDays = (
    activeDays: {
        date: Date
        income: number
        expenses: number
    }[],
    startDate: Date,
    endDate: Date,
) => {
    if (activeDays.length === 0) {
        return []
    }

    const allDays = eachDayOfInterval({ start: startDate, end: endDate })

    const transactionsByDate = allDays.map((day) => {
        const found = activeDays.find((activeDay) => isSameDay(activeDay.date, day))

        if (found) {
            return found
        } else {
            return {
                date: day,
                income: 0,
                expenses: 0,
            }
        }
    })

    return transactionsByDate
}

type TPeriod = {
    from: string | Date | undefined
    to: string | Date | undefined
}

export function formatDateRange(period?: TPeriod) {
    const defaultTo = new Date()
    const defaultFrom = subDays(defaultTo, 30)

    if (!period?.from) {
        return `${format(defaultFrom, 'LLL dd')} - ${format(defaultTo, 'LLL dd, y')}`
    }

    if (period?.to) {
        return `${format(period.from, 'LLL dd')} - ${format(period.to, 'LLL dd, y')}`
    }

    return format(period.from, 'LLL dd, y')
}

export function formatPercentage(
    value: number,
    options: { addPrefix?: boolean } = {
        addPrefix: false,
    },
) {
    const result = new Intl.NumberFormat('de-DE', {
        style: 'percent',
        minimumFractionDigits: 2,
    }).format(value / 100)

    if (options.addPrefix && value > 0) {
        return `+${result}`
    }

    return result
}
