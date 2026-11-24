import { useEffect } from 'react'

type Map = { [combo: string]: (e: KeyboardEvent) => void }

export function useHotkeys(map: Map) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const parts = [
        e.ctrlKey || e.metaKey ? 'mod' : '',
        e.shiftKey ? 'shift' : '',
        e.altKey ? 'alt' : '',
        e.key.toLowerCase(),
      ].filter(Boolean)
      const combo = parts.join('+')
      const fn = map[combo]
      if (fn) {
        if (e.repeat) {
          e.preventDefault()
          return
        }
        e.preventDefault()
        fn(e)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [map])
}
