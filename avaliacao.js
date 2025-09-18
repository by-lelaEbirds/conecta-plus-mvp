document.addEventListener('DOMContentLoaded', () => {
    const starContainer = document.getElementById('starRating');
    const reviewCommentTextarea = document.getElementById('reviewComment');
    const evaluationForm = document.getElementById('evaluationForm');

    if (!starContainer || !evaluationForm) return;

    const stars = starContainer.querySelectorAll('.star');
    let currentRating = 0;

    stars.forEach(star => {
        star.addEventListener('mouseover', () => {
            const ratingValue = parseInt(star.dataset.value, 10);
            stars.forEach((s, index) => {
                s.style.color = index < ratingValue ? 'var(--star-color)' : 'var(--border-color)';
            });
        });

        star.addEventListener('mouseout', () => {
            stars.forEach((s, index) => {
                s.style.color = index < currentRating ? 'var(--star-color)' : 'var(--border-color)';
            });
        });

        star.addEventListener('click', () => {
            currentRating = parseInt(star.dataset.value, 10);
            stars.forEach((s, index) => {
                s.classList.toggle('selected', index < currentRating);
            });
        });
    });

    evaluationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        if (currentRating === 0) {
            alert('Por favor, selecione uma nota para o serviço.');
            return;
        }

        const comment = reviewCommentTextarea.value;

        // Salvar a avaliação no localStorage
        localStorage.setItem('anaLimaRating', currentRating);
        localStorage.setItem('anaLimaComment', comment);

        alert('Avaliação enviada com sucesso! Ela será exibida no perfil do prestador.');
        window.location.href = 'perfil-prestador.html'; // Redireciona para o perfil para ver a avaliação
    });
});
