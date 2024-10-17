// Variáveis específicas do jogo de equações
let equationLives = 5;
let equationLevel = 1;
let equationScore = 0;
let equationAnswer;  // Para armazenar o valor de x
let equation; // Para armazenar a equação gerada

// Função para iniciar o jogo de equações
function startEquationGame() {
    currentGame = 'equation';  // Define o jogo atual
    level = 1;
    score = 0;
    equationLives = 5;
    document.getElementById('level').textContent = `Nível: ${equationLevel}`;
    document.getElementById('score').textContent = `Pontuação: ${equationScore}`;
    document.getElementById('lives').textContent = `Vidas: ➕➕➕➕➕`;  // Exibe 3 vidas com "+"
    generateEquationQuestion();  // Gera a primeira equação
}

// Função para gerar equações baseadas no nível
function generateEquationQuestion() {
    if (currentGame !== 'equation') return;

    let num1, num2, operator, xPosition;

    switch (equationLevel) {
        case 1:
            // Números de 0 a 10, operadores '+' ou '-'
            num1 = Math.floor(Math.random() * 11);
            num2 = Math.floor(Math.random() * 11);
            operator = Math.random() > 0.5 ? '+' : '-';
            
            // Garante que a subtração não resulte em número negativo
            if (operator === '-' && num1 < num2) {
                [num1, num2] = [num2, num1];
            }
            
            // Define onde o valor de 'x' estará na equação
            xPosition = Math.floor(Math.random() * 3);
            
            if (xPosition === 0) {
                equation = `x ${operator} ${num2} = ${eval(`${num1} ${operator} ${num2}`)}`;
                equationAnswer = num1;
            } else if (xPosition === 1) {
                equation = `${num1} ${operator} x = ${eval(`${num1} ${operator} ${num2}`)}`;
                equationAnswer = num2;
            } else {
                equation = `${num1} ${operator} ${num2} = x`;
                equationAnswer = eval(`${num1} ${operator} ${num2}`);
            }
            break;

        case 2:
            // Números de 0 a 10, operador '*'
            num1 = Math.floor(Math.random() * 11);
            num2 = Math.floor(Math.random() * 11);
            operator = '*';

            xPosition = Math.floor(Math.random() * 3);
            
            if (xPosition === 0) {
                equation = `x ${operator} ${num2} = ${num1 * num2}`;
                equationAnswer = num1;
            } else if (xPosition === 1) {
                equation = `${num1} ${operator} x = ${num1 * num2}`;
                equationAnswer = num2;
            } else {
                equation = `${num1} ${operator} ${num2} = x`;
                equationAnswer = num1 * num2;
            }
            break;

        case 3:
            // Números de 1 a 100, operador '/'
            num2 = Math.floor(Math.random() * 10) + 1; // Denominador de 1 a 10 (nunca zero)
            let quotient = Math.floor(Math.random() * 10) + 1; // Quociente de 1 a 10
            num1 = num2 * quotient;  // Multiplicando para garantir que a divisão será exata
            operator = '/';
            
            xPosition = Math.floor(Math.random() * 3);
            
            if (xPosition === 0) {
                equation = `x ${operator} ${num2} = ${quotient}`;
                equationAnswer = num1;
            } else if (xPosition === 1) {
                equation = `${num1} ${operator} x = ${quotient}`;
                equationAnswer = num2;
            } else {
                equation = `${num1} ${operator} ${num2} = x`;
                equationAnswer = quotient;
            }
            break;            

        case 4:
            // Números de 0 a 10, operadores '+', '-', '*', '/'
            num1 = Math.floor(Math.random() * 11);  
            num2 = Math.floor(Math.random() * 11);
            operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
            
            // Garantir que a subtração não resulte em número negativo
            if (operator === '-' && num1 < num2) {
                [num1, num2] = [num2, num1];
            }
            
            // Garantir que a divisão seja exata e num2 não seja zero
            if (operator === '/') {
                while (num2 === 0) {
                    num2 = Math.floor(Math.random() * 11); // Recalcula se num2 for 0
                }
                quotient = Math.floor(Math.random() * 10) + 1;
                num1 = num2 * quotient;
            }
        
            xPosition = Math.floor(Math.random() * 3);
            
            if (xPosition === 0) {
                equation = `x ${operator} ${num2} = ${eval(`${num1} ${operator} ${num2}`)}`;
                equationAnswer = num1;
            } else if (xPosition === 1) {
                equation = `${num1} ${operator} x = ${eval(`${num1} ${operator} ${num2}`)}`;
                equationAnswer = num2;
            } else {
                equation = `${num1} ${operator} ${num2} = x`;
                equationAnswer = eval(`${num1} ${operator} ${num2}`);
            }
            break;            

        case 5:
            // Números de -10 a 10, operadores '+', '-', '*', '/'
            num1 = Math.floor(Math.random() * 21) - 10;
            num2 = Math.floor(Math.random() * 21) - 10;
            operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
        
            // Garantir que a subtração não resulte em número negativo
            if (operator === '-' && num1 < num2) {
                [num1, num2] = [num2, num1];
            }
            
            // Garantir que a divisão seja exata e num2 não seja zero
            if (operator === '/') {
                while (num2 === 0) {
                    num2 = Math.floor(Math.random() * 21) - 10; // Recalcula se num2 for 0
                }
                quotient = Math.floor(Math.random() * 10) + 1;
                num1 = num2 * quotient;
            }
        
            xPosition = Math.floor(Math.random() * 3);
        
            if (xPosition === 0) {
                equation = `x ${operator} ${num2} = ${eval(`${num1} ${operator} ${num2}`)}`;
                equationAnswer = num1;
            } else if (xPosition === 1) {
                equation = `${num1} ${operator} x = ${eval(`${num1} ${operator} ${num2}`)}`;
                equationAnswer = num2;
            } else {
                equation = `${num1} ${operator} ${num2} = x`;
                equationAnswer = eval(`${num1} ${operator} ${num2}`);
            }
            break;            

        case 6:
            // Números de -100 a 100, operadores '+', '-', '*', '/'
            num1 = Math.floor(Math.random() * 201) - 100;
            num2 = Math.floor(Math.random() * 201) - 100;
            operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
        
            // Garantir que a subtração não resulte em número negativo
            if (operator === '-' && num1 < num2) {
                [num1, num2] = [num2, num1];
            }
        
            // Garantir que a divisão seja exata e num2 não seja zero
            if (operator === '/') {
                while (num2 === 0) {
                    num2 = Math.floor(Math.random() * 201) - 100; // Recalcula se num2 for 0
                }
                quotient = Math.floor(Math.random() * 100) + 1;
                num1 = num2 * quotient;
            }
        
            xPosition = Math.floor(Math.random() * 3);
            
            if (xPosition === 0) {
                equation = `x ${operator} ${num2} = ${eval(`${num1} ${operator} ${num2}`)}`;
                equationAnswer = num1;
            } else if (xPosition === 1) {
                equation = `${num1} ${operator} x = ${eval(`${num1} ${operator} ${num2}`)}`;
                equationAnswer = num2;
            } else {
                equation = `${num1} ${operator} ${num2} = x`;
                equationAnswer = eval(`${num1} ${operator} ${num2}`);
            }
            break;            
    }

    document.getElementById('question').innerHTML = `${equation}`;
}

