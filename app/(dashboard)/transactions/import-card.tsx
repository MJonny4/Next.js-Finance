import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '../../../components/ui/button'
import { useState } from 'react'
import ImportTable from './import-table'

const dateFormat = 'yyyy-MM-dd HH:mm:ss'
const outputFormat = 'yyyy-MM-dd'

const requiredOptions = ['amount', 'date', 'payee']

interface SelectedColumnState {
    [key: string]: string | null
}

type Props = {
    data: string[][]
    onCanceled: () => void
    onSubmit: (data: any) => void
}

export default function ImportCard({ data, onCanceled, onSubmit }: Props) {
    const [selectedColumns, setSelectedColumns] = useState<SelectedColumnState>({})

    const headers = data[0]
    const body = data.slice(1)

    const onTableHeadSelectChange = (columnIndex: number, value: string | null) => {
        setSelectedColumns((prev) => {
            const newSelectedColumns = { ...prev }

            for (const key in newSelectedColumns) {
                if (newSelectedColumns[key] === value) {
                    newSelectedColumns[key] = null
                }
            }

            if (value === 'skip') {
                value = null
            }

            newSelectedColumns[`column_${columnIndex}`] = value
            return newSelectedColumns
        })
    }

    const progress = Object.values(selectedColumns).filter(Boolean).length

    return (
        <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
            <Card className='border-none drop-shadow-md'>
                <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
                    <CardTitle className='text-xl line-clamp-1'>Import Transactions</CardTitle>
                    <div className='flex flex-col lg:flex-row justify-center items-center gap-2'>
                        <Button size={'sm'} onClick={onCanceled} className='w-full lg:w-auto'>
                            Cancel
                        </Button>
                        <Button
                            size={'sm'}
                            disabled={progress < requiredOptions.length}
                            // onClick
                            className='w-full lg:w-auto'
                        >
                            Continue ({progress} / {requiredOptions.length})
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <ImportTable
                        headers={headers}
                        body={body}
                        selectedColumns={selectedColumns}
                        onTableHeadSelectChange={onTableHeadSelectChange}
                    />
                </CardContent>
            </Card>
        </div>
    )
}
