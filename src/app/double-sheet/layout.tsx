import { Metadata } from 'next'

import { cn } from '@/lib/utils'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex justify-center bg-gray-50">
      <div className="w-full max-w-[760px] min-h-screen shadow-xl">{children}</div>
    </div>
  )
}
