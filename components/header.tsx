import HeaderLogo from '@/components/header-logo'
import Navigation from '@/components/navigation'
import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'
import WelcomeMsg from './welcome-msg'

export default function Header() {
    return (
        <header className='bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px14 pb-36'>
            {/* max-w-screen-2xl is the same as container */}
            <div className='max-w-screen-2xl mx-auto'>
                <div className='w-full flex items-center justify-between mb-14'>
                    <div className='flex items-center lg:gap-x-16'>
                        <HeaderLogo />
                        <Navigation />
                    </div>
                    <ClerkLoaded>
                        <UserButton afterSignOutUrl='/' />
                    </ClerkLoaded>
                    <ClerkLoading>
                        <Loader2 className='animate-spin text-slate-400 size-8' />
                    </ClerkLoading>
                </div>
                <WelcomeMsg />
            </div>
        </header>
    )
}
