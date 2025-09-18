document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); 

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const correctEmail = 'cliente@email.com';
            const correctPassword = '1234';

            if (email === correctEmail && password === correctPassword) {
                // Redireciona para a página de dashboard correta
                window.location.href = 'dashboard.html';
            } else {
                errorMessage.style.display = 'block';
            }
        });
    }
});
