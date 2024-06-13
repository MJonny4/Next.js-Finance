import { Badge } from '@/components/ui/badge'
import { SignIn, ClerkLoaded, ClerkLoading } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'

export default function Page() {
    return (
        <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2'>
            <div className='h-full lg:flex flex-col items-center justify-center px-4'>
                <div className='text-center space-y-4 pt-16'>
                    <h1 className='font-bold text-3xl text-slate-800'>Welcome Back</h1>
                    <p className='text-base text-gray-500'>Login or Create account to get back to your dashboard!</p>
                </div>
                <Badge className='my-2 px-5 hover:bg-none'>
                    <article className='flex flex-row items-center justify-center gap-5'>
                        <p>Email: test@test.com</p>
                        <p>Password: test1234</p>
                    </article>
                </Badge>
                <div className='flex items-center justify-center mt-2'>
                    <ClerkLoaded>
                        <SignIn />
                    </ClerkLoaded>
                    <ClerkLoading>
                        <Loader2 className='animate-spin text-muted-foreground' />
                    </ClerkLoading>
                </div>
            </div>
            <div className='h-full bg-blue-600 hidden lg:flex items-center justify-center'>
                <Image src='/logo.svg' width={200} height={200} alt='Logo' />
            </div>
        </div>
    )
}
