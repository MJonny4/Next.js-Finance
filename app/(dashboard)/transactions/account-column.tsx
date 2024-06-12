import { useOpenAccount } from '@/features/accounts/hooks/use-open-account'

type Props = {
    account: string
    accountId: string
}

export default function AccountColumn({ account, accountId }: Props) {
    const { onOpen: onOpenAccount } = useOpenAccount()

    const onClick = () => {
        onOpenAccount(accountId)
    }

    return (
        <div className='flex items-center cursor-pointer hover:underline' onClick={onClick} title={account}>
            {account}
        </div>
    )
}
