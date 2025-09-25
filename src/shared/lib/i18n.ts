type Dict = Record<string, string>

const en: Dict = {
  dashboard: 'Dashboard',
  quests: 'Quests',
  achievements: 'Achievements',
  history: 'History',
  settings: 'Settings',
  about: 'About',
}

const ru: Dict = {
  dashboard: 'Дашборд',
  quests: 'Квесты',
  achievements: 'Ачивки',
  history: 'История',
  settings: 'Настройки',
  about: 'О проекте',
}

export function t(key: keyof typeof en) {
  const lang = (localStorage.getItem('lang') as 'en' | 'ru') || 'en'
  const dict = lang === 'ru' ? ru : en
  return dict[key]
}
