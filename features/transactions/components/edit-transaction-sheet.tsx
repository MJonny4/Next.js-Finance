import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { insertTransactionSchema } from '@/db/schema'
import { Loader2 } from 'lucide-react'
import { z } from 'zod'
import { useEditTransaction } from '../api/use-edit-transaction'
import { useGetTransaction } from '../api/use-get-transaction'
import { useOpenTransaction } from '../hooks/use-open-transaction'
import TransactionForm from './transaction-form'
import { useDeleteTransaction } from '../api/use-delete-transaction'
import { useConfirm } from '@/hooks/use-confirm'
import { useGetCategories } from '@/features/categories/api/use-get-categories'
import { useCreateCategory } from '@/features/categories/api/use-create-category'
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts'
import { useCreateAccount } from '@/features/accounts/api/use-create-accounts'
import { convertMiliunitsToAmount } from '@/lib/utils'

const formSchema = insertTransactionSchema.omit({
    id: true,
})

type FormValues = z.infer<typeof formSchema>

export default function EditTransactionSheet() {
    const { isOpen, onClose, id } = useOpenTransaction()

    const [ConfirmDialog, confirm] = useConfirm(
        'Are you sure you want to delete this transaction?',
        "This action can't be undone.",
    )

    const transactionQuery = useGetTransaction(id)
    const editMutation = useEditTransaction(id)
    const deleteMutation = useDeleteTransaction(id)

    const categoryQuery = useGetCategories()
    const categoryMutation = useCreateCategory()
    const onCreateCategory = (name: string) => categoryMutation.mutate({ name })
    const categoryOptions = (categoryQuery.data || []).map((category) => ({
        label: category.name,
        value: category.id,
    }))

    const accountQuery = useGetAccounts()
    const accountMutation = useCreateAccount()
    const onCreateAccount = (name: string) => accountMutation.mutate({ name })
    const accountOptions = (accountQuery.data || []).map((account) => ({
        label: account.name,
        value: account.id,
    }))

    const isPending =
        editMutation.isPending || deleteMutation.isPending || categoryMutation.isPending || accountMutation.isPending
    const isLoading = transactionQuery.isLoading || categoryQuery.isLoading || accountQuery.isLoading

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



    const defaultValues = transactionQuery.data
        ? {
              accountId: transactionQuery.data.accountId,
              categoryId: transactionQuery.data.categoryId,
              amount: convertMiliunitsToAmount(transactionQuery.data.amount).toString(),
              date: transactionQuery.data.date ? new Date(transactionQuery.data.date) : new Date(),
              payee: transactionQuery.data.payee,
              notes: transactionQuery.data.notes,
          }
        : {
              accountId: '',
              categoryId: '',
              amount: '',
              date: new Date(),
              payee: '',
              notes: '',
          }

    return (
        <>
            <ConfirmDialog />
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className='space-y-4'>
                    <SheetHeader>
                        <SheetTitle>Edit Transaction</SheetTitle>
                        <SheetDescription>Edit the transaction details below.</SheetDescription>
                    </SheetHeader>
                    {isLoading ? (
                        <div className='absolute inset-0 flex items-center justify-center'>
                            <Loader2 className='size-4 text-muted-foreground animate-spin' />
                        </div>
                    ) : (
                        <TransactionForm
                            id={id}
                            defaultValues={defaultValues}
                            onSubmit={onSubmit}
                            disabled={isPending}
                            categoryOptions={categoryOptions}
                            onCreateCategory={onCreateCategory}
                            accountOptions={accountOptions}
                            onCreateAccount={onCreateAccount}
                            onDelete={onDelete}
                        />
                    )}
                </SheetContent>
            </Sheet>
        </>
    )
}
