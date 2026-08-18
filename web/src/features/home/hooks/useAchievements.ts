import { useTranslation } from 'react-i18next'

export function useAchievements() {
  const { t } = useTranslation()

  const stats = [
    { value: 900, suffix: '+', label: t('home.achievements.stat_github') },
    { value: 15, suffix: '+', label: t('home.achievements.stat_repos') },
    { value: 1, suffix: '', label: t('home.achievements.stat_research') },
    { value: 3, suffix: 'rd', label: t('home.achievements.stat_student') }
  ]

  return {
    t,
    stats
  }
}
