import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useHeader } from './hooks/useHeader'
import { NavLinks } from './components/NavLinks'
import { HeaderActions } from './components/HeaderActions'
import { Button } from '../../../components/ui/button'

export function Header() {
  const { t, avatarUrl } = useHeader()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="flex flex-col px-4 sm:px-6 lg:px-8 py-4 lg:py-5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm transition-colors duration-500 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50">

    <div className="flex items-center justify-between w-full">

    <div className="h-10 sm:h-12 lg:h-16 w-auto lg:w-[10%] flex justify-start items-center">
      <img
        src={avatarUrl}
        alt="Avatar"
        className="h-10 w-10 sm:h-12 sm:w-12 lg:h-32 lg:w-32 object-contain hover:scale-105 transition-transform duration-300"
      />
    </div>

    <div className="flex-1 lg:w-[30%] lg:flex-none flex justify-start items-center ml-3 sm:ml-4 lg:ml-0">
      <Link
        to="/"
        className="text-base sm:text-lg lg:text-xl font-extrabold text-gray-800 dark:text-white tracking-tight hover:opacity-80 transition-opacity"
      >
        {t('name')}
      </Link>
    </div>

    <div className="hidden lg:w-[35%] lg:flex justify-center items-center">
      <NavLinks />
    </div>

    <div className="hidden lg:w-[20%] lg:flex justify-end items-center">
      <HeaderActions />
    </div>

    <div className="flex lg:hidden items-center">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen
          ? <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          : <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
        }
      </Button>
    </div>

    </div>

    {isMenuOpen && (
      <div className="lg:hidden flex flex-col pt-5 pb-2 border-t border-gray-100 dark:border-gray-800 mt-4 animate-in fade-in slide-in-from-top-4">
        <NavLinks isMobile />
        <HeaderActions isMobile />
      </div>
    )}

  </header>
  )
}
