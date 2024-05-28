'use client'

import { PropsWithChildren, useEffect, useState } from 'react'
import throttle from 'lodash.throttle'
import styles from './safe-viewport.module.css'

interface Props extends PropsWithChildren {
  makeScrollable?: boolean
}

const minKeypadHeight = 300

export default function SafeViewport({ children }: Props) {
  const [isKeypadOpen, setIsKeypadOpen] = useState(false)

  useEffect(() => {
    if (document.documentElement.getAttribute('data-viewport-listener') === 'true') {
      return
    }

    function handleResize() {
      document.documentElement.style.setProperty(
        '--safe-viewport-vh',
        `${window.visualViewport!.height * 0.01}px`
      )

      if (window.innerHeight - window.visualViewport!.height >= minKeypadHeight) {
        setIsKeypadOpen(true)
      } else {
        setIsKeypadOpen(false)
      }
    }

    handleResize()

    const throttledHandleResize = throttle(handleResize, 200)

    window.visualViewport!.addEventListener('resize', throttledHandleResize)
    document.documentElement.setAttribute('data-viewport-listener', 'true')

    return () => {
      window.visualViewport!.removeEventListener('resize', throttledHandleResize)
      document.documentElement.setAttribute('data-viewport-listener', 'false')
    }
  }, [])

  return (
    <div className={styles.safeViewportHeight}>
      {isKeypadOpen && <div className={styles.makeScrollable} />}
      {children}
    </div>
  )
}
