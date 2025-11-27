export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type PostsState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: Post[]; filtered: Post[] }
  | { status: 'error'; message: string };