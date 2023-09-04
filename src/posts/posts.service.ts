import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  POSTS: Post[];

  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {
    this.postsRepository
      .find()
      .then((posts: Post[]) => {
        this.POSTS = posts;
      })
      .catch((error: any) => {
        console.log(`Error fetching posts: ${error}`);
      });
  }

  /**
   * Returns array of posts belong to a given page number.
   *
   * @param page page number.
   * @returns Array of posts.
   */
  getPostsByPageNumber(pageNumber: number): Promise<Post[]> {
    const pageSize = 10;
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pagePosts = this.POSTS.slice(startIndex, endIndex);

    return new Promise<Post[]>(
      (resolve) =>
        setTimeout(() => {
          resolve(pagePosts);
        }, 400), // Simulate network latency.
    );
  }
}
