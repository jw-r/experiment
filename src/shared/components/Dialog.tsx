import { css } from '@emotion/react'
import { useScrollLock } from 'hooks/useScrollLock'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

const createDialogContext = (rootComponentName: string) => {
  type DialogContextType = {
    open: boolean
    setOpen: (open: boolean) => void
  }

  const DialogContext = createContext<DialogContextType | null>(null)

  function DialogProvider({
    children,
    open: externalOpen,
    onOpenChange,
  }: {
    children: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }) {
    const [internalOpen, setInternalOpen] = useState(false)
    const isControlled = externalOpen !== undefined
    const open = isControlled ? externalOpen : internalOpen

    const setOpen = useCallback(
      (newOpen: boolean) => {
        if (!isControlled) {
          setInternalOpen(newOpen)
        }
        onOpenChange?.(newOpen)
      },
      [isControlled, onOpenChange]
    )

    const value = useMemo(() => ({ open, setOpen }), [open, setOpen])

    return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  }

  function useDialogContext(consumerName: string) {
    const context = useContext(DialogContext)
    if (context == null) {
      throw new Error(`${consumerName} must be used within ${rootComponentName}`)
    }
    return context
  }

  return [DialogProvider, useDialogContext] as const
}

const [DialogProvider, useDialogContext] = createDialogContext('Dialog')

type DialogProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

const Dialog = ({ children, open, onOpenChange }: DialogProps) => {
  return (
    <DialogProvider open={open} onOpenChange={onOpenChange}>
      {children}
    </DialogProvider>
  )
}

const DialogTrigger = ({ children }: { children: React.ReactNode }) => {
  const { setOpen } = useDialogContext('DialogTrigger')
  return <div onClick={() => setOpen(true)}>{children}</div>
}

const DialogContent = ({
  children,
  ignoreOverlayAction = false,
}: {
  children: React.ReactNode
  ignoreOverlayAction?: boolean
}) => {
  const { open, setOpen } = useDialogContext('DialogContent')
  if (!open) return null

  return (
    <PortalProvider>
      <div
        css={css`
          position: fixed;
          inset: 0;
          background-color: rgba(1, 1, 1, 0.7);
        `}
        onClick={() => !ignoreOverlayAction && setOpen(false)}
      />
      <div
        css={css`
          background-color: white;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 300px;
          padding: 20px;
          border-radius: 8px;
        `}
      >
        {children}
      </div>
    </PortalProvider>
  )
}

const DialogHeader = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

const DialogDescription = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

Dialog.Trigger = DialogTrigger
Dialog.Content = DialogContent
Dialog.Header = DialogHeader
Dialog.Description = DialogDescription

const PortalProvider = ({ children }: { children: React.ReactNode }) => {
  const id = useId()
  const portalRef = useRef<HTMLElement | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const portalRoot = document.getElementById(`dialog-${id}`) || document.createElement('div')
    portalRoot.id = `dialog-${id}`
    document.body.appendChild(portalRoot)
    portalRef.current = portalRoot
    setMounted(true)

    return () => {
      if (portalRef.current && portalRef.current.childNodes.length === 0) {
        document.body.removeChild(portalRef.current)
      }
    }
  }, [id])

  useScrollLock()

  if (!mounted || !portalRef.current) return null

  return createPortal(children, portalRef.current)
}

export default Dialog
