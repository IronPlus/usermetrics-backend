import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DashboardsService } from './dashboards.service';
import { PostsService } from '../posts/posts.service';
import { Post } from '../posts/post.model';
import * as PostEntity from '../posts/post.entity';

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

const expectedDashboards = [
  {
    user_id: 'user_5',
    name: 'Regenia Boice',
    total_posts: 10,
    median_num_of_chars: 31,
    monthly_posts_statistics: [0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0],
    longest_post: 'sit amet diam in magna bibendum',
  },
];

class MockPostsService extends PostsService {
  POSTS = expectedPosts;

  getPostsByPageNumber(pageNumber: number): Promise<Post[]> {
    const pageSize = 10;
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pagePosts = this.POSTS.slice(startIndex, endIndex);

    return Promise.resolve(pagePosts);
  }
}

class MockPostRepository {
  find() {
    return Promise.resolve(expectedPosts);
  }
}

describe('DashboardsService test', () => {
  let dashboardsService: DashboardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardsService,
        {
          provide: PostsService,
          useClass: MockPostsService,
        },
        {
          provide: getRepositoryToken(PostEntity.Post),
          useClass: MockPostRepository,
        },
      ],
    }).compile();

    dashboardsService = module.get<DashboardsService>(DashboardsService);
  });

  it('should be defined', () => {
    expect(dashboardsService).toBeDefined();
  });

  it('array of dashboards containing analytics of user posts', async () => {
    const dashboards = await dashboardsService.getDashboards();

    expect(dashboards).toStrictEqual(expectedDashboards);
  });

  it('should create dashboards based on userPosts', () => {
    const userPostsArray = [
      {
        user_id: 'user_5',
        name: 'Regenia Boice',
        posts: expectedPosts,
      },
    ];

    const dashboards = dashboardsService.createDashboards(userPostsArray);

    expect(dashboards).toStrictEqual(expectedDashboards);
  });

  it('should calculate the median', () => {
    const userPosts = {
      user_id: 'user_5',
      name: 'Regenia Boice',
      posts: expectedPosts,
    };

    const median = dashboardsService.findMedian(userPosts);

    expect(median).toBe(31);
  });

  it('should create monthly post statistics', () => {
    const userPosts = {
      user_id: 'user_5',
      name: 'Regenia Boice',
      posts: expectedPosts,
    };

    const monthlyPostsStatistics =
      dashboardsService.createMonthlyPostsStatistics(userPosts);

    expect(monthlyPostsStatistics).toStrictEqual([
      0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0,
    ]);
  });

  it('should find the longest post', () => {
    const userPosts = {
      user_id: 'user_5',
      name: 'Regenia Boice',
      posts: expectedPosts,
    };

    userPosts.posts[0].message = 'longest - sit amet diam in magna bibendum';

    const longestPost = dashboardsService.findLongestPost(userPosts);

    expect(longestPost).toBe('longest - sit amet diam in magna bibendum');
  });
});
