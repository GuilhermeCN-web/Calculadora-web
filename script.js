// Variáveis para armazenar o total em execução e o buffer de entrada
let runningTotal = 0; // Guarda o resultado das operações
let buffer = "0"; // Armazena os números digitados
let previousOperator; // Guarda o último operador usado

// Seleciona a tela onde os números e resultados serão exibidos
const screen = document.querySelector('.screen');

// Função principal para lidar com cliques nos botões
function buttonClick(value) {
    if (isNaN(value)) { // Se não for um número, trata como símbolo (operador ou comando)
        handleSymbol(value);
    } else { // Se for um número, adiciona ao buffer
        handleNumber(value);
    }
    screen.innerText = buffer; // Atualiza a tela com o novo buffer
}

// Função para tratar símbolos e operadores
function handleSymbol(symbol) {
    switch (symbol) {
        case 'C': // Limpa a tela e reseta valores
            buffer = '0';
            runningTotal = 0;
            previousOperator = null;
            break;
        case '=': // Calcula o resultado se houver um operador pendente
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←': // Apaga o último caractere do buffer
            if (buffer.length === 1) {
                buffer = "0"; // Se houver apenas um caractere, reseta para "0"
            } else {
                buffer = buffer.substring(0, buffer.length - 1); // Remove o último caractere
            }
            break;
        case '+':
        case '-':
        case 'x':
        case '÷':
            handleMath(symbol); // Chama a função para lidar com operações matemáticas
            break;
    }
}

// Função para lidar com operações matemáticas
function handleMath(symbol) {
    if (buffer === '0') { // Se o buffer estiver vazio, ignora
        return;
    }

    const intBuffer = parseInt(buffer); // Converte o buffer para número inteiro
    
    if (runningTotal === 0) { // Se for a primeira operação, armazena o número no total
        runningTotal = intBuffer;
    } else { // Caso contrário, realiza a operação com o número armazenado
        flushOperation(intBuffer);
    }
    previousOperator = symbol; // Guarda o operador atual para a próxima operação
    buffer = '0'; // Reseta o buffer para entrada do próximo número
}

// Função que executa a operação matemática pendente
function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer;
    } else if (previousOperator === 'x') {
        runningTotal *= intBuffer;
    } else if (previousOperator === '÷') {
        runningTotal /= intBuffer;
    }
}

// Função para tratar entrada de números
function handleNumber(numberString) {
    if (buffer === "0") {
        buffer = numberString; // Substitui o "0" inicial pelo número digitado
    } else {
        buffer += numberString; // Adiciona o número ao buffer
    }
}

// Função de inicialização da calculadora
function init() {
    document.querySelectorAll('.calc-button').forEach(button => {
        button.addEventListener('click', function(event) {
            buttonClick(event.target.innerText); // Captura o valor do botão clicado
        });
    });
}

// Chama a função de inicialização
init();
