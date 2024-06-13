import { ClerkLoaded, ClerkLoading, SignIn } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Page() {
    return (
        <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2'>
            <div className='h-full lg:flex flex-col items-center justify-center px-4'>
                <div className='text-center space-y-4 pt-16'>
                    <h1 className='font-bold text-3xl text-slate-800'>Welcome Back</h1>
                    <p className='text-base text-gray-500'>Login or Create account to get back to your dashboard!</p>
                </div>
                <Card className='mt-8'>
                    <CardHeader>
                        <CardTitle>Test Account</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='flex flex-col items-center justify-center gap-4'>
                            <div className='flex flex-row items-center justify-center gap-5'>
                                <p>Email: test@test.com</p>
                                <p>Password: test1234</p>
                            </div>
                            <p className='text-sm text-gray-500'>Use these credentials to log in with the test account.</p>
                        </div>
                    </CardContent>
                </Card>
                <div className='flex items-center justify-center mt-8'>
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