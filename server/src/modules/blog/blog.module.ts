import { Module } from '@nestjs/common'
import { BlogResolver } from './blog.resolver'
import { BlogService } from './blog.service'

@Module({
  providers: [BlogResolver, BlogService],
  exports: [BlogService],
})
export class BlogModule {}
