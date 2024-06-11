'use client'

import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useNewAccount } from '@/features/accounts/hooks/use-new-account'
import { Plus } from 'lucide-react'
import { Payment, columns } from './columns'

async function getData(): Promise<Payment[]> {
    return [
        {
            id: '728ed52f',
            amount: 100,
            status: 'pending',
            email: 'm@example.com',
        },
    ]
}

const data = [
    {
        id: '728ed52f',
        amount: 100,
        status: 'pending',
        email: 'ionny@gmail.com',
    },
    {
        id: '54554g4',
        amount: 60,
        status: 'pending',
        email: 'maria@gmail.com',
    },
]

export default function AccountsPage() {
    const newAccount = useNewAccount()

    return (
        <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
            <Card className='border-none drop-shadow-md'>
                <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
                    <CardTitle className='text-xl line-clamp-1'>Accounts Page</CardTitle>
                    <Button size={'sm'} onClick={newAccount.onOpen}>
                        <Plus className='size-4 mr-2' />
                        Add new
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable filterKey='email' columns={columns} data={data} onDelete={() => {}} disabled />
                </CardContent>
            </Card>
        </div>
    )
}
