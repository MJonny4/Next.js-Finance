import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { insertAccountSchema } from '@/db/schema'
import { z } from 'zod'
import { useCreateAccount } from '../api/use-create-accounts'
import { useNewAccount } from '../hooks/use-new-account'
import AccountForm from './account-form'

const formSchema = insertAccountSchema.pick({
    name: true,
})

type FormValues = z.infer<typeof formSchema>

export default function NewAccountSheet() {
    const { isOpen, onClose } = useNewAccount()
    const mutation = useCreateAccount()

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess() {
                onClose()
            },
        })
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className='space-y-4'>
                <SheetHeader>
                    <SheetTitle>New Account</SheetTitle>
                    <SheetDescription>Add a new account to track your finances.</SheetDescription>
                </SheetHeader>
                <AccountForm
                    onSubmit={onSubmit}
                    disabled={mutation.isPending}
                    defaultValues={{
                        name: '',
                    }}
                />
            </SheetContent>
        </Sheet>
    )
}
