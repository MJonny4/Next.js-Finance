'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

export default function SettingsPage() {
    return (
        <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
            <Card className='border-none drop-shadow-md'>
                <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
                    <CardTitle className='text-xl line-clamp-1'>Settings Page</CardTitle>
                    <Badge variant='destructive'>Not Implemented Yet</Badge>
                </CardHeader>
                <CardContent>
                    <Card className='mb-8'>
                        <CardHeader>
                            <CardTitle>General Settings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-4'>
                                <div className='flex flex-row items-center space-x-4'>
                                    <Label htmlFor='name'>Name</Label>
                                    <Input type='text' id='name' placeholder='Enter your name' />
                                </div>
                                <div className='flex items-center space-x-4'>
                                    <Label htmlFor='email'>Email</Label>
                                    <Input type='email' id='email' placeholder='Enter your email' />
                                </div>
                                <div className='flex items-center space-x-4'>
                                    <Label htmlFor='theme'>Theme</Label>
                                    <Select>
                                        <SelectTrigger className='w-[180px]'>
                                            <SelectValue placeholder='Select a theme' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='light'>Light</SelectItem>
                                            <SelectItem value='dark'>Dark</SelectItem>
                                            <SelectItem value='system'>System</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className='flex items-center space-x-4'>
                                    <Checkbox id='notifications' />
                                    <Label htmlFor='notifications'>Enable Notifications</Label>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Account Settings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-4'>
                                <div className='flex items-center space-x-4'>
                                    <Label htmlFor='currency'>Currency</Label>
                                    <Select>
                                        <SelectTrigger className='w-[180px]'>
                                            <SelectValue placeholder='Select currency' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='usd'>USD</SelectItem>
                                            <SelectItem value='eur'>EUR</SelectItem>
                                            <SelectItem value='gbp'>GBP</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className='flex items-center space-x-4'>
                                    <Label htmlFor='language'>Language</Label>
                                    <Select>
                                        <SelectTrigger className='w-[180px]'>
                                            <SelectValue placeholder='Select language' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='en'>English</SelectItem>
                                            <SelectItem value='es'>Spanish</SelectItem>
                                            <SelectItem value='fr'>French</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className='flex items-center space-x-4'>
                                    <Checkbox id='twoFactor' />
                                    <Label htmlFor='twoFactor'>Enable Two-Factor Authentication</Label>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className='mt-8'>
                        <Button>Save Changes</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
