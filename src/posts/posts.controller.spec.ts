import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { PostsController } from './posts.controller';
import { Test } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { Post } from './post.model';

const moduleMocker = new ModuleMocker(global);

const createMockPosts = (): Post[] => {
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
};

describe('PostsController test', () => {
  const expectedPosts = createMockPosts();

  let postsController: PostsController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PostsController],
    })
      .useMocker((token) => {
        if (token === PostsService) {
          return {
            getPostsByPageNumber: jest.fn().mockResolvedValue(expectedPosts),
          };
        }

        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;

          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    postsController = moduleRef.get(PostsController);
  });

  it('should return 10 posts for a given page number', async () => {
    const posts = await postsController.getPostsByPageNumber(1);

    expect(posts).toBe(expectedPosts);
    expect(posts.length).toBe(expectedPosts.length);
    expect(posts[0].id).toBe(expectedPosts[0].id);
    expect(posts[0].from_name).toBe(expectedPosts[0].from_name);
    expect(posts[0].from_id).toBe(expectedPosts[0].from_id);
    expect(posts[0].message).toBe(expectedPosts[0].message);
    expect(posts[0].type).toBe(expectedPosts[0].type);
    expect(posts[0].created_time).toBe(expectedPosts[0].created_time);
  });
});
