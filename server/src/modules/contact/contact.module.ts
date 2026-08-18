import { Module } from '@nestjs/common'
import { ContactResolver } from './contact.resolver'
import { ContactService } from './contact.service'

@Module({
  providers: [ContactResolver, ContactService],
  exports: [ContactService],
})
export class ContactModule {}
