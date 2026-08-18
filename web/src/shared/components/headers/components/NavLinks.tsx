import { Link } from 'react-router-dom'
import { useHeader } from '../hooks/useHeader'

type NavLinksProps = {
  isMobile?: boolean
}

export function NavLinks({ isMobile = false }: NavLinksProps) {
  const { t } = useHeader()
  const navLinkClass = "relative text-base font-medium text-gray-700 dark:text-gray-300 transition-colors hover:text-navy-800 dark:hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-navy-800 dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"

  const containerClass = isMobile
    ? "flex flex-col gap-4 items-center w-full"
    : "hidden md:flex justify-center items-center gap-8 w-full"

  return (
    <nav className={containerClass}>
      <Link to="/" className={navLinkClass}>{t('nav.home')}</Link>
      <Link to="/developer" className={navLinkClass}>{t('nav.developer')}</Link>
      <Link to="/project" className={navLinkClass}>{t('nav.project')}</Link>
      <Link to="/blog" className={navLinkClass}>{t('nav.blog')}</Link>
      <Link to="/contact" className={navLinkClass}>{t('nav.contact')}</Link>
    </nav>
  )
}
