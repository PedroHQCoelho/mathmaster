document.addEventListener("DOMContentLoaded", function () {
    // Referências para o switch de tema e elementos do DOM
    const themeSwitch = document.getElementById("theme-switch");
    const body = document.body;
    const themeIcon = document.getElementById("theme-icon");

    // Variável global para armazenar o jogo atual
    window.currentGame = '';

    // Referência ao título do jogo
    const gameTitle = document.getElementById("game-title");

    // Alternar entre Modo Claro e Modo Escuro
    themeSwitch.addEventListener("change", function () {
        if (themeSwitch.checked) {
            body.classList.remove("light-mode");
            body.classList.add("dark-mode");
            themeIcon.src = "img/dark_mode.png"; // Ícone para modo escuro
        } else {
            body.classList.remove("dark-mode");
            body.classList.add("light-mode");
            themeIcon.src = "img/light_mode.png"; // Ícone para modo claro
        }
    });

    // Selecionar um jogo
    const gameButtons = document.querySelectorAll(".game-select");
    const selectionScreen = document.getElementById("selection-screen");
    const gameContainer = document.getElementById("game-container");

    // Armazenar scripts carregados dinamicamente
    const loadedScripts = {};

    gameButtons.forEach(button => {
        button.addEventListener("click", function () {
            const selectedGame = button.getAttribute("data-game");
            currentGame = selectedGame;

            // Reinicia o estado do jogo ao selecionar um novo jogo
            resetGameState();

            // Atualiza o título do jogo baseado na seleção
            updateGameTitle(selectedGame);

            // Exibe a tela do jogo e carrega o script correspondente
            selectionScreen.style.display = "none";
            gameContainer.style.display = "block";

            if (selectedGame === "operation") {
                startOperationGame(); // Inicia o jogo de operações básicas
            } else if (selectedGame === "fractions") {
                loadScript("fractions-game.js", "fractions", startFractionGame); // Inicia o jogo de frações
            } else if (selectedGame === "powers") {
                loadScript("powers-game.js", "powers", startPowerGame); // Inicia o jogo de potenciação
            } else if (selectedGame === "percentage") {
                loadScript("percentage-game.js", "percentage", startPercentageGame); // Inicia o jogo de porcentagem
            } else if (selectedGame === "equation") {
                loadScript("equation-game.js", "equation", startEquationGame); // Inicia o jogo de equações
            }
        });
    });

    // Função para carregar dinamicamente scripts
    function loadScript(scriptUrl, gameKey, callback) {
        if (!loadedScripts[gameKey]) {
            const script = document.createElement('script');
            script.src = scriptUrl;
            script.onload = function () {
                loadedScripts[gameKey] = true; // Marca o script como carregado
                callback(); // Inicia o jogo
            };
            script.onerror = function () {
                console.error(`Erro ao carregar o script: ${scriptUrl}`);
            };
            document.head.appendChild(script);
        } else {
            callback(); // Se já estiver carregado, apenas chama o callback
        }
    }

    // Botão de "Voltar" à tela de seleção
    const backButton = document.getElementById("back-button");
    backButton.addEventListener("click", function () {
        // Retorna à tela de seleção e reseta o estado do jogo
        selectionScreen.style.display = "block";
        gameContainer.style.display = "none";
        resetGameState(); // Limpa o estado do jogo atual
        clearGameScripts(); // Remove scripts dinâmicos carregados
    });

    // Função para resetar o estado do jogo
    function resetGameState() {
        // Limpa o campo de resposta e a interface do jogo
        document.getElementById('question').textContent = '';
        document.getElementById('feedback').textContent = '';
        document.getElementById('answer').value = '';
        document.getElementById('score').textContent = 'Pontuação: 0';
        document.getElementById('level').textContent = 'Nível: 1';
        gameTitle.style.display = 'none';
        document.getElementById('answer').disabled = false; // Garante que o campo de resposta esteja habilitado
        document.getElementById('answer').focus(); // Foca no campo de resposta
    }

    // Função para remover scripts dinâmicos carregados
    function clearGameScripts() {
        const gameScripts = document.getElementsByTagName('script');
        for (let i = gameScripts.length - 1; i >= 0; i--) {
            if (gameScripts[i].src.includes('game.js')) {
                gameScripts[i].parentNode.removeChild(gameScripts[i]); // Remove o script
            }
        }
    }

    // Função para atualizar o título com base no jogo selecionado
    function updateGameTitle(selectedGame) {
        let gameName = "";

        switch (selectedGame) {
            case "operation":
                gameName = "Jogo das Operações Básicas";
                break;
            case "fractions":
                gameName = "Jogo de Frações";
                break;
            case "powers":
                gameName = "Jogo de Potenciação";
                break;
            case "percentage":
                gameName = "Jogo de Porcentagem";
                break;
            case "equation":
                gameName = "Jogo de Equações";
                break;
        }

        gameTitle.textContent = gameName; // Atualiza o título exibido
        gameTitle.style.display = "block"; // Exibe o título
    }

    // Containers para GAME OVER e VITÓRIA
    const gameOverContainer = document.getElementById("game-over-container");
    const victoryContainer = document.getElementById("victory-container");

    // Variáveis de controle do jogo
    let vidas = 5;
    let maxNiveis = 10;
    let nivelAtual = 1;
    let score = 0;

    // Função para verificar vitória
    function checkVictory() {
        if (nivelAtual > maxNiveis) {
            gameContainer.style.display = "none"; // Esconde o container do jogo
            victoryContainer.style.display = "block"; // Exibe o container de vitória
        }
    }

    // Função para verificar GAME OVER
    function checkGameOver() {
        if (vidas <= 0) {
            gameContainer.style.display = "none"; // Esconde o container do jogo
            gameOverContainer.style.display = "block"; // Exibe o container de GAME OVER
        }
    }

    // Função para lidar com a resposta do jogador
    function handleAnswer(correct) {
        if (correct) {
            score += 10; // Incrementa a pontuação em 10
            checkVictory(); // Verifica se o jogador venceu
        } else {
            vidas--; // Diminui o número de vidas
            checkGameOver(); // Verifica se o jogador perdeu
        }
        updateLivesDisplay(); // Atualiza a exibição das vidas
    }

    // Função para reiniciar o jogo
    function resetGame() {
        nivelAtual = 1; // Reinicia o nível atual
        vidas = 5; // Reinicia o número de vidas
        score = 0; // Reinicia a pontuação
        gameOverContainer.style.display = "none"; // Esconde a tela de GAME OVER
        victoryContainer.style.display = "none"; // Esconde a tela de vitória
        gameContainer.style.display = "block"; // Exibe o container do jogo
        resetGameState(); // Limpa a interface e reinicia o estado
    }

    // Atualiza o display das vidas
    function updateLivesDisplay() {
        const livesElement = document.getElementById("lives");
        let vidasDisplay = "➕".repeat(vidas); // Exibe um "➕" para cada vida restante
        livesElement.textContent = `Vidas: ${vidasDisplay}`;
    }

    // Botões de reinício (após GAME OVER ou vitória)
    const restartGameOverButton = document.getElementById("restart-game-over");
    restartGameOverButton.addEventListener("click", function () {
        resetGame(); // Reinicia o jogo ao clicar no botão de reinício de GAME OVER
    });

    const restartVictoryButton = document.getElementById("restart-victory");
    restartVictoryButton.addEventListener("click", function () {
        resetGame(); // Reinicia o jogo ao clicar no botão de reinício de vitória
    });

    // Função de exemplo para verificação de resposta
    function onAnswerSubmit() {
        const respostaCorreta = true; // Simulação de resposta correta

        handleAnswer(respostaCorreta); // Processa a resposta
    }
       // Função para fechar o modal de tutorial
       window.closeTutorial = function () {
        const modal = document.getElementById("tutorialModal");
        modal.style.display = "none";
        };

        // Função para abrir o modal com o tutorial correto
        window.showTutorial = function (jogo) {
            const modal = document.getElementById("tutorialModal");
            const content = document.getElementById("tutorialContent");

            // Definindo o conteúdo do tutorial baseado no jogo
            switch (jogo) {
                case 'operacoes':
                    content.innerHTML = `
                        <h2>Tutorial - Jogo das Operações Básicas</h2>
                        <p>Jogo para fazer cálculo usando as 4 operações básicas.</p>
                        <p>Adição, subtração, multiplicação e divisão.</p>
                        <h3>Instruções:</h3>
                        <ul>
                            <li>Você verá uma expressão matemática no topo da tela.</li>
                            <li>Digite sua resposta no campo apropriado.</li>
                            <li>Pressione "Enter" ou clique no botão "Enviar" para enviar sua resposta.</li>
                            <li>Você receberá um feedback imediato se a resposta está correta ou não.</li>
                            <li>Se você errar, você vai perder 1 vida ➕.</li>
                            <li>Se não restar mais nenhuma vida ➕, GAME OVER.</li>
                            <li>Se acertar todos os desafios, VOCÊ GANHA.</li>
                        </ul>
                        <p>Boa sorte!</p>
                    `;
                    break;
                case 'fracoes':
                    content.innerHTML = `
                        <h2>Tutorial - Jogo de Frações</h2>
                        <p>Jogo para fazer cálculo de frações usando as 4 operações básicas.</p>
                        <p>Adição, subtração, multiplicação e divisão.</p>
                        <p>Você pode enviar a fração exata ou simplificada.</p>
                        <h3>Instruções:</h3>
                        <ul>
                            <li>Você verá uma expressão matemática no topo da tela.</li>
                            <li>Digite sua resposta no campo apropriado.</li>
                            <li>Pressione "Enter" ou clique no botão "Enviar" para enviar sua resposta.</li>
                            <li>Você receberá um feedback imediato se a resposta está correta ou não.</li>
                            <li>Se você errar, você vai perder 1 vida ➕.</li>
                            <li>Se não restar mais nenhuma vida ➕, GAME OVER.</li>
                            <li>Se acertar todos os desafios, VOCÊ GANHA.</li>
                        </ul>
                        <p>Boa sorte!</p>
                    `;
                    break;
                case 'potenciacao':
                    content.innerHTML = `
                        <h2>Tutorial - Jogo de Potenciação</h2>
                        <p>Jogo para fazer cálculo do resultado de um certo número elevado a uma certa potência.</p>
                        <p>Números elevados a 0 são sempre igual a 1 e qualquer número elevado a 1 é igual a ele mesmo.</p>
                        <h3>Instruções:</h3>
                        <ul>
                            <li>Você verá uma expressão matemática no topo da tela.</li>
                            <li>Digite sua resposta no campo apropriado.</li>
                            <li>Pressione "Enter" ou clique no botão "Enviar" para enviar sua resposta.</li>
                            <li>Você receberá um feedback imediato se a resposta está correta ou não.</li>
                            <li>Se você errar, você vai perder 1 vida ➕.</li>
                            <li>Se não restar mais nenhuma vida ➕, GAME OVER.</li>
                            <li>Se acertar todos os desafios, VOCÊ GANHA.</li>
                        </ul>
                        <p>Boa sorte!</p>
                    `;
                    break;
                case 'porcentagem':
                    content.innerHTML = `
                        <h2>Tutorial - Jogo de Porcentagem</h2>
                        <p>Jogo para fazer cálculo usando de porcentagem de um certo número.</p>
                        <p>Para calcular a porcentagem, multiplique o número pelo valor percentual e depois divida por 100. Por exemplo, 20% de 50 é (20 x 50) ÷ 100 = 10.</p>
                        <h3>Instruções:</h3>
                        <ul>
                            <li>Você verá uma expressão matemática no topo da tela.</li>
                            <li>Digite sua resposta no campo apropriado.</li>
                            <li>Pressione "Enter" ou clique no botão "Enviar" para enviar sua resposta.</li>
                            <li>Você receberá um feedback imediato se a resposta está correta ou não.</li>
                            <li>Se você errar, você vai perder 1 vida ➕.</li>
                            <li>Se não restar mais nenhuma vida ➕, GAME OVER.</li>
                            <li>Se acertar todos os desafios, VOCÊ GANHA.</li>
                        </ul>
                        <p>Boa sorte!</p>
                    `;
                    break;
                case 'equacoes':
                    content.innerHTML = `
                        <h2>Tutorial - Jogo de Equações</h2>
                        <p>Jogo para fazer cálculo para encontrar o valor de x usando as 4 operações básicas.</p>
                        <p>Para resolver uma equação, isole o x (ou a incógnita) movendo os outros números para o outro lado da equação. Lembre-se de inverter as operações: se o número está somando, passe subtraindo, e se está multiplicando, passe dividindo.</p>
                        <h3>Instruções:</h3>
                        <ul>
                            <li>Você verá uma expressão matemática no topo da tela.</li>
                            <li>Digite sua resposta no campo apropriado.</li>
                            <li>Pressione "Enter" ou clique no botão "Enviar" para enviar sua resposta.</li>
                            <li>Você receberá um feedback imediato se a resposta está correta ou não.</li>
                            <li>Se você errar, você vai perder 1 vida ➕.</li>
                            <li>Se não restar mais nenhuma vida ➕, GAME OVER.</li>
                            <li>Se acertar todos os desafios, VOCÊ GANHA.</li>
                        </ul>
                        <p>Boa sorte!</p>
                    `;
                    break;
                default:
                    content.innerHTML = "<h2>Tutorial</h2><p>Escolha um jogo para ver o tutorial.</p>";
                    break;
            }

            // Mostrar o modal
            modal.style.display = "block";
        };

        // Fechar o modal ao clicar fora da área de conteúdo
        window.onclick = function(event) {
            const modal = document.getElementById("tutorialModal");
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };
});