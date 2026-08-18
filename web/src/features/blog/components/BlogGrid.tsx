import type { BlogItem } from '../hooks/useBlogs'
import { BlogCard } from './BlogCard'

interface BlogGridProps {
  blogs: BlogItem[]
}

export function BlogGrid({ blogs }: BlogGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
      {blogs.map((blog) => (
        <div key={blog.id} className="w-full">
          <BlogCard blog={blog} />
        </div>
      ))}
    </div>
  )
}
