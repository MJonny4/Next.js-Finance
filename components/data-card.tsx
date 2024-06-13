import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn, formatCurrency, formatPercentage } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import { IconType } from 'react-icons/lib'
import { CountUp } from './count-up'

const boxVariants = cva('rounded-md p-3', {
    variants: {
        variant: {
            default: 'bg-blue-500/20',
            success: 'bg-emerald-500/20',
            danger: 'bg-rose-500/20',
            warning: 'bg-amber-500/20',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
})

const iconVariants = cva('size-6', {
    variants: {
        variant: {
            default: 'text-blue-500',
            success: 'text-emerald-500',
            danger: 'text-rose-500',
            warning: 'text-amber-500',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
})

type BoxVariants = VariantProps<typeof boxVariants>
type IconVariants = VariantProps<typeof iconVariants>

interface DataCardProps extends BoxVariants, IconVariants {
    icon: IconType
    title: string
    value?: number
    dateRange: string
    percentageChange?: number
}

export default function DataCard({
    icon: Icon,
    title,
    value = 0,
    dateRange,
    percentageChange = 0,
    variant,
}: DataCardProps) {
    const checkPercentageColor = (pctChange: number) => {
        if (title == 'Expenses' && pctChange < 0) {
            return 'text-emerald-500'
        } else if (title != 'Expenses' && pctChange > 0) {
            return 'text-emerald-500'
        } else {
            return 'text-rose-500'
        }
    }

    return (
        <Card>
            <CardHeader className='flex flex-row items-center justify-between gap-x-4'>
                <section className='space-y-2'>
                    <CardTitle className='text-2xl line-clamp-1'>{title}</CardTitle>
                    <CardDescription className='line-clamp-1'>{dateRange}</CardDescription>
                </section>
                <section className={cn('shrink-0', boxVariants({ variant }))}>
                    <Icon className={cn(iconVariants({ variant }))} />
                </section>
            </CardHeader>
            <CardContent>
                <h1 className='font-bold text-2xl mb-2 line-clamp-1 break-all'>
                    <CountUp
                        preserveValue
                        start={0}
                        end={value}
                        decimals={2}
                        decimalPlaces={2}
                        formattingFn={formatCurrency}
                    />
                </h1>
                <p className={cn('text-muted-foreground text-sm line-clamp-1', checkPercentageColor(percentageChange))}>
                    {formatPercentage(percentageChange, { addPrefix: true })} from last period
                </p>
            </CardContent>
        </Card>
    )
}
