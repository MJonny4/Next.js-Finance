'use client'

import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useBulkDeleteTransactions } from '@/features/transactions/api/use-bulk-delete-transactions'
import { useGetTransactions } from '@/features/transactions/api/use-get-transactions'
import { useNewTransaction } from '@/features/transactions/hooks/use-new-transaction'
import { Loader2, Plus } from 'lucide-react'
import { columns } from './columns'
import { useState } from 'react'
import UploadButton from './upload-button'
import ImportCard from './import-card'

enum VARIANTS {
    LIST = 'LIST',
    IMPORT = 'IMPORT',
}

type InitialImportResults = {
    data: any[]
    errors: any[]
    meta: any
}

export default function TransactionsPage() {
    const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST)
    const [importResults, setImportResults] = useState<InitialImportResults | null>(null)

    const onUpload = (results: InitialImportResults) => {
        setImportResults(results)
        setVariant(VARIANTS.IMPORT)
    }

    const onCancelImport = () => {
        setImportResults(null)
        setVariant(VARIANTS.LIST)
    }

    const newTransaction = useNewTransaction()
    const transactionsQuery = useGetTransactions()
    const deleteTransactions = useBulkDeleteTransactions()

    const transactions = transactionsQuery?.data || []
    const isDisabled = transactionsQuery.isLoading || deleteTransactions.isPending

    if (transactionsQuery.isLoading) {
        return (
            <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
                <Card className='border-none drop-shadow-md'>
                    <CardHeader>
                        <Skeleton className='h-8 w-48' />
                    </CardHeader>
                    <CardContent>
                        <div className='h-[500px] w-full flex items-center justify-center'>
                            <Loader2 className='size-6 text-slate-300 animate-spin' />
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (variant === VARIANTS.IMPORT) {
        return <ImportCard data={importResults?.data || []} onCanceled={onCancelImport} onSubmit={() => {}} />
    }

    return (
        <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
            <Card className='border-none drop-shadow-md'>
                <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
                    <CardTitle className='text-xl line-clamp-1'>Transactions History</CardTitle>
                    <div className='flex flex-col lg:flex-row items-center gap-2'>
                        <Button size={'sm'} onClick={newTransaction.onOpen} className='w-full lg:w-auto'>
                            <Plus className='size-4 mr-2' />
                            Add new
                        </Button>
                        <UploadButton onUpload={onUpload} />
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable
                        filterKey='payee'
                        columns={columns}
                        data={transactions}
                        onDelete={(row) => {
                            const ids = row?.map((r) => r.original.id)
                            deleteTransactions.mutate({ ids })
                        }}
                        disabled={isDisabled}
                    />
                </CardContent>
            </Card>
        </div>
    )
}
