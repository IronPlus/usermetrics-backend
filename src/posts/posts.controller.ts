import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Controller('/usermetrics-v1')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   * Returns array of posts for a given page number.
   *
   * @param page page number.
   * @returns Promise of array of posts.
   */
  @Get('/posts/:pageNumber')
  @UseGuards(AuthGuard('basic'))
  getPostsByPageNumber(
    @Param('pageNumber') pageNumber: number,
  ): Promise<Post[]> {
    if (pageNumber < 1 || pageNumber > 10)
      return Promise.reject(new Error('Invalid page number'));

    return this.postsService.getPostsByPageNumber(pageNumber);
  }
}
