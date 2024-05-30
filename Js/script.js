// Variables
const cards = ['🍎', '🍌', '🍒', '🍇', '🥥', '🍋', '🍊', '🍉']; // Pares de cartas
let flippedCards = [];
let matchedCards = [];
let gameBoard = document.getElementById('game-board');

// Funciones
function createBoard() {
    const allCards = cards.concat(cards); // Duplicar las cartas
    shuffleArray(allCards); // Mezclar las cartas

    allCards.forEach(card => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `<span class="hidden">${card}</span>`;
        div.addEventListener('click', flipCard);
        gameBoard.appendChild(div);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function flipCard() {
    if (flippedCards.length < 2 && !flippedCards.includes(this) && !matchedCards.includes(this)) {
        this.classList.add('flip'); // Agregar clase 'flip' para voltear la carta
        setTimeout(() => {
            this.firstChild.classList.remove('hidden'); // Mostrar contenido después de la animación
        }, 150); // Ajustar tiempo para que la animación termine

        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    } else if (flippedCards.length === 2 && !flippedCards.includes(this)) {
        // Voltear automáticamente las cartas después de un tiempo si no son una pareja coincidente
        setTimeout(() => {
            flippedCards.forEach(card => {
                card.classList.remove('flip');
                card.firstChild.classList.add('hidden');
            });
            flippedCards = [];
        }, 500);
    }
}
function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.firstChild.textContent === secondCard.firstChild.textContent) {
        // Si las cartas son una pareja coincidente, mantenerlas volteadas hacia arriba
        matchedCards.push(...flippedCards);
        flippedCards = [];

        // Verificar si el jugador ha ganado
        if (matchedCards.length === cards.length * 2) {
            // Reproducir el sonido de victoria
            playWinSound();

            Swal.fire({
                title: '¡Felicidades!',
                text: '¡Has ganado!',
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: 'OK',
                cancelButtonText: 'Jugar de Nuevo?',
                cancelButtonColor: '#3085d6',
                confirmButtonColor: '#d33'
            }).then((result) => {
                if (result.isConfirmed) {
                } else {
                    // Aquí reiniciamos el juego
                    resetGame();
                }
            });
        }
    } else {
        // Si las cartas no son una pareja coincidente, voltearlas hacia abajo después de un tiempo
        setTimeout(() => {
            flippedCards.forEach(card => {
                card.classList.remove('flip');
                card.firstChild.classList.add('hidden');
            });
            flippedCards = [];
        }, 500);
    }
}

function playWinSound() {
    // Crear un elemento de audio
    const audio = new Audio('img/win-sound.mp3');
    // Reproducir el sonido
    audio.play();
}

function resetGame() {
    flippedCards = [];
    matchedCards = [];
    const cardElements = document.querySelectorAll('.card');
    cardElements.forEach(card => {
        card.remove(); // Eliminar cada carta del tablero actual
    });
    createBoard(); // Crear un nuevo tablero
}


// Inicialización
createBoard();
