import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { GqlThrottlerGuard } from './gql-throttler.guard'
import { ContactService } from './contact.service'
import { SendContactEmailInput } from './dto/send-contact-email.input'
import { SendContactEmailResponse } from './dto/send-contact-email.response'

@Resolver()
export class ContactResolver {
  constructor(private contactService: ContactService) {}

  @Query(() => String)
  helloContact(): string {
    return 'Contact API is running'
  }

  @Mutation(() => SendContactEmailResponse)
  @UseGuards(GqlThrottlerGuard)
  async sendContactEmail(
    @Args('input') input: SendContactEmailInput,
  ): Promise<SendContactEmailResponse> {
    return this.contactService.sendEmail(input)
  }
}
