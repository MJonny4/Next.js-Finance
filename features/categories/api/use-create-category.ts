import { client } from '@/lib/hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<typeof client.api.categories.$post>
type RequestType = InferRequestType<typeof client.api.categories.$post>['json']

export const useCreateCategory = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.categories.$post({ json })
            return await response.json()
        },
        onSuccess: () => {
            toast.success('Category created successfully')
            // Fetch Category everytime you create a new Category
            queryClient.invalidateQueries({
                queryKey: ['categories'],
            })
        },
        onError: (error) => {
            toast.error(`Failed to create Category! ${error?.message}`)
        },
    })

    return mutation
}
