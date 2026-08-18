import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { BlogItem } from '../hooks/useBlogs'

interface BlogHeroProps {
  blog: BlogItem
}

export function BlogHero({ blog }: BlogHeroProps) {
  const { t } = useTranslation()

  return (
    <div className="group relative w-full mb-16 pb-12 border-0 border-b border-solid border-slate-200 dark:border-slate-800">
      <Link to={`/blog/${blog.slug}`} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center text-decoration-none text-inherit">
        <div className="lg:col-span-7 overflow-hidden rounded-2xl aspect-[16/10] bg-slate-100 dark:bg-slate-900 border border-solid border-slate-100 dark:border-slate-800">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>

        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 font-mono bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
              {blog.category}
            </span>
            <span className="text-[10px] md:text-xs font-semibold text-slate-400 dark:text-slate-500 font-mono">
              {blog.readTime}
            </span>
          </div>

          <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight font-serif tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {blog.title}
          </h2>

          <p className="mt-4 text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed font-normal text-justify">
            {blog.excerpt}
          </p>

          <div className="mt-6 flex items-center gap-2">
            <span className="text-xs font-bold font-mono text-slate-900 dark:text-white uppercase tracking-wider group-hover:translate-x-1 transition-transform duration-300">
              {t('blog.read_article')}
            </span>
            <svg
              className="w-4 h-4 text-blue-600 dark:text-blue-400 transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  )
}
