// Состояние калькулятора
let currentValue = '0';
let previousValue = '';
let operation = null;
let resetScreen = false;

// Инициализация после загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.field');
    
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', () => handleButton(button.textContent, display));
    });
});

function handleButton(value, display) {
    if (value === 'C') {
        clear();
    } else if (value === '+/-') {
        toggleSign();
    } else if (value === '%') {
        percentage();
    } else if (value === '÷' || value === '×' || value === '-' || value === '+') {
        setOperation(value);
    } else if (value === '=') {
        calculate();
    } else if (value === ',') {
        addDecimal();
    } else {
        addNumber(value);
    }
    
    updateDisplay(display);
}

function addNumber(num) {
    if (resetScreen) {
        currentValue = '';
        resetScreen = false;
    }
    
    if (currentValue === '0' && num !== '0') {
        currentValue = num;
    } else if (currentValue === '0' && num === '0') {
        return;
    } else {
        currentValue += num;
    }
}

function addDecimal() {
    if (resetScreen) {
        currentValue = '0';
        resetScreen = false;
    }
    
    if (!currentValue.includes('.')) {
        currentValue += '.';
    }
}

function setOperation(op) {
    if (operation !== null) {
        calculate();
    }
    
    previousValue = currentValue;
    operation = op;
    resetScreen = true;
}

function calculate() {
    if (operation === null || resetScreen) return;
    
    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    
    switch(operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            result = prev / current;
            break;
        default:
            return;
    }
    
    currentValue = formatResult(result);
    operation = null;
    resetScreen = true;
}

function formatResult(num) {
    // Обработка деления на ноль
    if (num === Infinity || isNaN(num)) {
        return 'Error';
    }
    
    // Ограничиваем количество знаков после запятой
    return Number.isInteger(num) ? num.toString() : num.toFixed(8).replace(/\.?0+$/, '');
}

function clear() {
    currentValue = '0';
    previousValue = '';
    operation = null;
    resetScreen = false;
}

function toggleSign() {
    currentValue = (parseFloat(currentValue) * -1).toString();
}

function percentage() {
    currentValue = (parseFloat(currentValue) / 100).toString();
}

function updateDisplay(display) {
    display.textContent = currentValue;
}