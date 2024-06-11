import { client } from '@/lib/hono'
import { useQuery } from '@tanstack/react-query'

export const useGetAccount = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ['accounts', { id }], // This will make sure that the query is invalidated when the id changes
        queryFn: async () => {
            const response = await client.api.accounts[':id'].$get({
                param: { id },
            })

            if (!response.ok) {
                throw new Error(`Failed to fetch individual account: ${response.status}`)
            }

            const { data } = await response.json()
            if (data) return data
        },
    })

    return query
}
