import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useAchievements } from '../hooks/useAchievements'

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (latest) => Math.round(latest))
  const isInView = useInView(ref, { once: true, margin: '-100px 0px' })

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration: 2.0,
        ease: [0.16, 1, 0.3, 1]
      })
      return () => controls.stop()
    }
  }, [isInView, motionValue, value])

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      <span>{suffix}</span>
    </span>
  )
}

export function Achievements() {
  const { t, stats } = useAchievements()

  return (
    <section className="w-full bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 transition-colors duration-500 py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <h2 className="text-xl font-bold font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase text-center mb-16">
          {t('home.achievements.title')}
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/60 hover:border-blue-200/50 dark:hover:border-slate-700/50 hover:shadow-lg dark:hover:shadow-blue-950/10 transition-all duration-500 hover:scale-[1.02]"
            >
              <div className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-none tracking-tight">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-xs md:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-4 max-w-[180px] leading-relaxed uppercase tracking-wider font-mono">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
