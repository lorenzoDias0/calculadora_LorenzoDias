let display = document.getElementById('telinha');
let currentInput = '0';
let resetDisplay = false;

function updateDisplay() {
    display.textContent = currentInput;
}

function mostrarNaTelinha(valor) {
    if (currentInput === '0' && valor !== '.' && !'()'.includes(valor)) {
        currentInput = valor;
    } else {
        if (resetDisplay) {
            currentInput = valor;
            resetDisplay = false;
        } else {
            currentInput += valor;
        }
    }
    updateDisplay();
}

function apagarTudo() {
    currentInput = '0';
    updateDisplay();
}

function apagarUltimo() {
    if (currentInput.length === 1) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

function calcular() {
    try {
        let expression = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
        
        if (!areParenthesesBalanced(expression)) {
            throw new Error('Parênteses desbalanceados');
        }
        
        let result = eval(expression);

        if (Number.isInteger(result)) {
            currentInput = result.toString();
        } else {
            currentInput = parseFloat(result.toFixed(10)).toString();
        }
    } catch (error) {
        currentInput = 'Erro';
    }
    resetDisplay = true;
    updateDisplay();
}

function areParenthesesBalanced(expr) {//função para verificar se os parenteses estao sendo abertos e fechados corretamente
    let stack = [];
    for (let char of expr) {
        if (char === '(') {
            stack.push(char);
        } else if (char === ')') {
            if (stack.length === 0) return false;
            stack.pop();
        }
    }
    return stack.length === 0;
}

updateDisplay();