import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts/post.entity';
import { PostsModule } from './posts/posts.module';
import { PostsService } from './posts/posts.service';
import { DashboardsService } from './dashboards/dashboards.service';
import { DashboardsController } from './dashboards/dashboards.controller';
import { PostsController } from './posts/posts.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'usermetrics.db',
      entities: [Post],
      synchronize: true,
    }),
    PostsModule,
  ],
  controllers: [PostsController, DashboardsController],
  providers: [PostsService, DashboardsService],
})
export class AppModule {}
