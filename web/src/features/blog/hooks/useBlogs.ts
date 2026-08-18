import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { apiClient } from '../../../configs/apis'

export interface BlogItem {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  category: string
  publishedAt: string
  readTime: string
}

const MOCK_BLOGS: BlogItem[] = [
  {
    id: '1',
    slug: 'persisting-quality-in-agentic-workflows',
    title: 'Persisting Quality in Agentic Workflows',
    excerpt: 'Exploring the paradigm shift towards AI-assisted software building, maintaining system stability, and the balance of speed and deep knowledge.',
    content: "# Persisting Quality in Agentic Workflows\n\nSoftware development is evolving rapidly. With the rise of agentic AI assistants, developers can scaffold entire structures in seconds. However, this raises a new challenge: **how do we maintain software quality in automated loops?**\n\n## The Speed vs. Knowledge Dilemma\n\nAI can write code faster than any human, but it doesn't automatically understand the trade-offs of architecture decisions. If you rely too heavily on AI without possessing strong foundational knowledge, you risk introducing subtle, hard-to-debug architectural flaws.\n\n> \"I want AI to help me pursue my dreams and passions, not to take those dreams away from me.\"\n\n## Best Practices for Agentic Pairs\n\n1. **Maintain Strict CI/CD Gates**: Never let code enter production without passing automated static analysis, security scans, and unit tests.\n2. **Type Safety is King**: Use strongly-typed languages like TypeScript on the frontend and backend to catch reference issues immediately.\n3. **Domain-Driven Modular Monoliths**: By structuring code into clean domain boundaries, you limit the impact of code modifications and keep applications easy to maintain.",
    coverImage: 'https://res.cloudinary.com/dfolk8pz2/image/upload/v1785162818/ou-hcmc_giwmtx.png',
    category: 'Software Engineering',
    publishedAt: '2026-08-18',
    readTime: '4 min read',
  },
  {
    id: '2',
    slug: 'understanding-mbti-in-engineering-teams',
    title: 'Understanding MBTI inside Software Engineering',
    excerpt: 'How personality profiles like INFP shape working habits, focus, and collaboration under productivity frameworks.',
    content: "# Understanding MBTI inside Software Engineering\n\nTeam dynamics play a crucial role in shipping successful products. While technical skills are essential, personality types shape how we handle deadlines, solve issues, and approach learning.\n\n## The INFP Profile in Tech\n\nINFP engineers often bring deep dedication and empathy to the table. They prioritize quality over quick-and-dirty fixes. However, they can sometimes face challenges with time management due to Parkinson's Law—spending too much time refining code blocks.\n\n## Balancing Productivity\n\n- **Establish Boundries**: Keep clean lists of features and definitions.\n- **Aim for Progress over Perfection**: Learn to release features once they are functional and properly tested rather than polishing indefinitely.",
    coverImage: 'https://res.cloudinary.com/dfolk8pz2/image/upload/v1787048698/linkedin-logo-linkedin-symbol-linkedin-icon-free-free-vector-removebg-preview_rjzexl.png',
    category: 'Team Dynamics',
    publishedAt: '2026-08-16',
    readTime: '3 min read',
  },
]

export function useBlogs() {
  const { i18n } = useTranslation()
  const locale = i18n.language === 'vi' ? 'vi' : 'en'

  const [blogs, setBlogs] = useState<BlogItem[]>([])
  const [blog, setBlog] = useState<BlogItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [category, setCategory] = useState<string>('')

  const fetchBlogs = useCallback(async (catFilter?: string) => {
    setLoading(true)
    setError(null)
    if (import.meta.env.VITE_USE_MOCK_API === 'true') {
      await new Promise((resolve) => setTimeout(resolve, 800))
      if (catFilter) {
        setBlogs(MOCK_BLOGS.filter((b) => b.category.toLowerCase() === catFilter.toLowerCase()))
      } else {
        setBlogs(MOCK_BLOGS)
      }
      setLoading(false)
      return
    }

    try {
      const response = await apiClient.post('/graphql', {
        query: `
          query GetBlogs($category: String, $locale: String) {
            blogs(category: $category, locale: $locale) {
              id
              slug
              title
              excerpt
              coverImage
              category
              publishedAt
              readTime
            }
          }
        `,
        variables: { category: catFilter || null, locale },
      })
      if (response.data?.errors) {
        setError(response.data.errors[0]?.message)
      } else {
        setBlogs(response.data?.data?.blogs || [])
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch blogs')
    } finally {
      setLoading(false)
    }
  }, [locale])

  const fetchBlogBySlug = useCallback(async (slug: string) => {
    setLoading(true)
    setError(null)
    if (import.meta.env.VITE_USE_MOCK_API === 'true') {
      await new Promise((resolve) => setTimeout(resolve, 600))
      const match = MOCK_BLOGS.find((b) => b.slug === slug)
      setBlog(match || null)
      setLoading(false)
      return
    }

    try {
      const response = await apiClient.post('/graphql', {
        query: `
          query GetBlog($slug: String!, $locale: String) {
            blog(slug: $slug, locale: $locale) {
              id
              slug
              title
              excerpt
              content
              coverImage
              category
              publishedAt
              readTime
            }
          }
        `,
        variables: { slug, locale },
      })
      if (response.data?.errors) {
        setError(response.data.errors[0]?.message)
      } else {
        setBlog(response.data?.data?.blog || null)
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch article details')
    } finally {
      setLoading(false)
    }
  }, [locale])

  useEffect(() => {
    fetchBlogs(category)
  }, [category, fetchBlogs])

  return {
    blogs,
    blog,
    loading,
    error,
    category,
    setCategory,
    fetchBlogBySlug,
    refetch: () => fetchBlogs(category),
  }
}
