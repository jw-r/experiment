import { useEffect, useRef } from 'react';

interface Props {
  enabled: boolean;
}

export const useScrollLock = (props?: Props) => {
  const originalStyleRef = useRef<string | null>(null);
  const enabled = props?.enabled ?? true;

  useEffect(() => {
    if (originalStyleRef.current === null) {
      originalStyleRef.current = document.body.style.overflow;
    }

    if (enabled) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalStyleRef.current;
    }

    return () => {
      document.body.style.overflow = originalStyleRef.current!;
    };
  }, [enabled]);
};
