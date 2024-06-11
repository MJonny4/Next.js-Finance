import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { insertCategorySchema } from '@/db/schema'
import { Loader2 } from 'lucide-react'
import { z } from 'zod'

import { useConfirm } from '@/hooks/use-confirm'
import { useDeleteCategory } from '../api/use-delete-category'
import { useEditCategory } from '../api/use-edit-category'
import { useGetCategory } from '../api/use-get-category'
import { useOpenCategory } from '../hooks/use-open-category'
import CategoryForm from './category-form'

const formSchema = insertCategorySchema.pick({
    name: true,
})

type FormValues = z.infer<typeof formSchema>

export default function EditCategorySheet() {
    const { isOpen, onClose, id } = useOpenCategory()

    const [ConfirmDialog, confirm] = useConfirm(
        'Are you sure you want to delete this Category?',
        "This action can't be undone.",
    )

    const categoryQuery = useGetCategory(id)
    const editMutation = useEditCategory(id)
    const deleteMutation = useDeleteCategory(id)

    const isPending = editMutation.isPending || deleteMutation.isPending

    const isLoading = categoryQuery.isLoading

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

    const defaultValues = categoryQuery.data
        ? {
              name: categoryQuery.data.name,
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
                        <SheetTitle>Edit Category</SheetTitle>
                        <SheetDescription>Update the Category details below.</SheetDescription>
                    </SheetHeader>
                    {isLoading ? (
                        <div className='absolute inset-0 flex items-center justify-center'>
                            <Loader2 className='size-4 text-muted-foreground animate-spin' />
                        </div>
                    ) : (
                        <CategoryForm
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
