'use client'

import { useGetSummary } from '@/features/summary/use-get-summary'
import { DataCardLoading } from './data-grid'
import Chart from './chart'

export default function DataCharts() {
    const { data, isLoading } = useGetSummary()

    if (isLoading) {
        return (
            <div className='grid place-content-center'>
                <DataCardLoading />
            </div>
        )
    }

    return (
        <section className='grid grid-cols-1 lg:grid-cols-6 gap-8'>
            <div className='col-span-1 lg:col-span-3 xl:col-span-4'>
                <Chart data={data?.days} />
            </div>
        </section>
    )
}
