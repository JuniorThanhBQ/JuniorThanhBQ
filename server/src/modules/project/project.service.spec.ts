import { Test, TestingModule } from '@nestjs/testing'
import { NotFoundException } from '@nestjs/common'
import { ProjectService } from './project.service'
import * as fs from 'fs/promises'

jest.mock('fs/promises')

describe('ProjectService', () => {
  let service: ProjectService

  const mockProjects = [
    {
      id: '1',
      slug: 'first-project',
      title: 'First Project',
      description: 'Desc 1',
      coverImage: 'img1.png',
      tags: ['React', 'TS'],
      githubUrl: 'git1',
      liveUrl: 'live1',
      featured: true,
      completedAt: '2026-08',
    },
    {
      id: '2',
      slug: 'second-project',
      title: 'Second Project',
      description: 'Desc 2',
      coverImage: 'img2.png',
      tags: ['NestJS'],
      githubUrl: 'git2',
      liveUrl: 'live2',
      featured: false,
      completedAt: '2026-07',
    },
  ]

  beforeEach(async () => {
    jest.clearAllMocks()

    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectService],
    }).compile()

    service = module.get<ProjectService>(ProjectService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should return all projects', async () => {
    (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockProjects))

    const result = await service.findAll()

    expect(result).toHaveLength(2)
    expect(result[0].slug).toBe('first-project')
    expect(result[1].slug).toBe('second-project')
  })

  it('should return a project by slug', async () => {
    (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockProjects))

    const result = await service.findOneBySlug('first-project')

    expect(result.title).toBe('First Project')
  })

  it('should throw NotFoundException if slug matches no projects', async () => {
    (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockProjects))

    await expect(service.findOneBySlug('unknown-slug')).rejects.toThrow(NotFoundException)
  })
})
