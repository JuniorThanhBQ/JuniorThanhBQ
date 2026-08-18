import { Link } from 'react-router-dom'
import { useFooter } from './hooks/useFooter'

export function Footer() {
  const { t, sections } = useFooter()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-slate-50 text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800 transition-colors duration-500 py-16 md:py-24 footer-mesh-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col">

        <div className="text-center max-w-4xl mx-auto mb-10">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-8">
            {t('footer.statement')}
          </h2>

          <a
            href="https://www.linkedin.com/in/juniorthanh09/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-slate-950 dark:border-white hover:bg-slate-950 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-300 active:scale-[0.98] shadow-md hover:shadow-lg focus:outline-none"
          >
            {t('footer.get_in_touch')}
          </a>
        </div>

        <div className="w-full border-t border-slate-200 dark:border-slate-800/80 my-16" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-left">
          {sections.map((section, sIndex) => (
            <div key={sIndex} className="flex flex-col">
              <h3 className="text-xs font-bold font-mono tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-5">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {section.links.map((link, lIndex) => {
                  const isMail = link.href.startsWith('mailto:')
                  const isAnchor = link.href.includes('#')

                  if (link.isExternal || isMail) {
                    return (
                      <li key={lIndex}>
                        <a
                          href={link.href}
                          target={link.isExternal ? "_blank" : undefined}
                          rel={link.isExternal ? "noopener noreferrer" : undefined}
                          className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                        >
                          {link.label}
                        </a>
                      </li>
                    )
                  }

                  if (isAnchor) {
                    return (
                      <li key={lIndex}>
                        <a
                          href={link.href}
                          className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                        >
                          {link.label}
                        </a>
                      </li>
                    )
                  }

                  return (
                    <li key={lIndex}>
                      <Link
                        to={link.href}
                        className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-200/50 dark:border-slate-800/40 text-center sm:text-left">
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 font-mono tracking-wide uppercase">
            © {currentYear} {t('name')} (v1.0.0). {t('footer.updated_date')}
          </span>
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 font-mono tracking-wide uppercase">
            Mage & NestJS & React with Vite
          </span>
        </div>

      </div>
    </footer>
  )
}
