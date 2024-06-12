import { client } from '@/lib/hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<(typeof client.api.transactions)[':id']['$delete']>

export const useDeleteTransaction = (id?: string) => {
    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async (json) => {
            const response = await client.api.transactions[':id']['$delete']({ param: { id } })
            return await response.json()
        },
        onSuccess: () => {
            toast.success('Account deleted successfully!')
            // Fetch account everytime you create a new account
            queryClient.invalidateQueries({
                queryKey: ['transaction', { id }],
            })
            queryClient.invalidateQueries({
                queryKey: ['transactions'],
            })
            // TODO: Invalidate summary and transactions queries
        },
        onError: (error) => {
            toast.error(`Failed to delete account: ${error.message}`)
        },
    })

    return mutation
}