// Verifica a resposta do jogo de equações
function checkEquationAnswer() {
    if (currentGame !== 'equation') return;

    const playerAnswer = document.getElementById('answer').value.trim();

    if (playerAnswer === '' || isNaN(playerAnswer)) {
        document.getElementById('feedback').textContent = "Espaço vazio ou valor inválido!";
        return;
    }

    if (parseFloat(playerAnswer) === equationAnswer) {
        document.getElementById('feedback').innerHTML = '<span style="color: green;">Correto!✅</span>';
        equationScore += 10;
    } else {
        document.getElementById('feedback').innerHTML = `<span style="color: red;">Errado!❌</span><br>A resposta correta era ${equationAnswer}.`;
        loseLifeEquation();
    }

    document.getElementById('score').textContent = `Pontuação: ${equationScore}`;
    if (equationScore % 100 === 0 && equationScore !== 0) {
        equationLevel++;
        document.getElementById('level').textContent = `Nível: ${equationLevel}`;
    }

        // Verifica se ainda há vidas antes de gerar uma nova pergunta
        if (equationLives > 0 ) {
            generateEquationQuestion();  // Gera a próxima pergunta
        }
        document.getElementById('answer').value = '';  // Limpa o campo de resposta para a próxima pergunta
    }
    
    // Função para remover uma vida e verificar o fim do jogo
    function loseLifeEquation() {
        equationLives--;  // Diminui o número de vidas
        let lifeString = 'Vidas: ' + '➕'.repeat(equationLives);  // Atualiza o texto de vidas
        document.getElementById('lives').textContent = lifeString;
    
        if (equationLives === 0) {
            gameOverEquation();  // Chama a função de fim de jogo se as vidas acabarem
        }
    }
    
    // Função para exibir o GAME OVER
    function gameOverEquation() {
        document.getElementById('question').innerHTML = '<span style="color: red;">GAME OVER</span>';  // Exibe "GAME OVER" em vermelho
        document.getElementById('feedback').textContent = '';  // Limpa o feedback anterior
        document.getElementById('answer').disabled = true;  // Desabilita a entrada de respostas
    }

// Event listeners para o jogo de equações
document.getElementById('submit-answer').addEventListener('click', checkEquationAnswer);
document.getElementById('answer').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        checkEquationAnswer();
    }
});