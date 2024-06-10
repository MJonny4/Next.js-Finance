import { UserButton } from '@clerk/nextjs'

export default function Home() {
    return (
        <>
            <p>This is an authenticated page. You can see the user button below.</p>
            <UserButton />
        </>
    )
}
