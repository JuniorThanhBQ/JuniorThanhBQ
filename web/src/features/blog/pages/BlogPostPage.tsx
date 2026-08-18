import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useBlogs } from '../hooks/useBlogs'

export function BlogPostPage() {
  const { t } = useTranslation()
  const { slug } = useParams<{ slug: string }>()
  const { blog, loading, error, fetchBlogBySlug } = useBlogs()
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    if (slug) {
      fetchBlogBySlug(slug)
    }
  }, [slug, fetchBlogBySlug])

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const parseMarkdown = (md: string) => {
    if (!md) return null

    const parseInlineMarkdown = (text: string) => {
      const parts = text.split(/(\*\*[^*]+\*\*)/g)
      return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={index} className="font-extrabold text-slate-900 dark:text-white">
              {part.slice(2, -2)}
            </strong>
          )
        }
        return part
      })
    }

    return md.split('\n\n').map((block, idx) => {
      const trimmed = block.trim()
      if (trimmed.startsWith('# ')) {
        return (
          <h1 key={idx} className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mt-8 mb-4 font-serif leading-tight">
            {trimmed.replace('# ', '')}
          </h1>
        )
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4 font-serif">
            {trimmed.replace('## ', '')}
          </h2>
        )
      }
      if (trimmed.startsWith('> ')) {
        return (
          <blockquote key={idx} className="border-l-4 border-solid border-blue-600 dark:border-blue-400 pl-4 py-2 my-6 italic text-slate-600 dark:text-slate-300 font-serif text-lg bg-blue-500/5 rounded-r-lg pr-4">
            {parseInlineMarkdown(trimmed.replace('> ', '').replace(/"/g, ''))}
          </blockquote>
        )
      }
      if (trimmed.startsWith('- ')) {
        const listItems = trimmed.split('\n').map((li) => li.replace('- ', ''))
        return (
          <ul key={idx} className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-350 text-sm md:text-base my-4 pl-4 font-semibold">
            {listItems.map((li, i) => (
              <li key={i}>{parseInlineMarkdown(li)}</li>
            ))}
          </ul>
        )
      }
      if (trimmed.startsWith('1. ')) {
        const listItems = trimmed.split('\n').map((li) => li.replace(/^\d+\.\s+/, ''))
        return (
          <ol key={idx} className="list-decimal list-inside space-y-2 text-slate-600 dark:text-slate-350 text-sm md:text-base my-4 pl-4 font-semibold">
            {listItems.map((li, i) => (
              <li key={i}>{parseInlineMarkdown(li)}</li>
            ))}
          </ol>
        )
      }
      return (
        <p key={idx} className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed md:leading-loose mb-6 font-normal">
          {parseInlineMarkdown(trimmed)}
        </p>
      )
    })
  }

  return (
    <div className="min-h-screen bg-transparent py-16 px-4 md:px-8 max-w-3xl mx-auto relative">
      <div
        className="fixed top-0 left-0 h-[3px] bg-blue-600 dark:bg-blue-400 z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="mb-10">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-wider text-slate-400 hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400 transition-colors duration-300 text-decoration-none font-mono"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {t('blog.back')}
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-32">
          <div className="w-8 h-8 rounded-full border-2 border-solid border-slate-200 dark:border-slate-800 border-t-blue-600 dark:border-t-blue-400 animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center py-20 bg-rose-500/5 border border-solid border-rose-500/10 rounded-2xl">
          <p className="text-rose-500 font-mono text-sm font-semibold mb-2">{t('blog.error_title')}</p>
          <p className="text-slate-400 dark:text-slate-500 text-xs">{error}</p>
        </div>
      ) : !blog ? (
        <div className="text-center py-24 text-slate-400 dark:text-slate-500 font-mono text-sm">
          {t('blog.empty')}
        </div>
      ) : (
        <article className="flex flex-col">
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 font-mono bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
                {blog.category}
              </span>
              <span className="text-[10px] md:text-xs font-semibold text-slate-400 dark:text-slate-500 font-mono">
                {blog.readTime}
              </span>
              <span className="text-[10px] md:text-xs font-semibold text-slate-400 dark:text-slate-500 font-mono">
                {blog.publishedAt}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight font-serif tracking-tight">
              {blog.title}
            </h1>
          </header>

          <div className="w-full overflow-hidden rounded-3xl aspect-[16/9] mb-12 bg-slate-100 dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-800">
            <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
          </div>

          <div className="prose dark:prose-invert max-w-none">
            {parseMarkdown(blog.content)}
          </div>
        </article>
      )}
    </div>
  )
}
