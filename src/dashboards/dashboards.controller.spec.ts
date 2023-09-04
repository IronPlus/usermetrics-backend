import { Test, TestingModule } from '@nestjs/testing';
import { Dashboard } from './dashboard.model';
import { DashboardsController } from './dashboards.controller';
import { DashboardsService } from './dashboards.service';
import { PostsService } from '../posts/posts.service';
import { Post } from '../posts/post.model';

const createMockDashboards = (): Dashboard[] => {
  return [
    {
      user_id: 'user_6',
      name: 'Carly Alvarez',
      total_posts: 56,
      median_num_of_chars: 426.5,
      monthly_posts_statistics: [0, 0, 0, 0, 0, 9, 15, 15, 5, 6, 6, 0],
      longest_post: 'stride integration height',
    },
  ];
};

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

const dashboardsServiceMock = {
  getDashboards: jest.fn().mockResolvedValue(createMockDashboards()),
};

const postsServiceMock = {
  POSTS: createMockPosts(),
  getPostsByPageNumber: jest.fn().mockResolvedValue(createMockPosts()),
};

describe('DashboardsController test', () => {
  const expectedDashboards = createMockDashboards();

  let dashboardsController: DashboardsController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [DashboardsController],
      providers: [
        {
          provide: PostsService,
          useValue: postsServiceMock,
        },
        {
          provide: DashboardsService,
          useValue: dashboardsServiceMock,
        },
      ],
    }).compile();

    dashboardsController = moduleRef.get(DashboardsController);
  });

  it('should be defined', () => {
    expect(dashboardsController).toBeDefined();
  });

  it('should return array of dashboards', async () => {
    const dashboards = await dashboardsController.getDashboards();

    expect(dashboards).toStrictEqual(expectedDashboards);
  });
});
