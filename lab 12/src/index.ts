import { fetchPosts } from './postsApi.js';
import type { Post, PostsState } from './types';

// Отримуємо елементи сторінки
const postsContainer = document.querySelector<HTMLDivElement>('#posts');
const statusElement = document.querySelector<HTMLParagraphElement>('#status');
const reloadButton = document.querySelector<HTMLButtonElement>('#reload-posts');
const filterInput = document.querySelector<HTMLInputElement>('#posts-filter');
const countElement = document.querySelector<HTMLSpanElement>('#posts-count');

let state: PostsState = { status: 'idle' };

function renderPosts(list: Post[]) {
  if (!postsContainer) return;
  postsContainer.innerHTML = '';

  if (list.length === 0) {
    const p = document.createElement('p');
    p.textContent = 'Нічого не знайдено';
    postsContainer.appendChild(p);
    return;
  }

  list.forEach(post => {
    const article = document.createElement('article');
    const title = document.createElement('h3');
    const body = document.createElement('p');

    title.textContent = post.title;
    body.textContent = post.body.slice(0, 120) + '…';

    article.appendChild(title);
    article.appendChild(body);
    postsContainer.appendChild(article);
  });
}

function renderState() {
  if (!statusElement || !postsContainer || !countElement) return;

  statusElement.textContent = '';
  countElement.textContent = '';

  if (state.status === 'idle') {
    statusElement.textContent = 'Натисніть «Оновити пости», щоб завантажити дані.';
  }

  if (state.status === 'loading') {
    statusElement.textContent = 'Завантаження постів…';
  }

  if (state.status === 'error') {
    statusElement.textContent = state.message;
  }

  if (state.status === 'success') {
    const total = state.data.length;
    const shown = state.filtered.length;
    
    // Тут були виправлені лапки
    statusElement.textContent = `Показано ${shown} з ${total} постів`;
    countElement.textContent = String(shown);
    
    renderPosts(state.filtered);
  }

  if (state.status !== 'success') {
    postsContainer.innerHTML = '';
  }
}

async function loadPosts() {
  state = { status: 'loading' };
  renderState();

  // Очищаємо фільтр при новому завантаженні
  if (filterInput) {
    filterInput.value = '';
  }

  try {
    const posts = await fetchPosts(10);
    state = { status: 'success', data: posts, filtered: posts };
  } catch (error) {
    state = {
      status: 'error',
      message: 'Не вдалося завантажити пости. Спробуйте пізніше.',
    };
  }
  renderState();
}

function applyFilter(query: string) {
  if (state.status !== 'success') return;

  const normalized = query.toLowerCase().trim();
  const filtered = state.data.filter(post =>
    post.title.toLowerCase().includes(normalized)
  );

  state = {
    ...state,
    filtered
  };
  renderState();
}

// Слухачі подій
reloadButton?.addEventListener('click', () => {
  void loadPosts();
});

filterInput?.addEventListener('input', event => {
  const target = event.target as HTMLInputElement;
  applyFilter(target.value);
});