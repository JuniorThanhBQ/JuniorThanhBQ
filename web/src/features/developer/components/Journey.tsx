import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useDeveloper } from '../hooks/useDeveloper'

export function Journey() {
  const { t, milestones } = useDeveloper()
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  })

  const pathLength = useTransform(scrollYProgress, [0, 0.95], [0, 1])

  return (
    <section
      id="journey"
      ref={containerRef}
      className="w-full py-20 md:py-28 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800 transition-colors duration-500 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">

        <div className="text-center mb-20">
          <span className="text-base font-bold font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase">
            {t('developer.journey_title')}
          </span>
          <h2 className="text-3xl md:text-5xl font-black mt-3 tracking-tight">
            {t('developer.journey_sub')}
          </h2>
        </div>

        <div className="relative min-h-[700px] w-full flex items-center justify-center">

          <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
            <svg
              className="absolute left-1/2 -translate-x-1/2 w-[400px] h-full"
              viewBox="0 0 400 800"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M 200 0 C 350 200, 50 200, 200 400 C 350 600, 50 600, 200 800"
                className="stroke-slate-200 dark:stroke-slate-800"
                strokeWidth="4"
              />
              <motion.path
                d="M 200 0 C 350 200, 50 200, 200 400 C 350 600, 50 600, 200 800"
                className="stroke-blue-600 dark:stroke-blue-500"
                strokeWidth="4"
                style={{ pathLength }}
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="block md:hidden absolute inset-0 pointer-events-none z-0">
            <svg
              className="absolute left-4 w-12 h-full"
              viewBox="0 0 100 800"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M 20 0 C 80 200, -40 200, 20 400 C 80 600, -40 600, 20 800"
                className="stroke-slate-200 dark:stroke-slate-800"
                strokeWidth="4"
              />
              <motion.path
                d="M 20 0 C 80 200, -40 200, 20 400 C 80 600, -40 600, 20 800"
                className="stroke-blue-600 dark:stroke-blue-500"
                strokeWidth="4"
                style={{ pathLength }}
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="absolute inset-y-0 hidden md:block w-full pointer-events-none z-10">
            <div className="absolute top-[0%] left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-5 h-5 rounded-full bg-blue-600 dark:bg-blue-500 shadow-[0_0_12px_rgba(37,99,235,0.8)] animate-pulse" />
            </div>
            <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-5 h-5 rounded-full bg-blue-600 dark:bg-blue-500 shadow-[0_0_12px_rgba(37,99,235,0.8)] animate-pulse" />
            </div>
            <div className="absolute top-[100%] left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-5 h-5 rounded-full bg-blue-600 dark:bg-blue-500 shadow-[0_0_12px_rgba(37,99,235,0.8)] animate-pulse" />
            </div>
          </div>

          <div className="absolute inset-y-0 block md:hidden w-full pointer-events-none z-10">
            <div className="absolute top-[0%] left-[21px] -translate-y-1/2">
              <div className="w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-500 shadow-[0_0_12px_rgba(37,99,235,0.8)] animate-pulse" />
            </div>
            <div className="absolute top-[50%] left-[21px] -translate-y-1/2">
              <div className="w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-500 shadow-[0_0_12px_rgba(37,99,235,0.8)] animate-pulse" />
            </div>
            <div className="absolute top-[100%] left-[21px] -translate-y-1/2">
              <div className="w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-500 shadow-[0_0_12px_rgba(37,99,235,0.8)] animate-pulse" />
            </div>
          </div>

          <div className="w-full flex flex-col gap-24 relative z-20">
            {milestones.map((milestone, index) => {
              const isEven = index % 2 === 0

              return (
                <div
                  key={index}
                  className={`w-full flex ${
                    isEven ? 'justify-start' : 'justify-end'
                  } md:items-center pl-12 md:pl-0`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px 0px' }}
                    transition={{ duration: 0.7 }}
                    className="w-full md:w-[42%] flex flex-col p-6 md:p-8 rounded-[2rem] border border-slate-200/60 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md shadow-md"
                  >
                    <span className="text-xs font-bold font-mono text-blue-600 dark:text-blue-400 mb-2">
                      {milestone.year}
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {milestone.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 leading-relaxed font-normal text-justify">
                      {milestone.desc}
                    </p>
                  </motion.div>
                </div>
              )
            })}
          </div>

        </div>

      </div>
    </section>
  )
}
