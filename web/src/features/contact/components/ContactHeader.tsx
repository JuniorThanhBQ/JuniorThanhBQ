import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

export function ContactHeader() {
  const { t } = useTranslation()

  return (
    <div className="text-center py-16 md:py-20 max-w-3xl mx-auto z-10 relative">
      <motion.span
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-base font-bold font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase"
      >
        {t('contact.title')}
      </motion.span>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl md:text-5xl lg:text-6xl font-black mt-3 tracking-tight leading-tight text-slate-900 dark:text-white"
      >
        {t('contact.subtitle')}
      </motion.h1>
    </div>
  )
}
