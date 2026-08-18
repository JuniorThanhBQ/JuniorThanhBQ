import { ContactHeader } from '../components/ContactHeader'
import { ContactMap } from '../components/ContactMap'
import { ContactCard } from '../components/ContactCard'

export default function ContactPage() {
  return (
    <div className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col justify-center py-16 md:py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-500 overflow-hidden">
      <ContactMap />
      <div className="relative z-10 w-full flex flex-col items-center">
        <ContactHeader />
        <ContactCard />
      </div>
    </div>
  )
}
