import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { Toaster } from '@/components/ui/sonner'
import { QueryProvider } from '@/providers/query-provider'
import SheetProvider from '@/providers/sheet-provider'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Ion Finance',
    description: 'A simple finance tracker',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ClerkProvider>
            <html lang='en'>
                <body className={inter.className}>
                    <QueryProvider>
                        <SheetProvider />
                        <Toaster />
                        {children}
                    </QueryProvider>
                </body>
            </html>
        </ClerkProvider>
    )
}
