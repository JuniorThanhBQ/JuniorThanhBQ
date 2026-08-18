import { useTranslation } from 'react-i18next'
import { useBlogs } from '../hooks/useBlogs'
import { BlogHero } from '../components/BlogHero'
import { BlogGrid } from '../components/BlogGrid'

export function BlogPage() {
  const { t } = useTranslation()
  const { blogs, loading, error, category, setCategory } = useBlogs()

  const categories = ['', 'Software Engineering', 'Team Dynamics']

  const featuredBlog = blogs[0]
  const remainingBlogs = blogs.slice(1)

  return (
    <div className="min-h-screen bg-transparent py-16 px-4 md:px-8 max-w-6xl mx-auto">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-3 font-serif">
          {t('blog.title')}
        </h1>
        <p className="text-sm md:text-base text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono">
          {t('blog.subtitle')}
        </p>
      </header>

      <nav className="flex justify-center items-center gap-6 mb-12 flex-wrap border-0 border-b border-solid border-slate-100 dark:border-slate-800 pb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`text-xs md:text-sm font-bold uppercase tracking-wider bg-transparent border-0 outline-none cursor-pointer pb-2 transition-all relative font-mono ${
              category === cat
                ? 'text-blue-600 dark:text-blue-400 font-extrabold'
                : 'text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400'
            }`}
          >
            {cat || t('blog.all_categories')}
            {category === cat && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 dark:bg-blue-400 rounded-full" />
            )}
          </button>
        ))}
      </nav>

      {loading && blogs.length === 0 ? (
        <div className="flex justify-center items-center py-24">
          <div className="w-8 h-8 rounded-full border-2 border-solid border-slate-200 dark:border-slate-800 border-t-blue-600 dark:border-t-blue-400 animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center py-20 bg-rose-500/5 border border-solid border-rose-500/10 rounded-2xl px-6">
          <p className="text-rose-500 font-mono text-sm font-semibold mb-2">{t('blog.error_title')}</p>
          <p className="text-slate-400 dark:text-slate-500 text-xs">{error}</p>
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-24 text-slate-400 dark:text-slate-500 font-mono text-sm">
          {t('blog.empty')}
        </div>
      ) : (
        <div className="flex flex-col">
          {featuredBlog && !category && <BlogHero blog={featuredBlog} />}
          <BlogGrid blogs={category ? blogs : remainingBlogs} />
        </div>
      )}
    </div>
  )
}
