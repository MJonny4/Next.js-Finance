import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { insertAccountSchema, insertTransactionSchema } from '@/db/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import Select from '@/components/select'
import DatePicker from '@/components/date-picker'
import { Textarea } from '@/components/ui/textarea'
import AmountInput from '@/components/amount-input'
import { convertAmountToMiliunits } from '@/lib/utils'

const formSchema = z.object({
    date: z.coerce.date(),
    accountId: z.string().min(1),
    categoryId: z.string().nullable().optional(),
    payee: z.string().min(1),
    amount: z.string().min(1),
    notes: z.string().nullable().optional(),
})

const apiSchema = insertTransactionSchema.omit({
    id: true,
})

type FormValues = z.infer<typeof formSchema>
type ApiFormValues = z.input<typeof apiSchema>

type Props = {
    id?: string
    defaultValues?: FormValues
    onSubmit: (values: ApiFormValues) => void
    onDelete?: () => void
    disabled?: boolean
    accountOptions: {
        label: string
        value: string
    }[]
    categoryOptions: {
        label: string
        value: string
    }[]
    onCreateCategory: (name: string) => void
    onCreateAccount: (name: string) => void
}

export default function TransactionForm({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disabled,
    accountOptions,
    categoryOptions,
    onCreateCategory,
    onCreateAccount,
}: Props) {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    })

    const handleSubmit = (values: FormValues) => {
        const amount = parseFloat(values.amount)
        const amountInMiliunits = convertAmountToMiliunits(amount)
        
        onSubmit({
            ...values,
            amount: amountInMiliunits,
        })
    }

    const handleDelete = () => {
        onDelete?.()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4 pt-4'>
                <FormField
                    name='date'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <DatePicker 
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={disabled}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                 <FormField
                    name='accountId'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Account</FormLabel>
                            <FormControl>
                                <Select 
                                    placeholder='Select an account'
                                    options={accountOptions}
                                    onCreate={onCreateAccount}
                                    onChange={field.onChange}
                                    value={field.value}
                                    disabled={disabled}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name='categoryId'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Select
                                    placeholder='Select a category'
                                    options={categoryOptions}
                                    onCreate={onCreateCategory}
                                    onChange={field.onChange}
                                    value={field.value}
                                    disabled={disabled}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name='payee'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Payee
                            </FormLabel>
                            <FormControl>
                                <Input 
                                    disabled={disabled}
                                    placeholder='Enter a payee'
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name='amount'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Amount
                            </FormLabel>
                            <FormControl>
                                <AmountInput
                                    {...field}
                                    disabled={disabled}
                                    placeholder='0.00'
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    name='notes'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Notes
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    value={field.value || ''}
                                    disabled={disabled}
                                    placeholder='Enter notes'
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button className='w-full' disabled={disabled}>
                    {id ? 'Save Changes' : 'Create Transaction'}
                </Button>
                {!!id && (
                    <Button
                        type='button'
                        disabled={disabled}
                        onClick={handleDelete}
                        className='w-full'
                        variant={'outline'}
                    >
                        <Trash className='size-4' />
                        <span className='ml-2'>Delete Transaction</span>
                    </Button>
                )}
            </form>
        </Form>
    )
}
