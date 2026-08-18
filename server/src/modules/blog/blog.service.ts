import { Injectable, NotFoundException } from '@nestjs/common'
import * as path from 'path'
import * as fs from 'fs/promises'
import { Blog } from './dto/blog.model'

@Injectable()
export class BlogService {
  private cache: Record<string, Blog[]> = {}

  private async getBlogs(locale: string = 'en'): Promise<Blog[]> {
    const filename = `blogs_${locale === 'vi' ? 'vi' : 'en'}.json`
    if (this.cache[filename]) {
      return this.cache[filename]
    }
    const paths = [
      path.join(process.cwd(), 'src', 'data', filename),
      path.join(process.cwd(), 'data', filename),
      path.join(__dirname, '..', '..', 'data', filename),
      path.join(__dirname, '..', '..', 'src', 'data', filename),
    ]
    for (const p of paths) {
      try {
        const raw = await fs.readFile(p, 'utf-8')
        const parsed = JSON.parse(raw)
        this.cache[filename] = parsed
        return parsed
      } catch (err) {
        continue
      }
    }
    return []
  }

  async findAll(category?: string, locale?: string): Promise<Blog[]> {
    const blogs = await this.getBlogs(locale)
    if (category) {
      return blogs.filter((b) => b.category.toLowerCase() === category.toLowerCase())
    }
    return blogs
  }

  async findOneBySlug(slug: string, locale?: string): Promise<Blog> {
    const blogs = await this.getBlogs(locale)
    const blog = blogs.find((b) => b.slug === slug)
    if (!blog) {
      throw new NotFoundException(`Blog with slug ${slug} not found`)
    }
    return blog
  }
}
