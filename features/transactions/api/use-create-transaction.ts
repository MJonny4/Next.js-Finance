import { client } from '@/lib/hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<typeof client.api.transactions.$post>
type RequestType = InferRequestType<typeof client.api.transactions.$post>['json']

export const useCreateTransaction = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.transactions.$post({ json })
            return await response.json()
        },
        onSuccess: () => {
            toast.success('Account Transaction successfully')
            // Fetch account everytime you create a new account
            queryClient.invalidateQueries({
                queryKey: ['transactions'],
            })
        },
        onError: (error) => {
            toast.error(`Failed to create account! ${error?.message}`)
        },
    })

    return mutation
}
