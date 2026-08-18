import { Injectable, NotFoundException } from '@nestjs/common'
import * as path from 'path'
import * as fs from 'fs/promises'
import { Project } from './dto/project.model'

@Injectable()
export class ProjectService {
  private cache: Record<string, Project[]> = {}

  private async getProjects(locale: string = 'en'): Promise<Project[]> {
    const filename = `projects_${locale === 'vi' ? 'vi' : 'en'}.json`
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

  async findAll(locale?: string): Promise<Project[]> {
    return this.getProjects(locale)
  }

  async findOneBySlug(slug: string, locale?: string): Promise<Project> {
    const projects = await this.getProjects(locale)
    const project = projects.find((p) => p.slug === slug)
    if (!project) {
      throw new NotFoundException(`Project with slug ${slug} not found`)
    }
    return project
  }
}
