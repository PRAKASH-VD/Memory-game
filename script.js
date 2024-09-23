const gameBoard = document.getElementById('game-board');
const restartBtn = document.getElementById('restart-btn');
let cards = [];
let flippedCards = [];
let matchedCards = [];

const cardImages = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🍋', '🥝']; 


function initGame() {
    // reset the game
    flippedCards = [];
    matchedCards = [];
    gameBoard.innerHTML = '';

    // creat-card element
    const shuffledCards = shuffleCards([...cardImages, ...cardImages]);
    shuffledCards.forEach((image, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', index);
        card.setAttribute('data-image', image);
        card.innerHTML = `
            <div class="card-front">${image}</div>
            <div class="card-back"></div>
        `;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
    cards = Array.from(document.querySelectorAll('.card'));
}

//  shufle function
function shuffleCards(array) {
    return array.sort(() => Math.random() - 0.5);
}

// flip card
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flip')) {
        this.classList.add('flip');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

//  flipped cards match check
function checkMatch() {
    const [card1, card2] = flippedCards;
    const img1 = card1.getAttribute('data-image');
    const img2 = card2.getAttribute('data-image');

    if (img1 === img2) {
        matchedCards.push(card1, card2);
        flippedCards = [];

        // game was won check
        if (matchedCards.length === cards.length) {
            setTimeout(() => alert('Congratulations! You found all pairs!'), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flip');
            card2.classList.remove('flip');
            flippedCards = [];
        }, 1000);
    }
}

//  game reset
restartBtn.addEventListener('click', initGame);

// start game on page load
initGame();
