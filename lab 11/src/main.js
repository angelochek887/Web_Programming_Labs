"use strict";
// Отримання DOM-елементів з конкретними типами
const postForm = document.getElementById('postForm');
const titleInput = document.getElementById('title');
const bodyInput = document.getElementById('body');
const addBtn = document.getElementById('addPost');
const clearBtn = document.getElementById('clearPosts');
const postsContainer = document.getElementById('posts');
const counterElem = document.getElementById('counter');
// Рендер одного поста
function renderPost(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    const titleElem = document.createElement('h3');
    titleElem.textContent = post.title;
    postDiv.appendChild(titleElem);
    const bodyElem = document.createElement('p');
    bodyElem.textContent = post.body;
    postDiv.appendChild(bodyElem);
    const dateElem = document.createElement('small');
    dateElem.textContent = post.createdAt.toLocaleString();
    postDiv.appendChild(dateElem);
    return postDiv;
}
// Очищення всіх постів
function clearPosts() {
    postsContainer.innerHTML = '';
    updateCounter();
}
// Оновлення лічильника
function updateCounter() {
    const count = postsContainer.children.length;
    counterElem.textContent = `Усього постів: ${count}`;
}
// Обробник додавання поста
addBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();
    if (!title || !body) {
        return;
    }
    const newPost = {
        id: Date.now(),
        title,
        body,
        createdAt: new Date()
    };
    const postElem = renderPost(newPost);
    postsContainer.appendChild(postElem);
    postForm.reset();
    updateCounter();
});
// Обробник очищення постів
clearBtn.addEventListener('click', (event) => {
    event.preventDefault();
    clearPosts();
});
// Початкове оновлення лічильника
updateCounter();
