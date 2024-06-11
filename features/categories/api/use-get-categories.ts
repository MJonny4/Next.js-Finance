import { client } from '@/lib/hono'
import { useQuery } from '@tanstack/react-query'

export const useGetCategories = () => {
    const query = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await client.api.categories.$get()

            if (!response.ok) {
                throw new Error(`Failed to fetch categories: ${response.status}`)
            }

            const { data } = await response.json()
            if (data) return data
        },
    })

    return query
}
