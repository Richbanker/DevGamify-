import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppLayout } from './layout/AppLayout'
import { DashboardPage } from '../pages/dashboard/DashboardPage'
import { QuestsPage } from '../pages/quests/QuestsPage'
import { AchievementsPage } from '../pages/achievements/AchievementsPage'
import { HistoryPage } from '../pages/history/HistoryPage'
import { SettingsPage } from '../pages/settings/SettingsPage'
import { AboutPage } from '../pages/about/AboutPage'

export function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/quests" element={<QuestsPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
