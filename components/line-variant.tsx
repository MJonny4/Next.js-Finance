import { format } from 'date-fns'
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import CustomTooltip from './custom-tooltip'

type ChartProps = {
    data: {
        date: string
        income: number
        expenses: number
    }[]
}

function LineVariant({ data }: ChartProps) {
    return (
        <ResponsiveContainer width={'100%'} height={350}>
            <LineChart data={data}>
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
                <Line dataKey={'income'} stroke='#3D82F6' strokeWidth={2} className='drop-shadow-sm' dot={false} />
                <Line dataKey={'expenses'} stroke='#F43F5E' strokeWidth={2} className='drop-shadow-sm' dot={false} />
            </LineChart>
        </ResponsiveContainer>
    )
}
export default LineVariant
