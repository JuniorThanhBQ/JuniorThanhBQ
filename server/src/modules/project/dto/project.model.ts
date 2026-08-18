import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class Project {
  @Field(() => ID)
  id: string

  @Field()
  slug: string

  @Field()
  title: string

  @Field()
  description: string

  @Field()
  coverImage: string

  @Field(() => [String])
  tags: string[]

  @Field()
  githubUrl: string

  @Field()
  liveUrl: string

  @Field()
  featured: boolean

  @Field()
  completedAt: string
}
