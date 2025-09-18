document.addEventListener('DOMContentLoaded', () => {
    // Encontra o container onde as avaliações existentes estão
    const reviewsList = document.querySelector('.reviews-list');
    
    // Pega os dados da avaliação que foram salvos no localStorage
    const savedRating = localStorage.getItem('anaLimaRating');
    const savedComment = localStorage.getItem('anaLimaComment');

    // Se houver uma avaliação salva e o container de reviews existir...
    if (reviewsList && savedRating) {
        // Cria um novo elemento 'div' para o card da sua avaliação
        const myReviewCard = document.createElement('div');
        myReviewCard.classList.add('review-card');

        // Adiciona um título para destacar qual é a sua avaliação
        const title = document.createElement('h4');
        title.textContent = "Sua Avaliação Recente";
        title.style.marginBottom = '8px';
        
        // Monta o conteúdo HTML do seu card de avaliação
        myReviewCard.innerHTML = `
            <p class="review-rating">⭐ ${savedRating}.0</p>
            <p class="review-text">"${savedComment || 'Nenhum comentário adicionado.'}"</p>
            <p class="review-author">- Sua avaliação</p>
        `;
        
        // Insere o título e o card da sua avaliação no início da lista de reviews
        reviewsList.prepend(myReviewCard);
        reviewsList.prepend(title);
    }
});
