// Variáveis específicas do jogo de frações
let fractionLives = 5;  // O jogador começa com 3 vidas
let fractionLevel = 1; // Iniciar no nível 1
let fractionScore = 0; // Iniciar com pontuação 0
let correctNumerator, correctDenominator;  // Para armazenar a resposta correta como fração

// Função para iniciar o jogo de frações
function startFractionGame() {
    currentGame = 'fractions';  // Define o jogo atual
    fractionLevel = 1;
    fractionScore = 0;
    fractionLives = 5;
    document.getElementById('level').textContent = `Nível: ${fractionLevel}`;
    document.getElementById('score').textContent = `Pontuação: ${fractionScore}`;
    document.getElementById('lives').textContent = `Vidas: ➕➕➕➕➕`;  // Exibe 3 vidas com "+"
    generateFractionQuestion();  // Gera a primeira pergunta
}

// Função para gerar perguntas baseadas no nível (somente para o jogo de frações)
function generateFractionQuestion() {
    if (currentGame !== 'fractions') return;

    let num1, num2, denom1, denom2, operator;

    switch (fractionLevel) {
        case 1:
            // Nível 1: Soma e subtração de frações com denominadores iguais (1 a 10)
            num1 = Math.floor(Math.random() * 10) + 1;
            denom1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            denom2 = denom1; // Denominadores iguais
            operator = Math.random() > 0.5 ? '+' : '-';
            break;
    
        case 2:
            // Nível 2: Soma e subtração de frações com denominadores múltiplos (1 a 10)
            num1 = Math.floor(Math.random() * 10) + 1;
            denom1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            denom2 = denom1 * (Math.floor(Math.random() * 3) + 1); // Denominador é múltiplo de denom1
            operator = Math.random() > 0.5 ? '+' : '-';
            break;
    
        case 3:
            // Nível 3: Multiplicação de frações (1 a 10)
            num1 = Math.floor(Math.random() * 10) + 1;
            denom1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            denom2 = Math.floor(Math.random() * 10) + 1;
            operator = '*'; // Multiplicação
            break;
    
        case 4:
            // Nível 4: Divisão de frações (1 a 10)
            num1 = Math.floor(Math.random() * 10) + 1;
            denom1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            denom2 = Math.floor(Math.random() * 10) + 1;
            operator = '/'; // Divisão
            break;
    
        case 5:
            // Nível 5: As 4 operações com frações (1 a 10)
            num1 = Math.floor(Math.random() * 10) + 1;
            denom1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            denom2 = Math.floor(Math.random() * 10) + 1;
            operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)]; // Operações aleatórias
            break;
    
        case 6:
            // Nível 6: As 4 operações com frações (1 a 20)
            num1 = Math.floor(Math.random() * 20) + 1;
            denom1 = Math.floor(Math.random() * 20) + 1;
            num2 = Math.floor(Math.random() * 20) + 1;
            denom2 = Math.floor(Math.random() * 20) + 1;
            operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)]; // Operações aleatórias
            break;

        case 7:
            // Nível 7: As 4 operações com frações (1 a 30)
            num1 = Math.floor(Math.random() * 30) + 1;
            denom1 = Math.floor(Math.random() * 30) + 1;
            num2 = Math.floor(Math.random() * 30) + 1;
            denom2 = Math.floor(Math.random() * 30) + 1;
            operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)]; // Operações aleatórias
            break;

        case 8:
            // Nível 8: As 4 operações com frações (1 a 50)
            num1 = Math.floor(Math.random() * 50) + 1;
            denom1 = Math.floor(Math.random() * 50) + 1;
            num2 = Math.floor(Math.random() * 50) + 1;
            denom2 = Math.floor(Math.random() * 50) + 1;
            operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)]; // Operações aleatórias
            break;

        case 9:
            // Nível 9: As 4 operações com frações (1 a 100)
            num1 = Math.floor(Math.random() * 100) + 1;
            denom1 = Math.floor(Math.random() * 100) + 1;
            num2 = Math.floor(Math.random() * 100) + 1;
            denom2 = Math.floor(Math.random() * 100) + 1;
            operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)]; // Operações aleatórias
            break;

        case 10:
            // Nível 10: As 4 operações com frações (1 a 1000)
            num1 = Math.floor(Math.random() * 1000) + 1;
            denom1 = Math.floor(Math.random() * 1000) + 1;
            num2 = Math.floor(Math.random() * 1000) + 1;
            denom2 = Math.floor(Math.random() * 1000) + 1;
            operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)]; // Operações aleatórias
            break;
    
        default:
            console.log("Nível inválido");
            break;
    }    

    // Calcular a resposta correta no formato de fração
    switch (operator) {
        case '+':
            correctNumerator = (num1 * denom2) + (num2 * denom1);
            correctDenominator = denom1 * denom2;
            break;
        case '-':
            correctNumerator = (num1 * denom2) - (num2 * denom1);
            correctDenominator = denom1 * denom2;
            break;
        case '*':
            correctNumerator = num1 * num2;
            correctDenominator = denom1 * denom2;
            break;
        case '/':
            correctNumerator = num1 * denom2;
            correctDenominator = num2 * denom1;
            break;
    }

    // Simplificar a fração correta
    [correctNumerator, correctDenominator] = simplifyFraction(correctNumerator, correctDenominator);

    // Exibir a pergunta no formato de fração
    document.getElementById('question').innerHTML = `
    <div style="display: inline-block; text-align: center; vertical-align: middle;">
        <div>${num1}</div>
        <div>―</div>
        <div>${denom1}</div>
    </div>
    <span style="display: inline-block; vertical-align: middle; font-size: 24px; margin: 0 10px;">
        ${operator === '*' ? '×' : operator === '/' ? '÷' : operator}
    </span>
    <div style="display: inline-block; text-align: center; vertical-align: middle;">
        <div>${num2}</div>
        <div>―</div>
        <div>${denom2}</div>
    </div>
    <span style="display: inline-block; vertical-align: middle; font-size: 24px; margin: 0 10px;">=</span>
    <span style="display: inline-block; vertical-align: middle; font-size: 24px;">?</span>
    `;
    }

