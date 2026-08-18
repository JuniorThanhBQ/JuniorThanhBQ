import { Resolver, Query, Args } from '@nestjs/graphql'
import { BlogService } from './blog.service'
import { Blog } from './dto/blog.model'

@Resolver(() => Blog)
export class BlogResolver {
  constructor(private blogService: BlogService) {}

  @Query(() => [Blog])
  async blogs(
    @Args('category', { nullable: true }) category?: string,
    @Args('locale', { nullable: true }) locale?: string,
  ): Promise<Blog[]> {
    return this.blogService.findAll(category, locale)
  }

  @Query(() => Blog, { nullable: true })
  async blog(
    @Args('slug') slug: string,
    @Args('locale', { nullable: true }) locale?: string,
  ): Promise<Blog> {
    return this.blogService.findOneBySlug(slug, locale)
  }
}
