import { InputType, Field } from '@nestjs/graphql'
import { IsEmail, IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator'

@InputType()
export class SendContactEmailInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  subject: string

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(512)
  message: string

  @Field()
  @IsNotEmpty()
  @IsString()
  token: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  honeypot?: string
}
