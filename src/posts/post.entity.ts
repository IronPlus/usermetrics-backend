import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  from_name: string;

  @Column()
  from_id: string;

  @Column()
  message: string;

  @Column()
  type: string;

  @Column()
  created_time: string;
}
