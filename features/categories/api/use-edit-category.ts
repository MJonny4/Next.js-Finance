import { client } from '@/lib/hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<(typeof client.api.categories)[':id']['$patch']>
type RequestType = InferRequestType<(typeof client.api.categories)[':id']['$patch']>['json']

export const useEditCategory = (id?: string) => {
    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.categories[':id']['$patch']({ json, param: { id } })
            return await response.json()
        },
        onSuccess: () => {
            toast.success('Category updated successfully')
            // Fetch categories everytime you create a new categories
            queryClient.invalidateQueries({
                queryKey: ['category', { id }],
            })
            queryClient.invalidateQueries({
                queryKey: ['categories'],
            })
            // TODO: Invalidate summary and transactions queries
        },
        onError: (error) => {
            toast.error(`Failed to update category: ${error.message}`)
        },
    })

    return mutation
}
