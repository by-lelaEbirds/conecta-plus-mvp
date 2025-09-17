document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const newRequestBtn = document.getElementById('newRequestBtn');
    const closeModalBtn = document.querySelector('.close-modal');

    // Funções para abrir e fechar o modal
    const openModal = () => {
        if (modal) modal.classList.add('show');
    };

    const closeModal = () => {
        if (modal) modal.classList.remove('show');
    };

    // Adiciona os eventos aos botões
    if (newRequestBtn) {
        newRequestBtn.addEventListener('click', openModal);
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Fecha o modal se o usuário clicar fora dele
    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }
});
