import { useEffect, useState } from 'react'

export function ThemeSwitch() {
  const [dark, setDark] = useState(() => {
    try {
      const stored = localStorage.getItem('theme')
      if (stored === 'dark' || stored === 'light') return stored === 'dark'
    } catch {
      // The browser may block storage.
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    } catch {
      // Theme remains usable without persistence.
    }
  }, [dark])

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setDark((v) => !v)}
      className="rounded-xl border border-slate-200 px-3 py-1.5 text-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-800 dark:hover:bg-slate-900"
    >
      {dark ? 'Dark' : 'Light'}
    </button>
  )
}
