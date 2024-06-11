import { client } from '@/lib/hono'
import { useQuery } from '@tanstack/react-query'

export const useGetCategory = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ['category', { id }], // This will make sure that the query is invalidated when the id changes
        queryFn: async () => {
            const response = await client.api.categories[':id'].$get({
                param: { id },
            })

            if (!response.ok) {
                throw new Error(`Failed to fetch individual category: ${response.status}`)
            }

            const { data } = await response.json()
            if (data) return data
        },
    })

    return query
}
