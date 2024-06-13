'use client'

import { useGetSummary } from '@/features/summary/use-get-summary'
import Chart from './chart'
import SpendingPie, { SpendingPieLoading } from './spending-pie'
import { Skeleton } from './ui/skeleton'
import { Card, CardContent, CardHeader } from './ui/card'
import { Loader2 } from 'lucide-react'

export default function DataCharts() {
    const { data, isLoading } = useGetSummary()

    if (isLoading) {
        return (
            <section className='grid grid-cols-1 lg:grid-cols-6 gap-8'>
                <div className='col-span-1 lg:col-span-3 xl:col-span-4'>
                    {/* <Chart data={data?.days} /> */}
                    <ChartLoading />
                </div>
                <div className='col-span-1 lg:col-span-3 xl:col-span-2'>
                    <SpendingPieLoading />
                </div>
            </section>
        )
    }

    return (
        <section className='grid grid-cols-1 lg:grid-cols-6 gap-8'>
            <div className='col-span-1 lg:col-span-3 xl:col-span-4'>
                <Chart data={data?.days} />
            </div>
            <div className='col-span-1 lg:col-span-3 xl:col-span-2'>
                <SpendingPie data={data?.categories} />
            </div>
        </section>
    )
}

export const ChartLoading = () => {
    return (
        <Card className='border-none drop-shadow-sm'>
            <CardHeader className='flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between'>
                <Skeleton className='h-8 w-48' />
                <Skeleton className='h-8 lg:w-[120px] w-full' />
            </CardHeader>
            <CardContent>
                <div className='h-[350px] w-full flex items-center justify-center'>
                    <Loader2 className='size-6 text-slate-300 animate-spin' />
                </div>
            </CardContent>
        </Card>
    )
}
