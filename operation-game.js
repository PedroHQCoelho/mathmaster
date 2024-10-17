// Variáveis específicas do jogo de operações básicas
let lives = 5;  // O jogador começa com 5 vidas
let level = 1;  // Iniciar no nível 1
let score = 0;  // Iniciar com pontuação 0
let currentAnswer;  // Armazena a resposta correta para comparação

// Função para iniciar o jogo de operações básicas
function startOperationGame() {
    currentGame = 'operation';  // Define o jogo atual como operações básicas
    level = 1;  // Iniciar no nível 1
    score = 0;  // Iniciar a pontuação com 0
    lives = 5;  // Reinicia com 5 vidas
    document.getElementById('level').textContent = `Nível: ${level}`;  // Exibir o nível inicial
    document.getElementById('score').textContent = `Pontuação: ${score}`;  // Exibir a pontuação inicial
    document.getElementById('lives').textContent = `Vidas: ➕➕➕➕➕`;  // Exibe 3 vidas com "+"
    generateQuestion();  // Gera a primeira pergunta
}

// Função para gerar perguntas baseadas no nível atual
function generateQuestion() {
    if (currentGame !== 'operation') return;  // Verifica se o jogo ativo é o de operações básicas

    let num1, num2, num3, operator, operator2 = null;  // Variáveis para armazenar os números e operadores

    switch (level) {
        case 1:
            // Nível 1: Números de 0 a 10, operadores '+' ou '-'
            num1 = Math.floor(Math.random() * 11);  // Número 1 aleatório entre 0 e 10
            num2 = Math.floor(Math.random() * 11);  // Número 2 aleatório entre 0 e 10
            operator = Math.random() > 0.5 ? '+' : '-';  // Escolha aleatória entre '+' e '-'
            // Garantir que a subtração não resulte em número negativo
            if (operator === '-' && num1 < num2) {
                [num1, num2] = [num2, num1];  // Inverter para garantir que o número maior venha primeiro
            }
            currentAnswer = eval(`${num1} ${operator} ${num2}`);  // Calcula a resposta correta
            break;

        case 2:
            // Nível 2: Números de 0 a 20, operadores '+' ou '-'
            num1 = Math.floor(Math.random() * 21);  // Número 1 aleatório entre 0 e 20
            num2 = Math.floor(Math.random() * 21);  // Número 2 aleatório entre 0 e 20
            operator = Math.random() > 0.5 ? '+' : '-';  // Escolha aleatória entre '+' e '-'
            // Garantir que a subtração não resulte em número negativo
            if (operator === '-' && num1 < num2) {
                [num1, num2] = [num2, num1];  // Inverter para garantir que o número maior venha primeiro
            }
            currentAnswer = eval(`${num1} ${operator} ${num2}`);  // Calcula a resposta correta
            break;

        case 3:
            // Nível 3: Multiplicação de números de 0 a 10.
            num1 = Math.floor(Math.random() * 11);
            num2 = Math.floor(Math.random() * 11);
            operator = '*';
            currentAnswer = eval(`${num1} ${operator} ${num2}`);  // Calcula a resposta correta
            break;

        case 4:
            // Nível 4: Divisão de números de 0 a 100.
            num1 = Math.floor(Math.random() * 11);
            num2 = Math.floor(Math.random() * 11);
            operator = '/';
            // Garantir que a divisão seja exata e não tenha divisão por 0
            if (operator === '/' && num2 !== 0) {
                let quotient = Math.floor(Math.random() * 10) + 1;  // Quociente aleatório
                num1 = num2 * quotient;  // Multiplicando para garantir uma divisão exata
            }
            currentAnswer = eval(`${num1} ${operator} ${num2}`);
            break;

        case 5:
            // Nível 5: Números de 0 a 10, operadores '+', '-' ou '*'
            num1 = Math.floor(Math.random() * 11);  // Número 1 aleatório entre 0 e 10
            num2 = Math.floor(Math.random() * 11);  // Número 2 aleatório entre 0 e 10
            operator = ['+', '-', '*'][Math.floor(Math.random() * 3)];
            // Garantir que a subtração não resulte em número negativo
            if (operator === '-' && num1 < num2) {
                [num1, num2] = [num2, num1];  // Inverter para garantir que o número maior venha primeiro
            }
            currentAnswer = eval(`${num1} ${operator} ${num2}`);
            break;

        case 6:
            // Nível 6: Números de 0 a 10, operadores '+', '-', '*' ou '/'
            num1 = Math.floor(Math.random() * 11);  // Número 1 aleatório entre 0 e 10
            num2 = Math.floor(Math.random() * 11);  // Número 2 aleatório entre 0 e 10
            operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];  // Escolha aleatória entre '+', '-', '*' e '/'
            // Garantir que a subtração não resulte em número negativo
            if (operator === '-' && num1 < num2) {
                [num1, num2] = [num2, num1];  // Inverter para garantir que o número maior venha primeiro
            }
            // Garantir que a divisão seja exata e não tenha divisão por 0
            if (operator === '/') {
                // Recalcular num2 se for 0
                while (num2 === 0) {
                    num2 = Math.floor(Math.random() * 11);  // Garante que num2 não seja zero
                }
                let quotient = Math.floor(Math.random() * 10) + 1;  // Quociente aleatório
                num1 = num2 * quotient;  // Multiplicando para garantir uma divisão exata
            }
            currentAnswer = eval(`${num1} ${operator} ${num2}`);
            break;

        case 7:
            // Nível 7: Números de 0 a 50, operadores '+', '-', '*' ou '/'
            num1 = Math.floor(Math.random() * 51);  // Número 1 aleatório entre 0 e 50
            num2 = Math.floor(Math.random() * 51);  // Número 2 aleatório entre 0 e 50
            operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];  // Escolha aleatória entre '+', '-', '*' e '/'
            // Garantir que a subtração não resulte em número negativo
            if (operator === '-' && num1 < num2) {
                [num1, num2] = [num2, num1];  // Inverter para garantir que o número maior venha primeiro
            }
            // Garantir que a divisão seja exata e não tenha divisão por 0
            if (operator === '/') {
                // Recalcular num2 se for 0
                while (num2 === 0) {
                    num2 = Math.floor(Math.random() * 51);  // Garante que num2 não seja zero
                }
                let quotient = Math.floor(Math.random() * 50) + 1;  // Quociente aleatório
                num1 = num2 * quotient;  // Multiplicando para garantir uma divisão exata
            }
            currentAnswer = eval(`${num1} ${operator} ${num2}`);
            break;
        
        case 8:
            // Nível 8: Números de 0 a 100, operadores '+', '-', '*' ou '/'
            num1 = Math.floor(Math.random() * 101);  // Número 1 aleatório entre 0 e 100
            num2 = Math.floor(Math.random() * 101);  // Número 2 aleatório entre 0 e 100
            operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];  // Escolha aleatória entre '+', '-', '*' e '/'
            // Garantir que a subtração não resulte em número negativo
            if (operator === '-' && num1 < num2) {
                [num1, num2] = [num2, num1];  // Inverter para garantir que o número maior venha primeiro
            }
            // Garantir que a divisão seja exata e não tenha divisão por 0
            if (operator === '/') {
                // Recalcular num2 se for 0
                while (num2 === 0) {
                    num2 = Math.floor(Math.random() * 101);  // Garante que num2 não seja zero
                }
                let quotient = Math.floor(Math.random() * 100) + 1;  // Quociente aleatório
                num1 = num2 * quotient;  // Multiplicando para garantir uma divisão exata
            }
            currentAnswer = eval(`${num1} ${operator} ${num2}`);
            break;

        case 9:
            // Nível 9: Operações com três números (soma e subtração apenas, permitindo resultado negativo)
            num1 = Math.floor(Math.random() * 11);  // Número 1 aleatório entre 0 e 10
            num2 = Math.floor(Math.random() * 11);  // Número 2 aleatório entre 0 e 10
            num3 = Math.floor(Math.random() * 11);  // Número 3 aleatório entre 0 e 10
            operator = Math.random() > 0.5 ? '+' : '-';  // Escolha aleatória entre '+' e '-'
            operator2 = Math.random() > 0.5 ? '+' : '-';  // Segundo operador aleatório entre '+' e '-'
            currentAnswer = eval(`${num1} ${operator} ${num2} ${operator2} ${num3}`);  // Calcula a resposta correta
            break;

        case 10:
            // Nível 9: Operações com três números e quatro operadores
            num1 = Math.floor(Math.random() * 11);  // Número 1 aleatório entre 0 e 10
            num2 = Math.floor(Math.random() * 11);  // Número 2 aleatório entre 0 e 10
            num3 = Math.floor(Math.random() * 11);  // Número 3 aleatório entre 0 e 10
            operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];  // Operador aleatório
            operator2 = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];  // Segundo operador aleatório
            // Garantir que a divisão resulte em número inteiro
            if (operator === '/' && num2 !== 0) {
                let quotient = Math.floor(Math.random() * 10) + 1;  // Quociente aleatório
                num1 = num2 * quotient;  // Multiplicando para garantir uma divisão exata
            }
            if (operator2 === '/' && num3 !== 0) {
                let quotient = Math.floor(Math.random() * 10) + 1;  // Quociente aleatório
                num2 = num3 * quotient;  // Multiplicando para garantir uma divisão exata
            }
            currentAnswer = eval(`${num1} ${operator} ${num2} ${operator2} ${num3}`);  // Calcula a resposta correta
            break;
    }

    // Exibir a pergunta no formato correto, substituindo '*' por '×' e '/' por '÷'
    const displayOperator1 = operator === '*' ? '×' : operator === '/' ? '÷' : operator;
    const displayOperator2 = operator2 ? (operator2 === '*' ? '×' : operator2 === '/' ? '÷' : operator2) : '';
    const questionText = operator2 ? `${num1} ${displayOperator1} ${num2} ${displayOperator2} ${num3} = ?` : `${num1} ${displayOperator1} ${num2} = ?`;
    document.getElementById('question').textContent = questionText;  // Exibir a pergunta na tela
}

