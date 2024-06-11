import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { insertAccountSchema } from '@/db/schema'
import { Loader2 } from 'lucide-react'
import { z } from 'zod'
import { useCreateAccount } from '../api/use-create-accounts'
import { useGetAccount } from '../api/use-get-account'
import { useOpenAccount } from '../hooks/use-open-account'
import AccountForm from './account-form'

const formSchema = insertAccountSchema.pick({
    name: true,
})

type FormValues = z.infer<typeof formSchema>

export default function EditAccountSheet() {
    const { isOpen, onClose, id } = useOpenAccount()

    const accountQuery = useGetAccount(id)
    const mutation = useCreateAccount()

    const isLoading = accountQuery.isLoading

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess() {
                onClose()
            },
        })
    }

    const defaultValues = accountQuery.data
        ? {
              name: accountQuery.data.name,
          }
        : {
              name: '',
          }

    return (
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
                        disabled={mutation.isPending}
                        defaultValues={defaultValues}
                        id={id}
                    />
                )}
            </SheetContent>
        </Sheet>
    )
}
