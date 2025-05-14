let score = JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, ties: 0 };
updateScoreElement();

function startGame() {
    document.getElementById('landingPage').style.display = 'none';
    document.getElementById('gamePage').style.display = 'block';
}

function backToLanding() {
    document.getElementById('gamePage').style.display = 'none';
    document.getElementById('landingPage').style.display = 'block';
}

function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';

    if (playerMove === computerMove) {
        result = 'Tie. 🤝';
        score.ties += 1;
    } else if (
        (playerMove === 'rock' && computerMove === 'scissors') ||
        (playerMove === 'paper' && computerMove === 'rock') ||
        (playerMove === 'scissors' && computerMove === 'paper')
    ) {
        result = 'You win ! 🎉';
        score.wins += 1;
        showConfetti();
    } else {
        result = 'You lose ! 😢';
        score.losses += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));
    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `You: ${playerMove} - Computer: ${computerMove}`;
    updateScoreElement();
}

function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function resetScore() {
    score = { wins: 0, losses: 0, ties: 0 };
    localStorage.removeItem('score');
    updateScoreElement();
}

function pickComputerMove() {
    const moves = ['rock', 'paper', 'scissors'];
    return moves[Math.floor(Math.random() * moves.length)];
}

function showConfetti() {
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = Math.random() * window.innerHeight + 'px';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 2000);
    }
}

function changeBackground(color) {
    document.body.style.backgroundColor = color;
}