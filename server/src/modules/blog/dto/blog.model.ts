import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class Blog {
  @Field(() => ID)
  id: string

  @Field()
  slug: string

  @Field()
  title: string

  @Field()
  excerpt: string

  @Field()
  content: string

  @Field()
  coverImage: string

  @Field()
  category: string

  @Field()
  publishedAt: string

  @Field()
  readTime: string
}