// Função para simplificar frações
function simplifyFraction(numerator, denominator) {
    function gcd(a, b) {
        return b === 0 ? a : gcd(b, a % b);
    }
    const divisor = gcd(numerator, denominator);
    return [numerator / divisor, denominator / divisor];
}

// Verifica a resposta do jogo de frações
function checkFractionAnswer() {
    if (currentGame !== 'fractions') return;

    // Obtém a resposta do jogador (agora permite barras "/")
    const playerAnswer = document.getElementById('answer').value.trim();

    // Valida se o formato da resposta está correto (na forma de fração)
    const fractionPattern = /^-?\d+\/\d+$/;  // Permite frações como -1/2, 1/2, etc.
    const match = playerAnswer.match(fractionPattern);

    // Verifica se a entrada corresponde ao formato de fração
    if (!match) {
        document.getElementById('feedback').textContent = "Por favor, insira uma fração no formato correto (por exemplo, 1/2).";
        return;
    }

    // Extrai o numerador e denominador da resposta do jogador
    const playerNumerator = parseInt(match[0].split('/')[0], 10);
    const playerDenominator = parseInt(match[0].split('/')[1], 10);


    // Simplificar a resposta do jogador
    const [simplifiedPlayerNumerator, simplifiedPlayerDenominator] = simplifyFraction(playerNumerator, playerDenominator);

    // Verifica se a fração fornecida pelo jogador é igual à fração correta
    if (simplifiedPlayerNumerator === correctNumerator && simplifiedPlayerDenominator === correctDenominator) {
        document.getElementById('feedback').innerHTML = '<span style="color: green;">Correto!✅</span>';
        fractionScore += 10;
    } else {
        document.getElementById('feedback').innerHTML = `<span style="color: red;">Errado!❌</span><br>A resposta correta era ${correctNumerator}/${correctDenominator}.`;
        loseLifeFraction();
    }

    // Atualiza a pontuação e o nível
    document.getElementById('score').textContent = `Pontuação: ${fractionScore}`;
    if (fractionScore % 100 === 0 && fractionScore !== 0) {
        fractionLevel++;
        document.getElementById('level').textContent = `Nível: ${fractionLevel}`;
    }

        // Verifica se ainda há vidas antes de gerar uma nova pergunta
        if (fractionLives > 0 ) {
            generateFractionQuestion();  // Gera a próxima pergunta
        }
        document.getElementById('answer').value = '';  // Limpa o campo de resposta para a próxima pergunta
    }
    
    // Função para remover uma vida e verificar o fim do jogo
    function loseLifeFraction() {
        fractionLives--;  // Diminui o número de vidas
        let lifeString = 'Vidas: ' + '➕'.repeat(fractionLives);  // Atualiza o texto de vidas
        document.getElementById('lives').textContent = lifeString;
    
        if (fractionLives === 0) {
            gameOverFraction();  // Chama a função de fim de jogo se as vidas acabarem
        }
    }
    
    // Função para exibir o GAME OVER
    function gameOverFraction() {
        document.getElementById('question').textContent = 'GAME OVER';  // Exibe "GAME OVER"
        document.getElementById('feedback').textContent = '';  // Limpa o feedback anterior
        document.getElementById('answer').disabled = true;  // Desabilita a entrada de respostas
    }

// Event listeners para o jogo de frações
document.getElementById('submit-answer').addEventListener('click', checkFractionAnswer);
document.getElementById('answer').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        checkFractionAnswer();
    }
});
