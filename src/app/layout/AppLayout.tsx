import { Outlet, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ThemeSwitch } from '../../shared/ui/ThemeSwitch'
import { LanguageSwitch } from '../../shared/ui/LanguageSwitch'
import { t } from '../../shared/lib/i18n'
import { useHotkeys } from '../../shared/hooks/useHotkeys'
import { useQuestStore } from '../../features/quests/store'
import { useUserStore } from '../../features/user/store'
import { CommandPalette } from '../../shared/ui/CommandPalette'

export function AppLayout() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const quest = useQuestStore()
  const user = useUserStore()
  const [cmdOpen, setCmdOpen] = useState(false)
  useHotkeys({
    'mod+j': () => {
      const id = Math.random().toString(36).slice(2)
      quest.add({
        id,
        title: 'Daily quick',
        type: 'daily',
        category: 'general',
        difficulty: 'easy',
        rewardXp: 20,
        status: 'Done',
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
      })
      user.grantXp(20)
    },
    'mod+k': () => setCmdOpen(true),
    escape: () => {
      const active = document.activeElement as HTMLElement | null
      active?.blur()
    },
  })

  return (
    <div className="min-h-full bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <nav className="flex items-center gap-4 text-sm">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'font-semibold' : 'opacity-80 hover:opacity-100 transition'
              }
            >
              {t('dashboard')}
            </NavLink>
            <NavLink
              to="/quests"
              className={({ isActive }) =>
                isActive ? 'font-semibold' : 'opacity-80 hover:opacity-100 transition'
              }
            >
              {t('quests')}
            </NavLink>
            <NavLink
              to="/achievements"
              className={({ isActive }) =>
                isActive ? 'font-semibold' : 'opacity-80 hover:opacity-100 transition'
              }
            >
              {t('achievements')}
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                isActive ? 'font-semibold' : 'opacity-80 hover:opacity-100 transition'
              }
            >
              {t('history')}
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive ? 'font-semibold' : 'opacity-80 hover:opacity-100 transition'
              }
            >
              {t('settings')}
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? 'font-semibold' : 'opacity-80 hover:opacity-100 transition'
              }
            >
              {t('about')}
            </NavLink>
          </nav>
          <div className="flex items-center gap-2">
            {mounted && <LanguageSwitch />}
            {mounted && <ThemeSwitch />}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
      <footer className="border-t border-slate-200 px-4 py-6 text-center text-sm opacity-70 dark:border-slate-800">
        DevGamify
      </footer>
    </div>
  )
}
