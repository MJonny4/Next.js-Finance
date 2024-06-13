"use client"

import { usePathname } from 'next/navigation'
import AccountFilter from './account-filter'
import DateFilter from './date-filter'

const NOFILTERSNEEDED = ['/sign-in', '/sign-up', '/accounts', '/categories', '/settings']

export default function Filters() {
    const pathname = usePathname()

    if (NOFILTERSNEEDED.includes(pathname)) {
        return null
    }

    return (
        <section className='flex flex-col lg:flex-row items-center gap-y-2 lg:gap-y-0 lg:gap-x-2'>
            <AccountFilter />
            <DateFilter />
        </section>
    )
}
