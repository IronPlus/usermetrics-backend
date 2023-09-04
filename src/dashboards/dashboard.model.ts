export interface Dashboard {
  user_id: string;
  name: string;
  total_posts: number;
  median_num_of_chars: number;
  monthly_posts_statistics: MonthlyPostsStatistics;
  longest_post: string;
}

export type MonthlyPostsStatistics = number[];
