import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { insertAccountSchema } from '@/db/schema'
import { Loader2 } from 'lucide-react'
import { z } from 'zod'
import { useEditAccount } from '../api/use-edit-account'
import { useGetAccount } from '../api/use-get-account'
import { useOpenAccount } from '../hooks/use-open-account'
import AccountForm from './account-form'
import { useDeleteAccount } from '../api/use-delete-account'
import { useConfirm } from '@/hooks/use-confirm'

const formSchema = insertAccountSchema.pick({
    name: true,
})

type FormValues = z.infer<typeof formSchema>

export default function EditAccountSheet() {
    const { isOpen, onClose, id } = useOpenAccount()

    const [ConfirmDialog, confirm] = useConfirm(
        'Are you sure you want to delete this account?',
        "This action can't be undone.",
    )

    const accountQuery = useGetAccount(id)
    const editMutation = useEditAccount(id)
    const deleteMutation = useDeleteAccount(id)

    const isPending = editMutation.isPending || deleteMutation.isPending

    const isLoading = accountQuery.isLoading

    const onSubmit = (values: FormValues) => {
        editMutation.mutate(values, {
            onSuccess() {
                onClose()
            },
        })
    }

    const onDelete = async () => {
        const ok = await confirm()
        if (ok) {
            deleteMutation.mutate(undefined, {
                onSuccess() {
                    onClose()
                },
            })
        }
    }

    const defaultValues = accountQuery.data
        ? {
              name: accountQuery.data.name,
          }
        : {
              name: '',
          }

    return (
        <>
            <ConfirmDialog />
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className='space-y-4'>
                    <SheetHeader>
                        <SheetTitle>Edit Account</SheetTitle>
                        <SheetDescription>Update the account details below.</SheetDescription>
                    </SheetHeader>
                    {isLoading ? (
                        <div className='absolute inset-0 flex items-center justify-center'>
                            <Loader2 className='size-4 text-muted-foreground animate-spin' />
                        </div>
                    ) : (
                        <AccountForm
                            onSubmit={onSubmit}
                            disabled={isPending}
                            defaultValues={defaultValues}
                            id={id}
                            onDelete={onDelete}
                        />
                    )}
                </SheetContent>
            </Sheet>
        </>
    )
}
