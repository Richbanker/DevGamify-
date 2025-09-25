import { useUserStore } from '../../features/user/store'
import { Avatar } from '../../shared/ui/Avatar'
import { Input } from '../../shared/ui/Input'
import { Card } from '../../shared/ui/Card'
import { Button } from '../../shared/ui/Button'
import { useAchievementStore } from '../../features/achievements/store'
import { useQuestStore } from '../../features/quests/store'
import { useStatsStore } from '../../features/stats/store'
import { appDataSchema } from '../../shared/lib/serialization'
import { generateDemoQuests } from '../../shared/lib/demo'

export function SettingsPage() {
  const userStore = useUserStore()
  const achStore = useAchievementStore()
  const questStore = useQuestStore()
  const statsStore = useStatsStore()

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Настройки</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <div className="flex items-center gap-3">
            <Avatar seed={userStore.user.avatarSeed} />
            <div className="flex-1">
              <label htmlFor="nickname" className="mb-1 block text-sm">
                Ник
              </label>
              <Input
                id="nickname"
                value={userStore.user.nickname}
                onChange={(e) => userStore.setNickname(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-3">
            <label htmlFor="avatar" className="mb-1 block text-sm">
              Аватар
            </label>
            <Input
              id="avatar"
              value={userStore.user.avatarSeed}
              onChange={(e) => userStore.setAvatarSeed(e.target.value)}
            />
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => {
                const data = {
                  user: userStore.user,
                  quests: questStore.quests,
                  achievements: achStore.achievements,
                  stats: statsStore.stats,
                }
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = 'devgamify.json'
                a.click()
                URL.revokeObjectURL(url)
              }}
            >
              Экспорт JSON
            </Button>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900">
              Импорт JSON
              <input
                type="file"
                accept="application/json"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0]
                  if (!file) return
                  const text = await file.text()
                  const parsed = JSON.parse(text)
                  const data = appDataSchema.parse(parsed)
                  userStore.reset()
                  achStore.reset()
                  statsStore.reset()
                  useQuestStore.setState({ quests: data.quests })
                  useUserStore.setState({ user: data.user })
                  useAchievementStore.setState({ achievements: data.achievements })
                  useStatsStore.setState({ stats: data.stats })
                }}
              />
            </label>
            <Button
              variant="secondary"
              onClick={() => {
                if (!confirm('Сбросить прогресс?')) return
                userStore.reset()
                achStore.reset()
                statsStore.reset()
                useQuestStore.setState({ quests: [] })
              }}
            >
              Сбросить
            </Button>
            <Button
              onClick={() => {
                useQuestStore.setState({ quests: generateDemoQuests() })
                statsStore.recalc()
                achStore.recalc()
              }}
            >
              Demo Data
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
