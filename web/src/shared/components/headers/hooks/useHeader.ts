import { useTranslation } from 'react-i18next'
import { useTheme } from '../../../../contexts/theme-provider'
import { useLoading } from '../../../../contexts/loading-provider'
import { AVATAR_URLS } from '../../../../assets/cloudinary_url'

export function useHeader() {
  const { t, i18n } = useTranslation()
  const { theme, setTheme } = useTheme()
  const { startLoading, stopLoading } = useLoading()

  const changeLanguage = (lang: string) => {
    startLoading(lang === 'vi' ? 'Đang chuyển đổi sang Tiếng Việt' : 'Switching to English')
    setTimeout(() => {
      i18n.changeLanguage(lang)
      stopLoading()
    }, 600)
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const avatarUrl = theme === 'dark' ? AVATAR_URLS.dark : AVATAR_URLS.light

  return {
    t,
    i18n,
    theme,
    toggleTheme,
    changeLanguage,
    avatarUrl,
  }
}
