'use client'

import { PropsWithChildren, useEffect, useState } from 'react'
import { Button } from './ui/button'
import serverLog from '@/app/keypad-issue/actions'

export default function FixedBottomButton({ children, keypadHeight }: PropsWithChildren<any>) {
  return (
    <Button
      className="absolute right-1/2 translate-x-1/2 h-[40px] button"
      onClick={() => {
        serverLog()
      }}
      style={{
        bottom: keypadHeight + 20,
      }}
    >
      {children}
    </Button>
  )
}
