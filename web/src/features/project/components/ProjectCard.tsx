import { useTranslation } from 'react-i18next'
import type { ProjectItem } from '../hooks/useProjects'

interface ProjectCardProps {
  project: ProjectItem
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useTranslation()

  return (
    <div
      className="group relative overflow-hidden rounded-3xl border border-solid border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/30 flex flex-col justify-between transition-all duration-500 hover:shadow-xl hover:-translate-y-1 w-[290px] sm:w-[350px] md:w-[400px] flex-shrink-0 select-none"
    >
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
          draggable={false}
        />
        <div className="absolute inset-0 bg-slate-950/20 dark:bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6 md:p-8 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] font-bold font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              {project.completedAt}
            </span>
            {project.featured && (
              <span className="text-[9px] font-extrabold font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest border border-solid border-blue-600/30 dark:border-blue-400/30 bg-blue-500/5 px-2 py-0.5 rounded-full">
                Featured
              </span>
            )}
          </div>

          <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight font-serif">
            {project.title}
          </h3>

          <p className="mt-3 text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
            {project.description}
          </p>
        </div>

        <div className="mt-6">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-semibold font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 px-2.5 py-1 rounded-lg"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-800 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 transition-colors duration-300 text-decoration-none font-mono"
            >
              {t('project.code')}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-800 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400 transition-colors duration-300 text-decoration-none font-mono"
              >
                {t('project.live_demo')}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
