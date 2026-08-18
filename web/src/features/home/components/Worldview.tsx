import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useWorldview } from '../hooks/useWorldview'

export function Worldview() {
  const containerRef = useRef<HTMLDivElement>(null)

  const {
    worldviewItems,
    titleText,
    indicatorOpacities,
    indicatorScales,
    cardYs,
    cardOpacities,
    cardScales,
    desktopParticles,
    mobileParticles,
    scrollToCard
  } = useWorldview(containerRef)

  return (
    <>
      <div ref={containerRef} className="hidden lg:block relative h-[450vh] w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-500 border-t border-slate-200 dark:border-slate-800">
        <div className="sticky top-20 h-[calc(100vh-5rem)] w-full flex items-center overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {desktopParticles.map((p, i) => (
              <div
                key={i}
                className={`particle ${p.size} bg-blue-500/40 dark:bg-blue-800/30`}
                style={{
                  left: p.left,
                  right: p.right,
                  top: p.top,
                  animationDelay: p.delay,
                  animationDuration: p.duration
                }}
              />
            ))}
          </div>
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex gap-8 md:gap-16 z-10 relative">

            <div className="w-full md:w-[45%] flex flex-col justify-center items-start select-none">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none text-slate-900 dark:text-white">
                {titleText}
              </h2>
              <div className="mt-6 flex gap-2 z-20">
                {worldviewItems.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => scrollToCard(index)}
                    style={{
                      opacity: indicatorOpacities[index],
                      scale: indicatorScales[index]
                    }}
                    className="cursor-pointer h-2 w-12 rounded-full bg-blue-600 dark:bg-blue-500 border-none outline-none focus:outline-none"
                  />
                ))}
              </div>
            </div>

            <div className="w-full md:w-[55%] relative h-[400px] flex items-center justify-center">
              {worldviewItems.map((item, index) => (
                <motion.div
                  key={index}
                  style={{
                    y: cardYs[index],
                    opacity: cardOpacities[index],
                    scale: cardScales[index],
                    pointerEvents: 'none'
                  }}
                  className="absolute inset-0 flex flex-col justify-center p-8 md:p-12 rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-xl dark:shadow-2xl"
                >
                  <span className="text-xs font-bold font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase">
                    0{index + 1} / 05
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold mt-3 tracking-tight text-slate-900 dark:text-white leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-base text-slate-600 dark:text-slate-300 mt-4 leading-relaxed font-normal text-justify">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="block lg:hidden w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white py-16 px-6 border-t border-slate-200 dark:border-slate-800 transition-colors duration-500 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {mobileParticles.map((p, i) => (
            <div
              key={i}
              className={`particle ${p.size} bg-blue-500/40 dark:bg-blue-800/30`}
              style={{
                left: p.left,
                right: p.right,
                top: p.top,
                animationDelay: p.delay,
                animationDuration: p.duration
              }}
            />
          ))}
        </div>
        <div className="flex flex-col gap-8 z-10 relative">
          <h2 className="text-3xl font-black tracking-tight leading-tight text-slate-900 dark:text-white">
            {titleText}
          </h2>
          <div className="flex flex-col gap-6">
            {worldviewItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-md"
              >
                <span className="text-xs font-bold font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase">
                  0{index + 1} / 05
                </span>
                <h3 className="text-xl font-extrabold mt-2 text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
