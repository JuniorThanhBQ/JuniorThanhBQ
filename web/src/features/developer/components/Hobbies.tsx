import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useHobbies } from '../hooks/useHobbies'

export function Hobbies() {
  const containerRef = useRef<HTMLDivElement>(null)

  const {
    t,
    hobbiesItems,
    indicatorOpacities,
    indicatorScales,
    cardYs,
    cardOpacities,
    cardScales,
    desktopParticles,
    mobileParticles,
    scrollToCard
  } = useHobbies(containerRef)

  return (
    <>
      <div ref={containerRef} className="hidden lg:block relative h-[300vh] w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-500 border-t border-slate-200 dark:border-slate-800">
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
                {t('developer.hobbies_title')}
              </h2>
              <div className="mt-6 flex gap-2 z-20">
                {hobbiesItems.map((_, index) => (
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

            <div className="w-full md:w-[55%] relative h-[420px] flex items-center justify-center">
              {hobbiesItems.map((item, index) => (
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
                  {item.type === 'subculture' && (
                    <div className="flex flex-col md:flex-row gap-6 items-center w-full">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md flex-shrink-0">
                        <img src={item.gif} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <span className="text-xs font-bold font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase">
                          01 / 03
                        </span>
                        <h3 className="text-xl md:text-2xl font-extrabold mt-2 text-slate-900 dark:text-white tracking-tight leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed font-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  )}

                  {item.type === 'ai' && (
                    <div className="w-full">
                      <span className="text-xs font-bold font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase">
                        02 / 03
                      </span>
                      <h3 className="text-xl md:text-2xl font-extrabold mt-2 text-slate-900 dark:text-white tracking-tight leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed font-normal">
                        {item.desc}
                      </p>
                      <p className="text-xs md:text-sm font-semibold italic text-blue-600 dark:text-blue-400 font-mono mt-4 border-l-2 border-blue-600 dark:border-blue-500 pl-3 py-1">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    </div>
                  )}

                  {item.type === 'learning' && (
                    <div className="w-full">
                      <div className="flex gap-4 items-center">
                        <span className="text-4xl">{item.icon}</span>
                        <div>
                          <span className="text-xs font-bold font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase">
                            03 / 03
                          </span>
                          <h3 className="text-xl md:text-2xl font-extrabold mt-1 text-slate-900 dark:text-white tracking-tight leading-tight">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  )}
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
            {t('developer.hobbies_title')}
          </h2>
          <div className="flex flex-col gap-6">
            {hobbiesItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-md"
              >
                {item.type === 'subculture' && (
                  <div className="flex flex-col gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex-shrink-0">
                      <img src={item.gif} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-xs font-bold font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase">
                        01 / 03
                      </span>
                      <h3 className="text-xl font-extrabold mt-1 text-slate-900 dark:text-white leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                )}

                {item.type === 'ai' && (
                  <div>
                    <span className="text-xs font-bold font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase">
                      02 / 03
                    </span>
                    <h3 className="text-xl font-extrabold mt-1 text-slate-900 dark:text-white leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                    <p className="text-xs font-semibold italic text-blue-600 dark:text-blue-400 font-mono mt-3 border-l-2 border-blue-600 dark:border-blue-500 pl-2">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>
                )}

                {item.type === 'learning' && (
                  <div>
                    <div className="flex gap-3 items-center">
                      <span className="text-3xl">{item.icon}</span>
                      <div>
                        <span className="text-xs font-bold font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase">
                          03 / 03
                        </span>
                        <h3 className="text-xl font-extrabold mt-0.5 text-slate-900 dark:text-white leading-tight">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
