document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DO TEMA (sem alterações) ---
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.classList.toggle('dark-mode', savedTheme === 'dark');
        themeToggle.addEventListener('click', () => {
            const isDarkMode = document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });
    }

    // --- LÓGICA DO MODAL (sem alterações) ---
    const modal = document.getElementById('modal');
    const newRequestBtns = document.querySelectorAll('#newRequestBtn'); // Pega todos os botões de novo pedido
    const closeModalBtn = document.querySelector('.close-modal');
    const openModal = () => { if (modal) modal.classList.add('show'); };
    const closeModal = () => { if (modal) modal.classList.remove('show'); };
    newRequestBtns.forEach(btn => btn.addEventListener('click', openModal));
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });

    // --- NOVA LÓGICA: RENDERIZAR PEDIDOS SALVOS ---
    const requestsGrid = document.querySelector('.requests-grid');

    const renderServiceRequests = () => {
        if (!requestsGrid) return; // Só executa se estiver na página do dashboard

        const requests = JSON.parse(localStorage.getItem('serviceRequests')) || [];
        
        // Limpa apenas os pedidos que foram adicionados dinamicamente para não duplicar
        document.querySelectorAll('.dynamic-card').forEach(card => card.remove());

        // Adiciona cada pedido salvo na tela
        requests.forEach(request => {
            const card = document.createElement('div');
            card.classList.add('service-card', 'dynamic-card'); // Adiciona uma classe para identificar
            card.innerHTML = `
                <div class="card-header">
                    <h3>${request.title}</h3>
                    <span class="status status-open">Aberto</span>
                </div>
                <p class="card-category">${request.category}</p>
                <p class="card-description">${request.description}</p>
                <div class="card-footer">
                    <span>Aguardando propostas...</span>
                    <a href="#" class="provider-link disabled">Nenhuma proposta</a>
                </div>
            `;
            // Adiciona o novo card no topo da lista
            requestsGrid.prepend(card);
        });
    };

    // Chama a função para renderizar os pedidos assim que a página carregar
    renderServiceRequests();

    // --- NOVA LÓGICA: LIDAR COM O ENVIO DO FORMULÁRIO DE NOVO PEDIDO ---
    const newRequestForm = document.getElementById('newRequestForm');
    if (newRequestForm) {
        newRequestForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede que a página recarregue

            // 1. Captura os dados do formulário
            const serviceTitle = document.getElementById('serviceTitle').value;
            const serviceCategory = document.getElementById('serviceCategory').value;
            const serviceDescription = document.getElementById('serviceDescription').value;

            // 2. Cria um objeto para o novo pedido
            const newRequest = {
                title: serviceTitle,
                category: serviceCategory,
                description: serviceDescription
            };

            // 3. Pega a lista de pedidos já salva, ou cria uma nova se não existir
            const savedRequests = JSON.parse(localStorage.getItem('serviceRequests')) || [];

            // 4. Adiciona o novo pedido na lista
            savedRequests.push(newRequest);

            // 5. Salva a lista atualizada de volta no localStorage
            localStorage.setItem('serviceRequests', JSON.stringify(savedRequests));

            // 6. Fecha o modal e atualiza a lista na tela
            closeModal();
            renderServiceRequests();
            
            // Opcional: Limpa o formulário para a próxima vez
            newRequestForm.reset();
        });
    }
});
