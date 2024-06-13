import { AreaChart, BarChart, FileSearch, LineChart } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import AreaVariant from './area-variant'
import BarVariant from './bar-variant'
import LineVariant from './line-variant'
import { useState } from 'react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select'

type ChartProps = {
    data?: {
        date: string
        income: number
        expenses: number
    }[]
}

export default function Chart({ data = [] }: ChartProps) {
    const [chartType, setChartType] = useState<'line' | 'bar' | 'area'>('area')

    const onTypeChange = (type: 'line' | 'bar' | 'area') => {
        // TODO: Paywall

        setChartType(type)
    }

    return (
        <Card className='border-none drop-shadow-sm'>
            <CardHeader className='flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between'>
                <CardTitle className='text-xl line-clamp-1'>Transactions</CardTitle>
                <Select defaultValue={chartType} onValueChange={onTypeChange}>
                    <SelectTrigger className='lg:w-auto h-9 rounded-md px-3'>
                        <SelectValue placeholder='Chart type' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='area'>
                            <div className='inline-flex items-center'>
                                <AreaChart className='size-4 mr-2 shrink-0' />
                                <p className='line-clamp-1'>Area chart</p>
                            </div>
                        </SelectItem>
                        <SelectItem value='bar'>
                            <div className='inline-flex items-center'>
                                <BarChart className='size-4 mr-2 shrink-0' />
                                <p className='line-clamp-1'>Bar chart</p>
                            </div>
                        </SelectItem>
                        <SelectItem value='line'>
                            <div className='inline-flex items-center'>
                                <LineChart className='size-4 mr-2 shrink-0' />
                                <p className='line-clamp-1'>Line chart</p>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                {data.length === 0 ? (
                    <section className='flex flex-col gap-y-4 items-center justify-center h-[350px] w-full'>
                        <FileSearch className='size-6 text-muted-foreground' />
                        <p className='text-muted-foreground text-sm'>No data for the selected period</p>
                    </section>
                ) : (
                    <>
                        {chartType === 'area' && <AreaVariant data={data} />}
                        {chartType === 'bar' && <BarVariant data={data} />}
                        {chartType === 'line' && <LineVariant data={data} />}
                    </>
                )}
            </CardContent>
        </Card>
    )
}
