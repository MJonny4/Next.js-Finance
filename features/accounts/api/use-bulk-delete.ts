import { client } from '@/lib/hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<(typeof client.api.accounts)['bulk-delete']['$post']>
type RequestType = InferRequestType<(typeof client.api.accounts)['bulk-delete']['$post']>['json']

export const useBulkDeleteAccounts = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.accounts['bulk-delete']['$post']({
                json,
            })
            return await response.json()
        },
        onSuccess: () => {
            toast.success('Accounts deleted!')
            // Fetch account everytime you create a new account
            queryClient.invalidateQueries({
                queryKey: ['accounts'],
            })
            // TODO: Invalidate summary query
        },
        onError: (error) => {
            toast.error(`Failed to delete accounts: ${error.message}`)
        },
    })

    return mutation
}
