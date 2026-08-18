import { Resolver, Query, Args } from '@nestjs/graphql'
import { ProjectService } from './project.service'
import { Project } from './dto/project.model'

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private projectService: ProjectService) {}

  @Query(() => [Project])
  async projects(
    @Args('locale', { nullable: true }) locale?: string,
  ): Promise<Project[]> {
    return this.projectService.findAll(locale)
  }

  @Query(() => Project, { nullable: true })
  async project(
    @Args('slug') slug: string,
    @Args('locale', { nullable: true }) locale?: string,
  ): Promise<Project> {
    return this.projectService.findOneBySlug(slug, locale)
  }
}
