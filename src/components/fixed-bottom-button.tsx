'use client'

import { PropsWithChildren } from 'react'
import { Button } from './ui/button'
import serverLog from '@/app/keypad-issue/actions'

export default function FixedBottomButton({ children }: PropsWithChildren<any>) {
  return (
    <Button
      className="absolute bottom-5 right-1/2 translate-x-1/2 h-[40px] button"
      onClick={() => {
        serverLog()
      }}
    >
      {children}
    </Button>
  )
}
