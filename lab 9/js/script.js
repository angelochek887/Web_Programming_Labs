document.addEventListener('DOMContentLoaded', () => {
    // Список, куди будемо додавати користувачів
    const userList = document.getElementById('userList');
    // Елемент, де будемо показувати статуси (Завантаження/Помилка)
    const statusMessage = document.getElementById('statusMessage');

    // 'async' означає, що ця функція може "чекати" (await)
    async function loadUsers() {
        // 'try' - пробуємо виконати код
        // 'catch' - ловимо будь-які помилки, що сталися у 'try'
        try {
            // 4. Показуємо статус "Завантаження..."
            statusMessage.textContent = 'Завантаження...';
            statusMessage.className = 'loading';
            // 5. Виконуємо запит (fetch)
            // 'await' змушує JS "почекати", поки fetch не завершиться
            // Ми запитуємо наш локальний файл data.json
            const response = await fetch('data.json');
            // 6. Перевіряємо відповідь
            if (!response.ok) {
                // Якщо сервер відповів помилкою, то ми власну помилку "кидаємо"
                throw new Error(`Помилка HTTP: ${response.status}`);
            }

            // 7. Парсимо JSON
            // 'await response.json()' асинхронно читає тіло відповіді
            const users = await response.json();
            
            // 8. Очищуємо повідомлення про статус
            statusMessage.textContent = ''; 
            statusMessage.className = '';

            // 9. Відображаємо дані на сторінці
            renderUsers(users);

        } catch (error) {
            // 10. ОБРОБКА ПОМИЛОК
            // Цей блок виконається, якщо:
            // 1. Немає інтернет-з'єднання
            // 2. Ми кинули помилку 'throw new Error'
            // 3. Файл 'data.json' містить невалідний JSON
            console.error('Помилка під час завантаження даних:', error);
            
            // Показуємо користувачу дружнє повідомлення
            statusMessage.textContent = 'Помилка завантаження даних. Спробуйте пізніше.';
            statusMessage.className = 'error'; 
        }
    }

    // Ця функція приймає масив користувачів і "малює" їх у DOM
    function renderUsers(users) {
        // Очищуємо список (якщо там щось було)
        userList.innerHTML = '';
        
        // Проходимо по кожному користувачу в масиві
        users.forEach(user => {
            // Створюємо новий елемент списку <li>
            const li = document.createElement('li');
        
            li.textContent = `${user.name} (${user.email})`;
            
            // Додаємо <li> до нашого <ul>
            userList.appendChild(li);
        });
    }

    loadUsers();

});