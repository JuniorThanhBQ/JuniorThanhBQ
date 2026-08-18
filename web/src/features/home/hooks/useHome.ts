import { useTranslation } from 'react-i18next'
import { useTheme } from '../../../contexts/theme-provider'
import { AVATAR_URLS } from '../../../assets/cloudinary_url'

export function useHome() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const avatarUrl = theme === 'dark' ? AVATAR_URLS.dark : AVATAR_URLS.light

  return {
    t,
    avatarUrl,
  }
}
