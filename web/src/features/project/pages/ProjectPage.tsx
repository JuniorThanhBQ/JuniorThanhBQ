import { useTranslation } from 'react-i18next'
import { useProjects } from '../hooks/useProjects'
import { ProjectGrid } from '../components/ProjectGrid'

export function ProjectPage() {
  const { t } = useTranslation()
  const { projects, loading, error } = useProjects()

  return (
    <div className="min-h-screen bg-transparent py-16 px-4 md:px-8 max-w-6xl mx-auto">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-3 font-serif">
          {t('project.title')}
        </h1>
        <p className="text-sm md:text-base text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono">
          {t('project.subtitle')}
        </p>
      </header>

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <div className="w-8 h-8 rounded-full border-2 border-solid border-slate-200 dark:border-slate-800 border-t-blue-600 dark:border-t-blue-400 animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center py-20 bg-rose-500/5 border border-solid border-rose-500/10 rounded-2xl px-6">
          <p className="text-rose-500 font-mono text-sm font-semibold mb-2">{t('project.error_title')}</p>
          <p className="text-slate-400 dark:text-slate-500 text-xs">{error}</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-24 text-slate-400 dark:text-slate-500 font-mono text-sm">
          {t('project.empty')}
        </div>
      ) : (
        <ProjectGrid projects={projects} />
      )}
    </div>
  )
}
