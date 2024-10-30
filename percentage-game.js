let percentageLives = 5;
let percentageLevel = 1;
let percentageScore = 0;
let percentageAnswer = 0;

// Função para iniciar o jogo da porcentagem
function startPercentageGame() {
    currentGame = 'percentage';  
    percentageLevel = 1;
    percentageScore = 0;
    percentageLives = 5;
    document.getElementById('level').textContent = `Nível: ${percentageLevel}`;
    document.getElementById('score').textContent = `Pontuação: ${percentageScore}`;
    document.getElementById('lives').textContent = `Vidas: ➕➕➕➕➕`;  // Exibe vidas com "+"
    generatePercentageQuestion();  // Gera a primeira questão
}

// Função para gerar perguntas de porcentagem
function generatePercentageQuestion() {
    if (currentGame !== 'percentage') return;

    let baseNumber, percentageValue;

    // Ajuste da lógica de níveis com as condições especificadas
    switch (percentageLevel) {
        case 1:
            baseNumber = Math.floor(Math.random() * 11);  // Base de 0 a 10
            percentageValue = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100][Math.floor(Math.random() * 10)];
            break;
        case 2:
            baseNumber = Math.floor(Math.random() * 11);  // Base de 0 a 10
            percentageValue = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100][Math.floor(Math.random() * 20)];
            break;
        case 3:
            baseNumber = Math.floor(Math.random() * 101);  // Base de 0 a 100
            percentageValue = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100][Math.floor(Math.random() * 10)];
            break;
        case 4:
            baseNumber = Math.floor(Math.random() * 101);  // Base de 0 a 100
            percentageValue = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100][Math.floor(Math.random() * 20)];
            break;
        case 5:
            baseNumber = Math.floor(Math.random() * 1001);  // Base de 0 a 1000
            percentageValue = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100][Math.floor(Math.random() * 10)];
            break;
        case 6:
            baseNumber = Math.floor(Math.random() * 1001);  // Base de 0 a 1000
            percentageValue = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100][Math.floor(Math.random() * 20)];
            break;
        case 7:
            baseNumber = Math.floor(Math.random() * 101);  // Base de 0 a 100
            percentageValue =Math.floor(Math.random() * 101);
            break; 
        case 8:
            baseNumber = Math.floor(Math.random() * 1001);  // Base de 0 a 1000
            percentageValue =Math.floor(Math.random() * 101);
            break;                    
        case 9:
            baseNumber = Math.floor(Math.random() * 10001);  // Base de 0 a 10000
            percentageValue =Math.floor(Math.random() * 101);
            break;                    
        case 10:
            baseNumber = Math.floor(Math.random() * 100001);  // Base de 0 a 100000
            percentageValue =Math.floor(Math.random() * 101);
            break;
        case 11:
            victory();
            return;                        
        default:
            break;
    }

    // Calcula a resposta correta para a questão de porcentagem
    percentageAnswer = (percentageValue / 100) * baseNumber;

    // Exibe a pergunta no formato "XX% de YYY = ?"
    document.getElementById('question').innerHTML = `${percentageValue}% de ${baseNumber} = ?`;
}

// Função para verificar a resposta do jogo de porcentagem
function checkPercentageAnswer() {
    if (currentGame !== 'percentage') return; 

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
    if (parseFloat(playerAnswer) === parseFloat(percentageAnswer.toFixed(2))) {
        // Configura o feedback como "Correto!" em verde e adiciona a animação
        feedbackElement.innerHTML = '<span style="color: green;">Correto!✅</span>';
        percentageScore += 10;
        feedbackElement.classList.add('correct-answer');
    } else {
        // Configura o feedback como "Errado!" em vermelho e adiciona a animação
        feedbackElement.innerHTML = `<span style="color: red;">Errado!❌</span><br>A resposta correta era ${percentageAnswer.toFixed(2)}.`;
        loseLifePercentage();
        feedbackElement.classList.add('wrong-answer');
    }

    // Atualiza a pontuação e o nível na tela
    document.getElementById('score').textContent = `Pontuação: ${percentageScore}`;
    if (percentageScore % 100 === 0 && percentageScore !== 0) {
        percentageLevel++;
        document.getElementById('level').textContent = `Nível: ${percentageLevel}`;
    }

    // Verifica se o jogador ainda tem vidas antes de gerar uma nova pergunta
    if (percentageLives > 0) {
        generatePercentageQuestion();  // Gera a próxima pergunta
    } else {
        gameOver();  // Exibe a tela de GAME OVER se o jogador perder todas as vidas
    }

    // Limpa o campo de resposta para a próxima pergunta
    document.getElementById('answer').value = '';
}
    
    // Função para remover uma vida e verificar o fim do jogo
    function loseLifePercentage() {
        percentageLives--;  // Diminui o número de vidas
        let lifeString = 'Vidas: ' + '➕'.repeat(percentageLives);  // Atualiza o texto de vidas
        document.getElementById('lives').textContent = lifeString;
    
        if (percentageLives === 0) {
            gameOverPercentage();  // Chama a função de fim de jogo se as vidas acabarem
        }
    }
    
    // Função para exibir o GAME OVER
    function gameOverPercentage() {
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

// Event listeners para o jogo de porcentagem
document.getElementById('submit-answer').addEventListener('click', checkPercentageAnswer);
document.getElementById('answer').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        checkPercentageAnswer();
    }
});