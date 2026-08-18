import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { ProjectItem } from '../hooks/useProjects'
import { ProjectCard } from './ProjectCard'

interface ProjectGridProps {
  projects: ProjectItem[]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const { t } = useTranslation()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDown, setIsDown] = useState(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    setIsDown(true)
    startX.current = e.pageX - scrollRef.current.offsetLeft
    scrollLeft.current = scrollRef.current.scrollLeft
  }

  const handleMouseLeave = () => {
    setIsDown(false)
  }

  const handleMouseUp = () => {
    setIsDown(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX.current) * 1.5
    scrollRef.current.scrollLeft = scrollLeft.current - walk
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="mb-6 flex justify-center items-center">
        <span className="text-[10px] md:text-xs font-extrabold font-mono uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600 bg-slate-100 dark:bg-slate-800/40 px-4 py-1.5 rounded-full select-none animate-pulse">
          {t('project.drag_indicator')}
        </span>
      </div>

      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`w-full overflow-x-auto overflow-y-hidden flex gap-6 md:gap-8 pb-8 px-4 md:px-8 cursor-grab active:cursor-grabbing select-none scrollbar-hide`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
