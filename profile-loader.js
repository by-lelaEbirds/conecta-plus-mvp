document.addEventListener('DOMContentLoaded', () => {
    const myReviewSection = document.getElementById('myReviewSection');
    
    // Este script é específico para o perfil da Ana Lima (perfil-prestador.html)
    // Se tivermos múltiplos prestadores e avaliações salvas, seria necessário 
    // um identificador para cada um no localStorage.
    
    const savedRating = localStorage.getItem('anaLimaRating');
    const savedComment = localStorage.getItem('anaLimaComment');

    if (myReviewSection && savedRating) {
        myReviewSection.innerHTML = `
            <div class="review-card">
                <p class="review-rating">⭐ ${savedRating}.0</p>
                <p class="review-text">"${savedComment || 'Nenhum comentário adicionado.'}"</p>
                <p class="review-author">- Sua avaliação</p>
            </div>
        `;
    } else if (myReviewSection) {
        myReviewSection.innerHTML = `
            <p class="text-muted">Nenhuma avaliação sua para este prestador ainda.</p>
        `;
    }
});