// Verifica a resposta do jogo de operações
function checkAnswer() {
    if (currentGame !== 'operation') return; 

    const playerAnswer = document.getElementById('answer').value.trim();

    if (playerAnswer === '' || isNaN(playerAnswer)) {
        document.getElementById('feedback').textContent = "Espaço vazio ou valor inválido!";
        return;
    }

    if (parseFloat(playerAnswer) === currentAnswer) {
        document.getElementById('feedback').innerHTML = '<span style="color: green;">Correto!✅</span>';
        score += 10;
    } else {
        document.getElementById('feedback').innerHTML = `<span style="color: red;">Errado!❌</span><br>A resposta correta era ${currentAnswer}.`;
        loseLife();  // Chama a função para perder uma vida
    }

    // Atualiza os dados na tela
    document.getElementById('score').textContent = `Pontuação: ${score}`;
    if (score % 100 === 0 && score !== 0) {
        level++;
        document.getElementById('level').textContent = `Nível: ${level}`;
    }

    // Verifica se ainda há vidas antes de gerar uma nova pergunta
    if (lives > 0 ) {
        generateQuestion();  // Gera a próxima pergunta
    }
    document.getElementById('answer').value = '';  // Limpa o campo de resposta para a próxima pergunta
}

// Função para remover uma vida e verificar o fim do jogo
function loseLife() {
    lives--;  // Diminui o número de vidas
    let lifeString = 'Vidas: ' + '➕'.repeat(lives);  // Atualiza o texto de vidas
    document.getElementById('lives').textContent = lifeString;

    if (lives === 0) {
        gameOver();  // Chama a função de fim de jogo se as vidas acabarem
    }
}

// Função para exibir o GAME OVER
function gameOver() {
    document.getElementById('question').innerHTML = '<span style="color: red;">GAME OVER</span>';  // Exibe "GAME OVER" em vermelho
    document.getElementById('feedback').textContent = '';  // Limpa o feedback anterior
    document.getElementById('answer').disabled = true;  // Desabilita a entrada de respostas
}

// Event listeners para o envio da resposta ao pressionar Enter ou clicar no botão
document.getElementById('submit-answer').addEventListener('click', checkAnswer);
document.getElementById('answer').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        checkAnswer();
    }
});
