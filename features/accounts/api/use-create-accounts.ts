import { client } from '@/lib/hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InferRequestType, InferResponseType } from 'hono'
import { toast } from 'sonner'

type ResponseType = InferResponseType<typeof client.api.accounts.$post>
type RequestType = InferRequestType<typeof client.api.accounts.$post>['json']

export const useCreateAccount = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.accounts.$post({ json })
            console.log(response)
            return await response.json()
        },
        onSuccess: () => {
            toast.success('Account created successfully')
            // Fetch account everytime you create a new account
            queryClient.invalidateQueries({
                queryKey: ['accounts'],
            })
        },
        onError: (error) => {
            toast.error(`Failed to create account! ${error?.message}`)
        },
    })

    return mutation
}
