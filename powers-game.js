let powerLives = 5;
let powerLevel = 1;
let powerScore = 0;
let powerAnswer = 0;

// Função para iniciar o jogo de potenciação
function startPowerGame() {
    currentGame = 'powers';  
    powerLevel = 1;
    powerScore = 0;
    powerLives = 5;
    document.getElementById('level').textContent = `Nível: ${powerLevel}`;
    document.getElementById('score').textContent = `Pontuação: ${powerScore}`;
    document.getElementById('lives').textContent = `Vidas: ➕➕➕➕➕`;  // Exibe vidas com "+"
    generatePowerQuestion();  // Gera a primeira questão
}

// Função para gerar perguntas de potenciação
function generatePowerQuestion() {
    if (currentGame !== 'powers') return;

    let base, exponent;

    // Ajuste da lógica de níveis com as novas condições
    switch (powerLevel) {
        case 1:
            base = Math.floor(Math.random() * 11);  // Base de 0 a 10
            exponent = Math.floor(Math.random() * 3);  // Expoente de 0 a 2
            break;
        case 2:
            base = Math.floor(Math.random() * 11);  // Base de 0 a 10
            exponent = Math.floor(Math.random() * 4);  // Expoente de 0 a 3
            break;
        case 3:
            base = Math.floor(Math.random() * 11);  // Base de 0 a 10
            exponent = Math.floor(Math.random() * 5);  // Expoente de 0 a 4
            break;
        case 4:
            base = Math.floor(Math.random() * 11);  // Base de 0 a 10
            exponent = Math.floor(Math.random() * 6);  // Expoente de 0 a 5
            break;
        case 5:
            base = Math.floor(Math.random() * 11);  // Base de 0 a 10
            exponent = Math.floor(Math.random() * 11);  // Expoente de 0 a 10
            break;
        case 6:
            base = Math.floor(Math.random() * 101);  // Base de 0 a 100
            exponent = Math.floor(Math.random() * 3);  // Expoente de 0 a 2
            break;
        case 7:
            base = Math.floor(Math.random() * 101);  // Base de 0 a 100
            exponent = Math.floor(Math.random() * 4);  // Expoente de 0 a 3
            break;
        case 8:
            base = Math.floor(Math.random() * 101);  // Base de 0 a 100
            exponent = Math.floor(Math.random() * 5);  // Expoente de 0 a 4
            break;
        case 9:
            base = Math.floor(Math.random() * 101);  // Base de 0 a 100
            exponent = Math.floor(Math.random() * 6);  // Expoente de 0 a 5
            break;
        case 10:
            base = Math.floor(Math.random() * 101);  // Base de 0 a 100
            exponent = Math.floor(Math.random() * 11);  // Expoente de 0 a 10
            break;
            case 11:
                victory(); //Chama a função de vitória    
                return;    
        default:
            break;
    }

    powerAnswer = Math.pow(base, exponent);

    // Exibe a pergunta com a base e o expoente sobrescrito (potência)
    // usando a tag <sup> para o expoente sobrescrito
    document.getElementById('question').innerHTML = `${base} <sup>${exponent}</sup> = ?`;
}

// Função para verificar a resposta do jogo de potenciação
function checkPowerAnswer() {
    if (currentGame !== 'powers') return; 

    const playerAnswer = document.getElementById('answer').value.trim();
    const feedbackElement = document.getElementById('feedback');

    // Verifica se a resposta do jogador está vazia ou é inválida
    if (playerAnswer === '' || isNaN(playerAnswer)) {
        feedbackElement.textContent = "Espaço vazio ou valor inválido!";
        return;
    }

    // Remove as classes de animação para reiniciar a animação, se necessário
    feedbackElement.classList.remove('correct-answer', 'wrong-answer');
    void feedbackElement.offsetWidth;  // Trigger reflow para reiniciar a animação

    // Verifica se a resposta do jogador está correta
    if (parseInt(playerAnswer) === powerAnswer) {
        // Configura o feedback como "Correto!" em verde e adiciona a animação
        feedbackElement.innerHTML = '<span style="color: green;">Correto!✅</span>';
        powerScore += 10;
        feedbackElement.classList.add('correct-answer');
    } else {
        // Configura o feedback como "Errado!" em vermelho e adiciona a animação
        feedbackElement.innerHTML = `<span style="color: red;">Errado!❌</span><br>A resposta correta era ${powerAnswer}.`;
        loseLifePower();
        feedbackElement.classList.add('wrong-answer');
    }

    // Atualiza a pontuação e o nível na tela
    document.getElementById('score').textContent = `Pontuação: ${powerScore}`;
    if (powerScore % 100 === 0 && powerScore !== 0) {
        powerLevel++;
        document.getElementById('level').textContent = `Nível: ${powerLevel}`;
    }

    // Verifica se o jogador ainda tem vidas antes de gerar uma nova pergunta
    if (powerLives > 0) {
        generatePowerQuestion();  // Gera a próxima pergunta
    } else {
        gameOver();  // Exibe a tela de GAME OVER se o jogador perder todas as vidas
    }

    // Limpa o campo de resposta para a próxima pergunta
    document.getElementById('answer').value = '';
}
    
    // Função para remover uma vida e verificar o fim do jogo
    function loseLifePower() {
        powerLives--;  // Diminui o número de vidas
        let lifeString = 'Vidas: ' + '➕'.repeat(powerLives);  // Atualiza o texto de vidas
        document.getElementById('lives').textContent = lifeString;
    
        if (powerLives === 0) {
            gameOverpower();  // Chama a função de fim de jogo se as vidas acabarem
        }
    }
    
    // Função para exibir o GAME OVER
    function gameOverpower() {
        document.getElementById('question').innerHTML = '<span style="color: red;">GAME OVER</span>';  // Exibe "GAME OVER" em vermelho
        document.getElementById('feedback').textContent = '';  // Limpa o feedback anterior
        document.getElementById('answer').disabled = true;  // Desabilita a entrada de respostas
    }

    //Função para exibir a VITÓRIA
    function victory() {
        document.getElementById('question').innerHTML = '<span style="color: gold;">VOCÊ VENCEU! 🏆</span>';  // Exibe "VOCÊ VENCEU!" em dourado
        document.getElementById('feedback').textContent = '';  // Limpa o feedback anterior
        document.getElementById('answer').disabled = true;  // Desabilita a entrada de respostas
    }

// Event listeners para o jogo de potenciação
document.getElementById('submit-answer').addEventListener('click', checkPowerAnswer);
document.getElementById('answer').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        checkPowerAnswer();
    }
});