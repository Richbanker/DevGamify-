import { useEffect, useState } from 'react'

type Lang = 'en' | 'ru'

export function LanguageSwitch() {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const stored = localStorage.getItem('lang')
      return stored === 'ru' || stored === 'en' ? stored : 'en'
    } catch {
      return 'en'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('lang', lang)
    } catch {
      // Language switching still works when storage is unavailable.
    }
    document.documentElement.lang = lang
  }, [lang])

  return (
    <select
      aria-label="Language"
      value={lang}
      onChange={(e) => setLang(e.target.value as Lang)}
      className="rounded-xl border border-slate-200 bg-transparent px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-800"
    >
      <option value="en">EN</option>
      <option value="ru">RU</option>
    </select>
  )
}
