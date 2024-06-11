import { client } from '@/lib/hono'
import { useQuery } from '@tanstack/react-query'

export const useGetAccounts = () => {
    const query = useQuery({
        queryKey: ['accounts'],
        queryFn: async () => {
            const response = await client.api.accounts.$get()

            if (!response.ok) {
                throw new Error(`Failed to fetch accounts: ${response.status}`)
            }

            const { data } = await response.json()
            if (data) return data
        },
    })

    return query
}
