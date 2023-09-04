import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from './post.entity';

const expectedPosts = ((): Post[] => {
  const posts: Post[] = [];

  for (let i = 0; i < 10; i++) {
    posts.push({
      id: 'post6384fe645aa21_2cbbe066',
      from_name: 'Regenia Boice',
      from_id: 'user_5',
      message: 'sit amet diam in magna bibendum',
      type: 'status',
      created_time: '2023-08-22T15:00:03+00:00',
    });
  }

  return posts;
})();

class MockPostRepository {
  find() {
    return Promise.resolve(expectedPosts);
  }
}

describe('PostsService test', () => {
  let postsService: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useClass: MockPostRepository,
        },
      ],
    }).compile();

    postsService = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(postsService).toBeDefined();
  });

  it('should return an array of posts belong to a given page number', async () => {
    const posts = await postsService.getPostsByPageNumber(1);

    expect(posts).toEqual(expectedPosts);
  });
});
