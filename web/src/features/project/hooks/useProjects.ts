import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { apiClient } from '../../../configs/apis'

export interface ProjectItem {
  id: string
  slug: string
  title: string
  description: string
  coverImage: string
  tags: string[]
  githubUrl: string
  liveUrl: string
  featured: boolean
  completedAt: string
}

const MOCK_PROJECTS: ProjectItem[] = [
  {
    id: '1',
    slug: 'webgl-neon-fluid-portfolio',
    title: 'WebGL Neon Fluid Portfolio',
    description: 'An interactive, high-performance portfolio featuring WebGL shader-based interactive background vectors, custom timeline paths, and NestJS GraphQL rate-limited SMTP connections.',
    coverImage: 'https://res.cloudinary.com/dfolk8pz2/image/upload/v1785162818/ou-hcmc_giwmtx.png',
    tags: ['React', 'TypeScript', 'Vite', 'WebGL', 'NestJS', 'GraphQL'],
    githubUrl: 'https://github.com/juniorthanh/portfolio',
    liveUrl: 'https://portfolio.example.com',
    featured: true,
    completedAt: '2026-08',
  },
  {
    id: '2',
    slug: 'agentic-retrieval-chatbots',
    title: 'Agentic Retrieval RAG Chatbot',
    description: 'A vector context chatbot built on top of NestJS WebSockets and GraphQL, utilizing the Groq API for hybrid vector indexing and retrieval.',
    coverImage: 'https://res.cloudinary.com/dfolk8pz2/image/upload/v1787048651/google_mail_gmail_logo_icon_159346-removebg-preview_eiwzkp.png',
    tags: ['NestJS', 'GraphQL', 'WebSockets', 'Groq AI', 'RAG'],
    githubUrl: 'https://github.com/juniorthanh/rag-chatbot',
    liveUrl: 'https://chatbot.example.com',
    featured: false,
    completedAt: '2026-07',
  },
  {
    id: '3',
    slug: 'devops-local-automated-sast',
    title: 'DevOps Automated SAST Scanner',
    description: 'A pre-commit and GitHub Action orchestration framework executing Trivy, Gitleaks, and Semgrep security pipelines on codebases.',
    coverImage: 'https://res.cloudinary.com/dfolk8pz2/image/upload/v1785219389/github_logo_icon_229278_zurvhq.webp',
    tags: ['DevOps', 'GitHub Actions', 'Semgrep', 'Trivy', 'Gitleaks'],
    githubUrl: 'https://github.com/juniorthanh/sast-scanner',
    liveUrl: 'https://sast.example.com',
    featured: true,
    completedAt: '2026-06',
  },
]

export function useProjects() {
  const { i18n } = useTranslation()
  const locale = i18n.language === 'vi' ? 'vi' : 'en'

  const [projects, setProjects] = useState<ProjectItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = useCallback(async () => {
    setLoading(true)
    setError(null)
    if (import.meta.env.VITE_USE_MOCK_API === 'true') {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setProjects(MOCK_PROJECTS)
      setLoading(false)
      return
    }

    try {
      const response = await apiClient.post('/graphql', {
        query: `
          query GetProjects($locale: String) {
            projects(locale: $locale) {
              id
              slug
              title
              description
              coverImage
              tags
              githubUrl
              liveUrl
              featured
              completedAt
            }
          }
        `,
        variables: { locale },
      })
      if (response.data?.errors) {
        setError(response.data.errors[0]?.message)
      } else {
        setProjects(response.data?.data?.projects || [])
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch showcase projects')
    } finally {
      setLoading(false)
    }
  }, [locale])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
  }
}
