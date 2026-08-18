import { Test, TestingModule } from '@nestjs/testing'
import { NotFoundException } from '@nestjs/common'
import { BlogService } from './blog.service'
import * as fs from 'fs/promises'

jest.mock('fs/promises')

describe('BlogService', () => {
  let service: BlogService

  const mockBlogs = [
    {
      id: '1',
      slug: 'first-blog',
      title: 'First Blog',
      excerpt: 'Excerpt 1',
      content: 'Content 1',
      coverImage: 'img1.png',
      category: 'Tech',
      publishedAt: '2026-08-15',
      readTime: '3 min read',
    },
    {
      id: '2',
      slug: 'second-blog',
      title: 'Second Blog',
      excerpt: 'Excerpt 2',
      content: 'Content 2',
      coverImage: 'img2.png',
      category: 'Design',
      publishedAt: '2026-08-16',
      readTime: '2 min read',
    },
  ]

  beforeEach(async () => {
    jest.clearAllMocks()

    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogService],
    }).compile()

    service = module.get<BlogService>(BlogService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should return all blogs when no category filter is specified', async () => {
    (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockBlogs))

    const result = await service.findAll()

    expect(result).toHaveLength(2)
    expect(result[0].slug).toBe('first-blog')
    expect(result[1].slug).toBe('second-blog')
  })

  it('should filter blogs by category', async () => {
    (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockBlogs))

    const result = await service.findAll('Design')

    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('second-blog')
  })

  it('should return a blog by slug', async () => {
    (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockBlogs))

    const result = await service.findOneBySlug('first-blog')

    expect(result.title).toBe('First Blog')
  })

  it('should throw NotFoundException if slug matches no blogs', async () => {
    (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockBlogs))

    await expect(service.findOneBySlug('unknown-slug')).rejects.toThrow(NotFoundException)
  })
})
