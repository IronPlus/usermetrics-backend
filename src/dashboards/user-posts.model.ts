import { Post } from '../posts/post.model';

export interface UserPosts {
  user_id: string;
  name: string;
  posts: Post[];
}
