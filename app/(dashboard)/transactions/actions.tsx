'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useDeleteTransaction } from '@/features/transactions/api/use-delete-transaction'
import { useOpenTransaction } from '@/features/transactions/hooks/use-open-transaction'
import { useConfirm } from '@/hooks/use-confirm'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'

type Props = {
    id: string
}

export const Actions = ({ id }: Props) => {
    const { onOpen } = useOpenTransaction()
    const deleteMutation = useDeleteTransaction(id)

    const [ConfirmDialog, confirm] = useConfirm(
        'Are you sure you want to delete this transaction?',
        "This action can't be undone.",
    )

    const handleDelete = async () => {
        const ok = await confirm()
        if (ok) {
            deleteMutation.mutate()
        }
    }

    return (
        <>
            <ConfirmDialog />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={'ghost'} className='size-8 p-0'>
                        <MoreHorizontal className='size-4' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuItem
                        disabled={deleteMutation.isPending}
                        onClick={() => {
                            onOpen(id)
                        }}
                    >
                        <Edit className='size-4 mr-2' />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        disabled={deleteMutation.isPending}
                        onClick={handleDelete}
                        className='text-red-500'
                    >
                        <Trash className='size-4 mr-2' />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
