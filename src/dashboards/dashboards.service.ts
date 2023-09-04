import { Injectable } from '@nestjs/common';
import { Dashboard, MonthlyPostsStatistics } from './dashboard.model';
import { Post } from '../posts/post.model';
import { UserPosts } from './user-posts.model';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class DashboardsService extends PostsService {
  /**
   * Returns array of dashboards containing analytics of user posts.
   *
   * @returns Array of dashboards.
   */
  getDashboards(): Promise<Dashboard[]> {
    const userPostsArray = [];
    const userIds = [];

    this.POSTS.forEach((post: Post) => {
      if (!userIds.includes(post.from_id)) {
        userIds.push(post.from_id);
        userPostsArray.push({
          user_id: post.from_id,
          name: post.from_name,
          posts: [],
        });
      }

      userPostsArray.forEach((userPosts) => {
        if (userPosts.user_id === post.from_id) {
          userPosts.posts.push(post);
        }
      });
    });

    return new Promise<Dashboard[]>(
      (resolve) =>
        setTimeout(() => {
          resolve(this.createDashboards(userPostsArray));
        }, 400), // Simulate network latency.
    );
  }

  /**
   * Returns array of dashboards for a given array of userPosts.
   *
   * @param userPostsArray Array of userPosts object.
   * @returns Array of dashboards.
   */
  createDashboards(userPostsArray: UserPosts[]): Dashboard[] {
    const dashboards = [];

    userPostsArray.forEach((userPosts) => {
      dashboards.push({
        user_id: userPosts.user_id,
        name: userPosts.name,
        total_posts: userPosts.posts.length,
        median_num_of_chars: this.findMedian(userPosts),
        monthly_posts_statistics: this.createMonthlyPostsStatistics(userPosts),
        longest_post: this.findLongestPost(userPosts),
      });
    });

    return dashboards;
  }

  /**
   * Returns median number of charactes for a given user posts.
   *
   * @param userPosts userPosts object.
   * @returns median.
   */
  findMedian(userPosts: UserPosts): number {
    let lengths = [];

    userPosts.posts.forEach((post) => {
      lengths.push(post.message.trim().length);
    });

    lengths = lengths.sort((a, b) => a - b);

    const mid = Math.floor(lengths.length / 2);

    return lengths.length % 2 === 0
      ? (lengths[mid - 1] + lengths[mid]) / 2
      : lengths[mid];
  }

  /**
   * Returns number of posts each person made each month for a given userPosts object.
   *
   * @param userPosts userPosts object.
   * @returns number of posts each person made every month.
   */
  createMonthlyPostsStatistics(userPosts: UserPosts): MonthlyPostsStatistics {
    const statistics = new Array(12).fill(0);

    userPosts.posts.forEach(
      ({ created_time }) =>
        (statistics[new Date(created_time).getMonth()] += 1),
    );

    return statistics;
  }

  /**
   * Returns the longest post from a userPosts object.
   *
   * @param userPosts userPosts object.
   * @returns the longest post.
   */
  findLongestPost(userPosts: UserPosts): string {
    const lengths = [];

    userPosts.posts.forEach((post) => {
      lengths.push(post.message.length);
    });

    const longest = Math.max(...lengths);
    const index = lengths.findIndex((length) => length === longest);

    return userPosts.posts[index].message;
  }
}
