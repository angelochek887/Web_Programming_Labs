import type { Post } from './types';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export async function fetchPosts(limit: number): Promise<Post[]> {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data: Post[] = await response.json();
    return data.slice(0, limit);
  } catch (error) {
    console.error('Не вдалося завантажити пости:', error);
    throw error;
  }
}