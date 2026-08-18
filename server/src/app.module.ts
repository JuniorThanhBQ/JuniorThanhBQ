import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ThrottlerModule } from '@nestjs/throttler';
import depthLimit from 'graphql-depth-limit';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './modules/contact/contact.module';
import { BlogModule } from './modules/blog/blog.module';
import { ProjectModule } from './modules/project/project.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: process.env.NODE_ENV !== 'production',
      introspection: process.env.NODE_ENV !== 'production',
      validationRules: [depthLimit(5)],
      context: ({ req, res }) => ({ req, res }),
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 5,
    }]),
    ContactModule,
    BlogModule,
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
