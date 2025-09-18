document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            // Impede que a página recarregue ao enviar o formulário
            event.preventDefault(); 

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Credenciais fixas para o protótipo (conforme indicado no seu HTML)
            const correctEmail = 'cliente@email.com';
            const correctPassword = '1234';

            if (email === correctEmail && password === correctPassword) {
                // Se o login estiver correto, redireciona para a página principal
                console.log('Login bem-sucedido! Redirecionando...');
                window.location.href = 'index.html';
            } else {
                // Se estiver errado, exibe a mensagem de erro que já existe no HTML
                errorMessage.style.display = 'block';
            }
        });
    }
});
