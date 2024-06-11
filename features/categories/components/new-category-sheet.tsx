import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { insertCategorySchema } from '@/db/schema'
import { z } from 'zod'
import CategoryForm from './category-form'
import { useNewCategory } from '../hooks/use-new-category'
import { useCreateCategory } from '../api/use-create-category'

const formSchema = insertCategorySchema.pick({
    name: true,
})

type FormValues = z.infer<typeof formSchema>

export default function NewCategorySheet() {
    const { isOpen, onClose } = useNewCategory()
    const mutation = useCreateCategory()

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
                    <SheetTitle>New Category</SheetTitle>
                    <SheetDescription>Add a new Category</SheetDescription>
                </SheetHeader>
                <CategoryForm
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
