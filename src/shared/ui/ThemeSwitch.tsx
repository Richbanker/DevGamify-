import { useEffect, useState } from 'react'

export function ThemeSwitch() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const isDark = stored
      ? stored === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
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
