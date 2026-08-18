import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { AVATAR_URLS } from '../../../assets/cloudinary_url'
import { useDeveloper } from '../hooks/useDeveloper'
import { FluidShader } from './FluidShader'

export function Summary() {
  const { t } = useTranslation()
  const { summaryCards } = useDeveloper()

  return (
    <section className="w-full py-16 md:py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-500 relative overflow-hidden">
      <FluidShader />
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center z-10 relative">

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="relative group w-36 h-36 md:w-55 md:h-55 rounded-full overflow-hidden border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg">
            <img
              src={AVATAR_URLS.avatar}
              alt={t('name')}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-center max-w-3xl flex flex-col items-center"
        >
          <span className="text-base font-bold font-mono tracking-widest text-blue-600 dark:text-blue-400 mb-3">
            {t('developer.summary_title')}
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-900 dark:text-white">
            {t('developer.summary_subtitle')}
          </h2>
          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-6 leading-relaxed font-normal max-w-3xl">
            {t('developer.summary_bio')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 w-full"
        >
          {summaryCards.map((card, index) => (
            <div
              key={index}
              className="flex flex-col items-start p-6 rounded-[2rem] border border-slate-200/60 dark:border-slate-800 bg-white/48 dark:bg-slate-900/40 backdrop-blur-md hover:scale-[1.02] transition-transform duration-500 text-left shadow-sm hover:shadow-md"
            >
              <span className="text-xs font-bold font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase">
                {card.num}
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mt-3 tracking-tight">
                {card.title}
              </h3>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed font-normal text-justify">
                {card.desc}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
