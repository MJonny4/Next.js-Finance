import { client } from '@/lib/hono'
import { useQuery } from '@tanstack/react-query'

export const useGetTransaction = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ['transactions', { id }], // This will make sure that the query is invalidated when the id changes
        queryFn: async () => {
            const response = await client.api.transactions[':id'].$get({
                param: { id },
            })

            if (!response.ok) {
                throw new Error(`Failed to fetch individual transaction: ${response.status}`)
            }

            const { data } = await response.json()
            if (data) return data
        },
    })

    return query
}
