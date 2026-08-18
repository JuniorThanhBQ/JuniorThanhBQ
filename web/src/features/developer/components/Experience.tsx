import { motion, AnimatePresence } from 'framer-motion'
import { useDeveloper } from '../hooks/useDeveloper'

export function Experience() {
  const { t, filteredSkills, categories, activeCategory, setActiveCategory } = useDeveloper()

  return (
    <section id="experience" className="w-full py-16 md:py-24 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div className="text-center mb-12">
          <span className="text-base font-bold font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase">
            {t('developer.experience_title')}
          </span>
          <h2 className="text-3xl md:text-5xl font-black mt-3 tracking-tight">
            {t('developer.experience_sub')}
          </h2>
          <p className="text-xs md:text-sm font-medium font-mono text-slate-400 dark:text-slate-500 max-w-xl mx-auto mt-4 leading-relaxed uppercase tracking-wider">
            {t('developer.skills_disclaimer')}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold font-mono tracking-wider uppercase transition-all duration-300 border focus:outline-none cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-blue-600 dark:bg-blue-500 text-white border-blue-600 dark:border-blue-500 shadow-md'
                  : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map(skill => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={skill.name}
                className={`flex flex-col items-center justify-center p-6 rounded-2xl border ${skill.color} hover:scale-[1.03] transition-transform duration-300 select-none shadow-sm`}
              >
                <span className="text-sm md:text-base font-extrabold tracking-tight">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  )
}
