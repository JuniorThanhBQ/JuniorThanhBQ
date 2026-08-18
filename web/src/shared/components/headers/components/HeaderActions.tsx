import { Moon, Sun } from 'lucide-react'
import { Button } from '../../../../components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../../components/ui/dropdown-menu'
import { useHeader } from '../hooks/useHeader'

type HeaderActionsProps = {
  isMobile?: boolean
}

export function HeaderActions({ isMobile = false }: HeaderActionsProps) {
  const { i18n, changeLanguage, toggleTheme, theme } = useHeader()

  const containerClass = isMobile
    ? "flex flex-col gap-4 items-center w-full mt-4"
    : "hidden md:flex justify-end items-center gap-4 w-full"

  return (
    <div className={containerClass}>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button className={`font-semibold bg-black text-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 ${isMobile ? 'w-full h-10 justify-center' : 'w-30 px-3'}`}>
            {i18n.language === 'vi' ? 'Vietnamese' : 'English'}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={isMobile ? "center" : "end"} className="w-40 rounded-xl p-2 shadow-xl border-gray-100 dark:border-gray-800">
          <DropdownMenuItem onClick={() => changeLanguage('vi')} className="cursor-pointer rounded-lg font-medium py-2 px-3">
            Vietnamese
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeLanguage('en')} className="cursor-pointer rounded-lg font-medium py-2 px-3">
            English
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="ghost"
        onClick={toggleTheme}
        className={`rounded-full border border-gray-200 dark:border-gray-700 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-90 transition-all duration-300 shadow-sm ${isMobile ? 'flex justify-center items-center gap-3 px-4 w-full h-10 text-slate-900 dark:text-white' : 'w-10 h-10 flex justify-center items-center p-0'}`}
      >
        <div className="relative h-5 w-5 flex items-center justify-center shrink-0">
          <Sun className="absolute h-5 w-5 rotate-0 scale-100 transition-transform duration-500 dark:-rotate-90 dark:scale-0 text-amber-500" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform duration-500 dark:rotate-0 dark:scale-100 text-blue-400" />
        </div>
        {isMobile && <span className="font-semibold">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>}
      </Button>
    </div>
  )
}
