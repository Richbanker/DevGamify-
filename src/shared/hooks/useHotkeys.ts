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
      const fn =
        map[combo] ||
        (e.key.toLowerCase() === 'k' && (e.ctrlKey || e.metaKey) ? map['mod+k'] : undefined)
      if (fn) {
        e.preventDefault()
        fn(e)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [map])
}
