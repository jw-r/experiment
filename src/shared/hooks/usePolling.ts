import { useEffect, useCallback } from 'react'

interface UsePollingOptions<T> {
  pollingFunction: () => Promise<T>
  interval: number
  onSuccess?: (result: T) => void
  onError?: (error: Error) => void
  enabled?: boolean
}

export function usePolling<T>({
  pollingFunction,
  interval,
  onSuccess,
  onError,
  enabled = true,
}: UsePollingOptions<T>) {
  const poll = useCallback(async () => {
    try {
      const result = await pollingFunction()
      if (onSuccess) {
        onSuccess(result)
      }
    } catch (error) {
      if (onError) {
        onError(error as Error)
      }
    }
  }, [pollingFunction, onSuccess, onError])

  useEffect(() => {
    if (!enabled) {
      return
    }

    poll()

    const intervalId = setInterval(poll, interval)

    return () => {
      clearInterval(intervalId)
    }
  }, [poll, interval, enabled])
}
