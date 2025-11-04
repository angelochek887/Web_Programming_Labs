document.addEventListener('DOMContentLoaded', () => {

    // Знаходимо елементи на сторінці за їх "id"
    const form = document.getElementById('registrationForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    
    // Елементи для виводу помилок
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    
    // Блок привітання та його елементи
    const welcomeScreen = document.getElementById('welcomeScreen');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const logoutButton = document.getElementById('logoutButton');

    // Вираз для перевірки email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Перевіряє, чи є щось у LocalStorage.
    function checkLoginState() {
        // Дістаємо дані з LocalStorage за ключем 'userData'
        const savedUserData = localStorage.getItem('userData');
        
        if (savedUserData) {
            // Якщо дані є:
            // 1. Перетворюємо рядок JSON назад в об'єкт
            const userData = JSON.parse(savedUserData);
            
            // 2. Встановлюємо текст привітання
            welcomeMessage.textContent = `Раді вас бачити, ${userData.name}! (Email: ${userData.email})`;
            
            // 3. Ховаємо форму реєстрації
            form.classList.add('hidden');
            
            // 4. Показуємо екран привітання
            welcomeScreen.classList.remove('hidden');
        } else {
            // Якщо даних немає:
            // 1. Показуємо форму
            form.classList.remove('hidden');
            
            // 2. Ховаємо екран привітання
            welcomeScreen.classList.add('hidden');
        }
    }
  
    // Функція для показу помилки
    function showError(input, errorElement, message) {
        input.classList.add('invalid'); 
        input.classList.remove('valid'); 
        errorElement.textContent = message;
        errorElement.classList.add('visible'); 
        input.setAttribute('aria-invalid', 'true');
    }

    // Функція для приховування помилки (коли все добре)
    function clearError(input, errorElement) {
        input.classList.add('valid'); 
        input.classList.remove('invalid');
        errorElement.textContent = '';
        errorElement.classList.remove('visible');
        input.setAttribute('aria-invalid', 'false');
    }

    // Головна функція валідації форми
    function validateForm() {
        let isValid = true;

        // 1. Валідація імені
        if (nameInput.value.trim() === '') {
            // .trim() - прибирає пробіли на початку і в кінці
            showError(nameInput, nameError, "Ім'я не може бути порожнім");
            isValid = false;
        } else {
            clearError(nameInput, nameError);
        }

        // 2. Валідація Email
        if (emailInput.value.trim() === '') {
            showError(emailInput, emailError, "Email не може бути порожнім");
            isValid = false;
        } else if (!emailPattern.test(emailInput.value)) {
            // .test() - перевіряє, чи відповідає рядок регулярному виразу
            showError(emailInput, emailError, "Введіть коректний Email (наприклад, user@example.com)");
            isValid = false;
        } else {
            clearError(emailInput, emailError);
        }

        return isValid; // Повертаємо true або false
    }

    // Обробник відправки форми (подія 'submit')
    function handleSubmit(event) {

        event.preventDefault();

        // Запускаємо нашу валідацію
        if (validateForm()) {
            // Якщо валідація пройшла успішно (повернула true):
            
            // 1. Створюємо об'єкт з даними користувача
            const userData = {
                name: nameInput.value,
                email: emailInput.value
            };
            
            // 2. Зберігаємо в LocalStorage
            localStorage.setItem('userData', JSON.stringify(userData));
            
            // 3. Виводимо сповіщення
            alert('Реєстрація пройшла успішно!');
            
            // 4. Очищуємо поля форми
            form.reset();
            // Знімаємо "зелені" класи з полів після очищення
            nameInput.classList.remove('valid');
            emailInput.classList.remove('valid');
            
            // 5. Оновлюємо екран, щоб показати привітання
            checkLoginState();
        }
    }

    // Обробник для кнопки "Вийти" (подія 'click')
    function handleLogout() {
        // 1. Видаляємо наші дані з LocalStorage
        localStorage.removeItem('userData');
        
        // 2. Оновлюємо екран, щоб показати форму
        checkLoginState();
    }

    form.addEventListener('submit', handleSubmit);

    logoutButton.addEventListener('click', handleLogout);

    checkLoginState();

});