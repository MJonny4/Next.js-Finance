import { Button } from '@/components/ui/button'
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogHeader,
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'

type AccountDialogProps = {
    open: boolean
    onSubmit: (accountId: string) => void
    onCancel: () => void
}

const AccountDialog = ({ open, onSubmit, onCancel }: AccountDialogProps) => {
    const { data: accounts } = useGetAccounts()
    const [selectedAccountId, setSelectedAccountId] = useState('')

    const handleSubmit = () => {
        onSubmit(selectedAccountId)
    }

    return (
        <Dialog open={open} onOpenChange={onCancel}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Select an Account</DialogTitle>
                    <DialogDescription>Please select an account for the transactions.</DialogDescription>
                </DialogHeader>
                <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
                    <SelectTrigger>
                        <SelectValue placeholder='Select an account' />
                    </SelectTrigger>
                    <SelectContent>
                        {accounts?.map((account) => (
                            <SelectItem key={account.id} value={account.id}>
                                {account.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <DialogFooter>
                    <Button onClick={handleSubmit} disabled={!selectedAccountId}>
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AccountDialog
