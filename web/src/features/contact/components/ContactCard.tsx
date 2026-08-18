import { useContact } from '../hooks/useContact'
import { motion, AnimatePresence } from 'framer-motion'
import { AVATAR_URLS } from '../../../assets/cloudinary_url'

export function ContactCard() {
  const {
    t,
    name,
    setName,
    email,
    setEmail,
    subject,
    setSubject,
    message,
    setMessage,
    isSending,
    isSuccess,
    errors,
    handleSubmit,
    resetForm
  } = useContact()

  return (
    <div className="relative max-w-6xl mx-auto z-10 w-full px-4 sm:px-6">
      <div className="w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-2xl rounded-[2.5rem] overflow-hidden min-h-[500px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="contact-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 p-8 md:p-12 text-left"
            >

              <div className="lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800/80 pb-8 lg:pb-0 lg:pr-12">
                <div>
                  <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {t('contact.info_heading')}
                  </h3>
                  <div className="mt-8 flex flex-col gap-6">

                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center flex-shrink-0">
                        <img src={AVATAR_URLS.ouhcmc} alt="OU HCMC" className="w-5 h-5 object-contain" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                          {t('contact.label_location')}
                        </h4>
                        <p className="text-sm font-semibold text-slate-850 dark:text-slate-200 mt-1">
                          97 Võ Văn Tần, Quận 3, Hồ Chí Minh
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center flex-shrink-0">
                        <img src={AVATAR_URLS.gmail} alt="Gmail" className="w-5 h-5 object-contain" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                          {t('contact.label_email')}
                        </h4>
                        <a
                          href="mailto:thanh.vantrung2005@gmail.com"
                          className="text-sm font-semibold text-slate-850 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mt-1 block"
                        >
                          thanh.vantrung2005@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center flex-shrink-0">
                        <img src={AVATAR_URLS.github} alt="GitHub" className="w-5 h-5 object-contain" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                          {t('contact.label_github')}
                        </h4>
                        <a
                          href="https://github.com/JuniorThanhBQ"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-slate-850 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mt-1 block"
                        >
                          JuniorThanhBQ
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center flex-shrink-0">
                        <img src={AVATAR_URLS.linkedin} alt="LinkedIn" className="w-5 h-5 object-contain" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                          {t('contact.label_linkedin')}
                        </h4>
                        <a
                          href="https://linkedin.com/in/juniorthanhbq"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-slate-850 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mt-1 block"
                        >
                          juniorthanhbq
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {t('contact.form_heading')}
                </h3>
                <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
                  <div className="flex flex-col">
                    <label className="text-xs font-bold font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                      {t('contact.field_name')}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      maxLength={100}
                      className="w-full px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-500 text-slate-800 dark:text-slate-200 transition-all font-semibold"
                    />
                    {errors.name && (
                      <span className="text-xs font-semibold text-rose-500 mt-1 font-mono">{errors.name}</span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xs font-bold font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                      {t('contact.field_email')}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-500 text-slate-800 dark:text-slate-200 transition-all font-semibold"
                    />
                    {errors.email && (
                      <span className="text-xs font-semibold text-rose-500 mt-1 font-mono">{errors.email}</span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xs font-bold font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                      {t('contact.field_subject')}
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      maxLength={255}
                      className="w-full px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-500 text-slate-800 dark:text-slate-200 transition-all font-semibold"
                    />
                    {errors.subject && (
                      <span className="text-xs font-semibold text-rose-500 mt-1 font-mono">{errors.subject}</span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xs font-bold font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                      {t('contact.field_message')}
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      maxLength={512}
                      className="w-full px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-500 text-slate-800 dark:text-slate-200 transition-all font-semibold resize-none"
                    />
                    {errors.message && (
                      <span className="text-xs font-semibold text-rose-500 mt-1 font-mono">{errors.message}</span>
                    )}
                  </div>

                  {errors.message && (
                    <div className="text-xs font-semibold text-rose-500 font-mono mb-2 bg-rose-500/10 border border-rose-500/20 px-4 py-2.5 rounded-xl">
                      {errors.message}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSending}
                    className="inline-flex items-center justify-center w-full px-8 py-3.5 mt-2 rounded-full bg-blue-600 dark:bg-blue-500 text-white text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-300 active:scale-[0.98] shadow-md hover:shadow-lg disabled:opacity-55 disabled:scale-100 cursor-pointer border-none outline-none focus:outline-none"
                  >
                    {isSending ? t('contact.btn_sending') : t('contact.btn_submit')}
                  </button>
                </form>
              </div>

            </motion.div>
          ) : (
            <motion.div
              key="contact-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center p-8 md:p-12 text-center max-w-md mx-auto"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-3xl mb-6 animate-bounce">
                ✓
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                {t('contact.success_title')}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 leading-relaxed font-normal">
                {t('contact.success_desc')}
              </p>
              <button
                onClick={resetForm}
                className="px-6 py-2.5 mt-8 rounded-full border border-slate-300 dark:border-slate-700 text-xs font-bold font-mono tracking-wider uppercase hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none cursor-pointer"
              >
                Go Back
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
