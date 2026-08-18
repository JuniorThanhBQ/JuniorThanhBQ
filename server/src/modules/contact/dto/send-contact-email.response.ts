import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class SendContactEmailResponse {
  @Field()
  success: boolean

  @Field()
  message: string
}
