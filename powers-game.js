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
    document.getElementById('lives').textContent = `Vidas: ➕➕➕➕➕`;  // Exibe 3 vidas com "+"
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
        default:
            break;
    }

    powerAnswer = Math.pow(base, exponent);

    // Exibe a pergunta com a base e o expoente sobrescrito (potência)
    // usando a tag <sup> para o expoente sobrescrito
    document.getElementById('question').innerHTML = `${base} <sup>${exponent}</sup> = ?`;
}

// Função para verificar a resposta
function checkPowerAnswer() {
    if (currentGame !== 'powers') return; 

    const playerAnswer = document.getElementById('answer').value.trim();

    if (playerAnswer === '' || isNaN(playerAnswer)) {
        document.getElementById('feedback').textContent = "Espaço vazio ou valor inválido!";
        return;
    }

    if (parseInt(playerAnswer) === powerAnswer) {
        document.getElementById('feedback').innerHTML = '<span style="color: green;">Correto!✅</span>';
        powerScore += 10;
    } else {
        document.getElementById('feedback').innerHTML = `<span style="color: red;">Errado!❌</span><br>A resposta correta era ${powerAnswer}.`;
        loseLifePower();
    }

    document.getElementById('score').textContent = `Pontuação: ${powerScore}`;
    if (powerScore % 100 === 0 && powerScore !== 0) {
        powerLevel++;
        document.getElementById('level').textContent = `Nível: ${powerLevel}`;
    }

        // Verifica se ainda há vidas antes de gerar uma nova pergunta
        if (powerLives > 0 ) {
            generatePowerQuestion();  // Gera a próxima pergunta
        }
        document.getElementById('answer').value = '';  // Limpa o campo de resposta para a próxima pergunta
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

// Event listeners para o jogo de potenciação
document.getElementById('submit-answer').addEventListener('click', checkPowerAnswer);
document.getElementById('answer').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        checkPowerAnswer();
    }
});