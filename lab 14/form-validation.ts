export function initValidation(): void {
    const form = document.getElementById("contactForm") as HTMLFormElement | null;
    const statusDiv = document.getElementById("formStatus") as HTMLElement | null;

    if (!form || !statusDiv) return;

    // Показати помилку
    const showError = (input: HTMLInputElement | HTMLTextAreaElement, msgId: string, message: string) => {
        const errorSpan = document.getElementById(msgId);
        if (errorSpan) {
            errorSpan.textContent = message;
            errorSpan.classList.remove("hidden");

            input.setAttribute("aria-invalid", "true"); // Повідомляє що дані неправильні
            input.setAttribute("aria-errormessage", msgId); // Зв'язує поле з текстом помилки
        }
    };

    // Прибрати помилку
    const clearError = (input: HTMLInputElement | HTMLTextAreaElement, msgId: string) => {
        const errorSpan = document.getElementById(msgId);
        if (errorSpan) {
            errorSpan.textContent = "";
            errorSpan.classList.add("hidden");
            input.setAttribute("aria-invalid", "false");
            input.removeAttribute("aria-errormessage");
        }
    };

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        
        let isValid = true;
        let firstInvalidInput: HTMLElement | null = null;

        // 1. Перевірка "Ім'я"
        const usernameInput = document.getElementById("username") as HTMLInputElement;
        if (!usernameInput.value.trim()) {
            showError(usernameInput, "errUsername", "Поле ім'я не може бути порожнім.");
            isValid = false;
            if (!firstInvalidInput) firstInvalidInput = usernameInput;
        } else {
            clearError(usernameInput, "errUsername");
        }

        // 2. Перевірка "Email"
        const emailInput = document.getElementById("email") as HTMLInputElement;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailInput.value.trim()) {
            showError(emailInput, "errEmail", "Будь ласка, введіть email адресу.");
            isValid = false;
            if (!firstInvalidInput) firstInvalidInput = emailInput;
        } else if (!emailPattern.test(emailInput.value)) {
            showError(emailInput, "errEmail", "Некоректний формат email.");
            isValid = false;
            if (!firstInvalidInput) firstInvalidInput = emailInput;
        } else {
            clearError(emailInput, "errEmail");
        }

        // 3. Перевірка "Повідомлення"
        const messageInput = document.getElementById("message") as HTMLTextAreaElement;
        if (messageInput.value.length < 10) {
            showError(messageInput, "errMessage", "Повідомлення має містити мінімум 10 символів.");
            isValid = false;
            if (!firstInvalidInput) firstInvalidInput = messageInput;
        } else {
            clearError(messageInput, "errMessage");
        }

        // Підсумок
        if (!isValid) {
            statusDiv.textContent = "Перевірте правильність введених даних.";
            statusDiv.style.color = "#d32f2f";

            if (firstInvalidInput) {
                firstInvalidInput.focus();
            }
        } else {
            statusDiv.textContent = "Форма успішно відправлена!";
            statusDiv.style.color = "green";
            form.reset();
            [usernameInput, emailInput, messageInput].forEach(el => el.setAttribute("aria-invalid", "false"));
        }
    });
    
    console.log("Логіка валідації форми активована");
}