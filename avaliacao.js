document.addEventListener('DOMContentLoaded', () => {
    const starContainer = document.getElementById('starRating');
    const reviewCommentTextarea = document.getElementById('reviewComment');
    const evaluationForm = document.getElementById('evaluationForm');

    // Se os elementos essenciais não existirem, o script para.
    if (!starContainer || !evaluationForm) return;

    const stars = starContainer.querySelectorAll('.star');
    let currentRating = 0;

    // Função para atualizar a aparência das estrelas
    const updateStars = (rating) => {
        stars.forEach((s, index) => {
            if (index < rating) {
                s.innerHTML = '★'; // Estrela preenchida
                s.classList.add('selected');
            } else {
                s.innerHTML = '☆'; // Estrela vazia
                s.classList.remove('selected');
            }
        });
    };
    
    stars.forEach(star => {
        // Efeito ao passar o mouse
        star.addEventListener('mouseover', () => {
            const ratingValue = parseInt(star.dataset.value, 10);
            updateStars(ratingValue);
        });

        // Volta ao estado da nota clicada quando o mouse sai
        star.addEventListener('mouseout', () => {
            updateStars(currentRating);
        });

        // Define a nota ao clicar
        star.addEventListener('click', () => {
            currentRating = parseInt(star.dataset.value, 10);
            updateStars(currentRating);
        });
    });

    // Lida com o envio do formulário
    evaluationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        if (currentRating === 0) {
            alert('Por favor, selecione uma nota (de 1 a 5 estrelas) para o serviço.');
            return;
        }

        const comment = reviewCommentTextarea.value;

        // Salvar a avaliação no localStorage para ser exibida no perfil
        localStorage.setItem('anaLimaRating', currentRating);
        localStorage.setItem('anaLimaComment', comment);

        alert('Avaliação enviada com sucesso! Você será redirecionado para o perfil do prestador para ver sua avaliação.');
        
        // Redireciona para o perfil para que o usuário veja a avaliação que acabou de fazer
        window.location.href = 'perfil-prestador.html'; 
    });
});
