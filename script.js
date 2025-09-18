document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DO TEMA ---
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.classList.toggle('dark-mode', savedTheme === 'dark');
        themeToggle.addEventListener('click', () => {
            const isDarkMode = document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });
    }

    // --- LÓGICA DO MODAL ---
    const modal = document.getElementById('modal');
    const newRequestBtns = document.querySelectorAll('#newRequestBtn');
    const closeModalBtn = document.querySelector('.close-modal');
    const openModal = () => { if (modal) modal.classList.add('show'); };
    const closeModal = () => { if (modal) modal.classList.remove('show'); };
    newRequestBtns.forEach(btn => btn.addEventListener('click', openModal));
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });

    // --- LÓGICA DE PEDIDOS DE SERVIÇO ---
    const requestsGrid = document.querySelector('.requests-grid');
    const newRequestForm = document.getElementById('newRequestForm');

    // Função para converter um arquivo de imagem para o formato Base64 (texto)
    // Isso permite que a imagem seja salva no localStorage
    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    // Função para renderizar/desenhar os cards de serviço na tela
    const renderServiceRequests = () => {
        if (!requestsGrid) return;

        const requests = JSON.parse(localStorage.getItem('serviceRequests')) || [];
        document.querySelectorAll('.dynamic-card').forEach(card => card.remove());

        requests.forEach(request => {
            const card = document.createElement('div');
            card.classList.add('service-card', 'dynamic-card');

            // Formata a data para o padrão brasileiro (DD/MM/AAAA)
            let deadlineText = 'Aguardando propostas...';
            if (request.deadline) {
                const [year, month, day] = request.deadline.split('-');
                deadlineText = `Prazo: até ${day}/${month}/${year}`;
            }

            // Cria a galeria de imagens, se houver
            let imagesHTML = '';
            if (request.images && request.images.length > 0) {
                imagesHTML += '<div class="card-images-container">';
                request.images.forEach(imgBase64 => {
                    imagesHTML += `<img src="${imgBase64}" alt="Foto do serviço" class="card-image">`;
                });
                imagesHTML += '</div>';
            }

            card.innerHTML = `
                <div class="card-header">
                    <h3>${request.title}</h3>
                    <span class="status status-open">Aberto</span>
                </div>
                <p class="card-category">${request.category}</p>
                <p class="card-description">${request.description}</p>
                ${imagesHTML}
                <div class="card-footer">
                    <span>${deadlineText}</span>
                    <a href="#" class="provider-link disabled">Nenhuma proposta</a>
                </div>
            `;
            requestsGrid.prepend(card);
        });
    };

    // Lida com o envio do formulário de novo pedido
    if (newRequestForm) {
        newRequestForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Pega os dados de texto e data
            const title = document.getElementById('serviceTitle').value;
            const category = document.getElementById('serviceCategory').value;
            const description = document.getElementById('serviceDescription').value;
            const deadline = document.getElementById('serviceDeadline').value;
            const photoFiles = document.getElementById('servicePhotos').files;
            
            // Converte todas as imagens selecionadas para Base64
            const imagePromises = Array.from(photoFiles).map(convertFileToBase64);
            const base64Images = await Promise.all(imagePromises);

            const newRequest = {
                title,
                category,
                description,
                deadline,
                images: base64Images
            };

            const savedRequests = JSON.parse(localStorage.getItem('serviceRequests')) || [];
            savedRequests.push(newRequest);
            localStorage.setItem('serviceRequests', JSON.stringify(savedRequests));

            closeModal();
            renderServiceRequests();
            newRequestForm.reset();
        });
    }

    // Renderiza os pedidos salvos ao carregar a página
    renderServiceRequests();
});
