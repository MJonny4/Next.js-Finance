import { format } from 'date-fns'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import CustomTooltip from './custom-tooltip'

type ChartProps = {
    data: {
        date: string
        income: number
        expenses: number
    }[]
}

function BarVariant({ data }: ChartProps) {
    return (
        <ResponsiveContainer width={'100%'} height={350}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis
                    axisLine={false}
                    dataKey='date'
                    tickLine={false}
                    tickFormatter={(value) => {
                        return format(value, 'dd MMM')
                    }}
                    tickMargin={16}
                    style={{ fontSize: '0.75rem' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey={'income'} fill='#3D82F6' className='drop-shadow-sm' />
                <Bar dataKey={'expenses'} fill='#F43F5E' className='drop-shadow-sm' />
            </BarChart>
        </ResponsiveContainer>
    )
}
export default BarVariant
