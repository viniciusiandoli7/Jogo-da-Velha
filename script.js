const celula = document.querySelectorAll('[data-cell]');
const botaoReiniciar = document.getElementById('botaoReiniciar');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');

let jogador = 'X';
let scores = {
    X: 0,
    O: 0,
};

// Carregar pontuações do Local Storage ao iniciar
function carregarScores() {
    const carregarScores = JSON.parse(localStorage.getItem('ticTacToeScores'));
    if (carregarScores) {
        scores = carregarScores;
        scoreXElement.textContent = scores.X;
        scoreOElement.textContent = scores.O;
    }
}

function updateScoreboard() {
    scoreXElement.textContent = scores.X;
    scoreOElement.textContent = scores.O;
}

function salvarScores() {
    localStorage.setItem('ticTacToeScores', JSON.stringify(scores));
}

const combinacao = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function start() {
    celula.forEach(celula => {
        celula.classList.remove('X', 'O');
        celula.textContent = '';
        celula.removeEventListener('click', handleClick);
        celula.addEventListener('click', handleClick, { once: true });
    });
    jogador = 'X';
}

function handleClick(e) {
    const celulaClicada = e.target;
    celulaClicada.textContent = jogador;
    celulaClicada.classList.add(jogador);

    if (checarVitoria(jogador)) {
        setTimeout(() => {
            alert(`Jogador ${jogador} venceu!`);
            scores[jogador]++;
            updateScoreboard();
            salvarScores();
            start();
        }, 100);
    } else if (empate()) {
        setTimeout(() => {
            alert('Deu velha!!!');
            start();
        }, 100);
    } else {
        jogador = jogador === 'X' ? 'O' : 'X';
    }
}

function checarVitoria(player) {
    return combinacao.some(combinacao => {
        return combinacao.every(index => {
            return celula[index].classList.contains(player);
        });
    });
}

function empate() {
    return [...celula].every(celula => {
        return celula.classList.contains('X') || celula.classList.contains('O');
    });
}

function reiniciarJogo() {
    start();
}

botaoReiniciar.addEventListener('click', reiniciarJogo);

carregarScores();

start();