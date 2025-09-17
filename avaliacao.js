document.addEventListener('DOMContentLoaded', () => {
    const starContainer = document.getElementById('starRating');
    if (!starContainer) return;

    const stars = starContainer.querySelectorAll('.star');
    let currentRating = 0;

    stars.forEach(star => {
        // Evento para quando o mouse passa por cima de uma estrela
        star.addEventListener('mouseover', () => {
            const ratingValue = parseInt(star.dataset.value, 10);
            // Pinta todas as estrelas até a que está com o mouse em cima
            stars.forEach((s, index) => {
                if (index < ratingValue) {
                    s.style.color = 'var(--star-color)';
                } else {
                    s.style.color = 'var(--border-color)';
                }
            });
        });

        // Evento para quando o mouse sai da área das estrelas
        star.addEventListener('mouseout', () => {
            // Volta para a cor da nota que foi clicada (ou cinza se nenhuma foi clicada)
            stars.forEach((s, index) => {
                if (index < currentRating) {
                    s.classList.add('selected');
                    s.style.color = 'var(--star-color)';
                } else {
                    s.classList.remove('selected');
                    s.style.color = 'var(--border-color)';
                }
            });
        });

        // Evento para o clique
        star.addEventListener('click', () => {
            currentRating = parseInt(star.dataset.value, 10);
            // Adiciona a classe 'selected' para fixar a cor amarela
            stars.forEach((s, index) => {
                 if (index < currentRating) {
                    s.classList.add('selected');
                } else {
                    s.classList.remove('selected');
                }
            });
        });
    });
});
