import { clsx, type ClassValue } from 'clsx'
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
