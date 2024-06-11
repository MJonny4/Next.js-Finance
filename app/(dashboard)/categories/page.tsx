'use client'

import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useNewCategory } from '@/features/categories/hooks/use-new-category'
import { Loader2, Plus } from 'lucide-react'
import { columns } from './columns'
import { useGetCategories } from '@/features/categories/api/use-get-categories'
import { Skeleton } from '@/components/ui/skeleton'
import { useBulkDeleteCategories } from '@/features/categories/api/use-bulk-delete-categories'

export default function CategoriesPage() {
    const newCategory = useNewCategory()
    const categoriesQuery = useGetCategories()
    const deleteAccounts = useBulkDeleteCategories()

    const categories = categoriesQuery?.data || []
    const isDisabled = categoriesQuery.isLoading || deleteAccounts.isPending

    if (categoriesQuery.isLoading) {
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

    return (
        <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
            <Card className='border-none drop-shadow-md'>
                <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
                    <CardTitle className='text-xl line-clamp-1'>Categories page</CardTitle>
                    <Button size={'sm'} onClick={newCategory.onOpen}>
                        <Plus className='size-4 mr-2' />
                        Add new
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable
                        filterKey='name'
                        columns={columns}
                        data={categories}
                        onDelete={(row) => {
                            const ids = row?.map((r) => r.original.id)
                            deleteAccounts.mutate({ ids })
                        }}
                        disabled={isDisabled}
                    />
                </CardContent>
            </Card>
        </div>
    )
}
