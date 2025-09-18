document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DO MODAL ---
    const modal = document.getElementById('modal');
    const newRequestBtn = document.getElementById('newRequestBtn');
    const closeModalBtn = document.querySelector('.close-modal');

    const openModal = () => { if (modal) modal.classList.add('show'); };
    const closeModal = () => { if (modal) modal.classList.remove('show'); };

    if (newRequestBtn) newRequestBtn.addEventListener('click', openModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });

    // --- LÓGICA DO TEMA ---
    const themeToggle = document.getElementById('themeToggle');
    if(themeToggle) {
        // Aplica o tema salvo ao carregar a página
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.classList.toggle('dark-mode', savedTheme === 'dark');

        // Adiciona o evento de clique para trocar o tema
        themeToggle.addEventListener('click', () => {
            const isDarkMode = document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });
    }
});
