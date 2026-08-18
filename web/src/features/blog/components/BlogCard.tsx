import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { BlogItem } from '../hooks/useBlogs'

interface BlogCardProps {
  blog: BlogItem
}

export function BlogCard({ blog }: BlogCardProps) {
  const { t } = useTranslation()

  return (
    <article className="group relative flex flex-col justify-between w-full h-full pb-6 border-0 border-b border-solid border-slate-100 dark:border-slate-800">
      <Link to={`/blog/${blog.slug}`} className="flex flex-col text-decoration-none text-inherit">
        <div className="overflow-hidden rounded-2xl aspect-[16/10] bg-slate-50 dark:bg-slate-900 border border-solid border-slate-100 dark:border-slate-800">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.03] transition-transform duration-500 ease-out"
          />
        </div>

        <div className="mt-5 flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 font-mono">
            {blog.category}
          </span>
          <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 font-mono">
            {blog.readTime}
          </span>
        </div>

        <h3 className="mt-3 text-lg md:text-xl font-bold text-slate-900 dark:text-white leading-snug font-serif group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {blog.title}
        </h3>

        <p className="mt-3 text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
          {blog.excerpt}
        </p>
      </Link>

      <div className="mt-4 flex items-center gap-1.5 self-start">
        <span className="text-[10px] font-bold font-mono text-slate-800 dark:text-slate-200 uppercase tracking-widest">
          {t('blog.read_more')}
        </span>
        <svg
          className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </article>
  )
}
