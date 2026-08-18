import { Hero } from './components/Hero'
import { Worldview } from './components/Worldview'
import { Achievements } from './components/Achievements'

export function Home() {
  return (
    <div className="w-full flex flex-col relative">
      <Hero />
      <div className="relative z-10 shadow-2xl bg-slate-50 dark:bg-slate-950">
        <Worldview />
      </div>
      <div className="relative z-15">
        <Achievements />
      </div>
    </div>
  )
}
