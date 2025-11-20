interface Post {
  id: number
  title: string
  body: string
  createdAt: Date
}

// Отримання DOM-елементів з конкретними типами
const postForm = document.getElementById('postForm') as HTMLFormElement
const titleInput = document.getElementById('title') as HTMLInputElement
const bodyInput = document.getElementById('body') as HTMLTextAreaElement
const addBtn = document.getElementById('addPost') as HTMLButtonElement
const clearBtn = document.getElementById('clearPosts') as HTMLButtonElement
const postsContainer = document.getElementById('posts') as HTMLDivElement
const counterElem = document.getElementById('counter') as HTMLParagraphElement

// Рендер одного поста
function renderPost(post: Post): HTMLElement {
  const postDiv = document.createElement('div')
  postDiv.className = 'post'

  const titleElem = document.createElement('h3')
  titleElem.textContent = post.title
  postDiv.appendChild(titleElem)

  const bodyElem = document.createElement('p')
  bodyElem.textContent = post.body
  postDiv.appendChild(bodyElem)

  const dateElem = document.createElement('small')
  dateElem.textContent = post.createdAt.toLocaleString()
  postDiv.appendChild(dateElem)

  return postDiv
}

// Очищення всіх постів
function clearPosts(): void {
  postsContainer.innerHTML = ''
  updateCounter()
}

// Оновлення лічильника
function updateCounter(): void {
  const count = postsContainer.children.length
  counterElem.textContent = `Усього постів: ${count}`
}

// Обробник додавання поста
addBtn.addEventListener('click', (event: MouseEvent) => {
  event.preventDefault()

  const title = titleInput.value.trim()
  const body = bodyInput.value.trim()

  if (!title || !body) {
    return
  }

  const newPost: Post = {
    id: Date.now(),
    title,
    body,
    createdAt: new Date()
  }

  const postElem = renderPost(newPost)
  postsContainer.appendChild(postElem)

  postForm.reset()
  updateCounter()
})

// Обробник очищення постів
clearBtn.addEventListener('click', (event: MouseEvent) => {
  event.preventDefault()
  clearPosts()
})

// Початкове оновлення лічильника
updateCounter()
