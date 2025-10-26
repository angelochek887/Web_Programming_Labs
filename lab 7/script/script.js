// Дані
const articles = [
  {
    title: "Основи JavaScript",
    author: "Olha Shutylieva",
    date: "2025-10-10",
    category: "JavaScript",
    content: "Коротко про синтаксис, змінні та типи даних. З чого почати роботу з JS.",
    tags: ["JavaScript", "Basics", "ES6"]
  },
  {
    title: "Методи масивів у JavaScript",
    author: "Roman Hrytsenko",
    date: "2025-10-13",
    category: "JavaScript",
    content: "Практика з map, filter, reduce, find, sort на реальних прикладах.",
    tags: ["JavaScript", "Array", "map", "filter", "find"]
  },
  {
    title: "Семантика HTML5",
    author: "Iryna Chorna",
    date: "2025-10-05",
    category: "HTML",
    content: "Навіщо використовувати &lt;header&gt;, &lt;main&gt;, &lt;article&gt; та інші семантичні теги.",
    tags: ["HTML", "Semantic"]
  },
  {
    title: "Гнучкі макети з Flexbox",
    author: "Dmytro Kovalenko",
    date: "2025-10-08",
    category: "CSS",
    content: "Flexbox допомагає будувати адаптивні макети з мінімумом коду.",
    tags: ["CSS", "Flexbox", "Layout"]
  }
];

// Cортування
let state = { category: "Усі", query: "", sort: "new" };
const sorters = {
  new: (a, b) => new Date(b.date) - new Date(a.date),
  old: (a, b) => new Date(a.date) - new Date(b.date),
  title: (a, b) => a.title.localeCompare(b.title, "uk")
};

// Збереження стану
const saveState = () => localStorage.setItem("blogState", JSON.stringify(state));
const loadState = () => {
  try { state = { ...state, ...JSON.parse(localStorage.getItem("blogState") || "{}") }; }
  catch {}
};

// Утиліти
const escapeReg = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const highlight = (text, q) => {
  if (!q) return text;
  const re = new RegExp(escapeReg(q), "gi");
  return text.replace(re, m => `<mark>${m}</mark>`);
};
const debounce = (fn, ms = 300) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };

// Методичні функції
const filterByCategory = (category) =>
  articles.filter(a => a.category.toLowerCase() === category.toLowerCase());

const countArticles = (list) => list.length;

const findByTitle = (q) =>
  articles.find(a => a.title.toLowerCase().includes(q.toLowerCase()));

// Рендер
const renderArticle = ({ title, author, date, category, content, tags }) => `
  <article class="post">
    <h2>${highlight(title, state.query)}</h2>
    <p>${content}</p>
    <p><small>Категорія: ${category} | Автор: ${author} | Дата: ${new Date(date).toLocaleDateString("uk-UA")}</small></p>
    <p>Теги: ${tags.map(tag => `<span class="tag">#${tag}</span>`).join(" ")}</p>
  </article>
`;

const renderAll = (list) => {
  const container = document.getElementById("blog-posts");
  container.innerHTML = list.length ? list.map(renderArticle).join("") : "<p>Нічого не знайдено.</p>";
  document.getElementById("count").textContent = `Кількість публікацій: ${countArticles(list)}`;
};

// Категорії
const getCategories = () => ["Усі", ...new Set(articles.map(a => a.category))];

const renderCategoryButtons = () => {
  const container = document.getElementById("category-buttons");
  container.innerHTML = getCategories()
    .map(cat => `<button data-category="${cat}" aria-pressed="${state.category === cat}">${cat}</button>`)
    .join("");
  container.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      state.category = btn.dataset.category;
      applyAndRender();
      container.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed","false"));
      btn.setAttribute("aria-pressed","true");
    });
  });
};

// Фільтр і сортування 
const applyAndRender = () => {
  let list = [...articles];
  if (state.category !== "Усі") list = list.filter(a => a.category === state.category);
  if (state.query) list = list.filter(a => a.title.toLowerCase().includes(state.query.toLowerCase()));
  list.sort(sorters[state.sort]);
  renderAll(list);
  saveState();
};

// Події
document.getElementById("searchBtn").addEventListener("click", () => {
  state.query = document.getElementById("searchInput").value.trim();
  const found = findByTitle(state.query);
  console.log("find():", found);
  applyAndRender();
});
document.getElementById("searchInput").addEventListener("input", debounce(() => {
  state.query = document.getElementById("searchInput").value.trim();
  applyAndRender();
}, 300));
document.getElementById("sortSel").addEventListener("change", e => {
  state.sort = e.target.value;
  applyAndRender();
});

// Ініціалізація
loadState();
renderCategoryButtons();
console.log("filter('JavaScript'):", filterByCategory("JavaScript"));
console.log("filter('HTML'):", filterByCategory("HTML"));
document.getElementById("sortSel").value = state.sort;
document.getElementById("searchInput").value = state.query;
applyAndRender();
