import { client } from '@/lib/hono'
import { convertMiliunitsToAmount } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

export const useGetTransactions = () => {
    const params = useSearchParams()
    const from = params.get('from') || ''
    const to = params.get('to') || ''
    const accountId = params.get('accountId') || ''

    const query = useQuery({
        queryKey: ['transactions', { from, to, accountId }],
        queryFn: async () => {
            const response = await client.api.transactions.$get({
                query: { from, to, accountId },
            })

            if (!response.ok) {
                throw new Error(`Failed to fetch transactions: ${response.status}`)
            }

            const { data } = await response.json()
            if (data)
                return data.map((transaction) => ({
                    ...transaction,
                    amount: convertMiliunitsToAmount(transaction.amount),
                }))
        },
    })

    return query
}
