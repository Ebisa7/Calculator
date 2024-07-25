let currentOperation = null;
let currentValue = '';
let resultDisplayed = false;

document.addEventListener('DOMContentLoaded', () => {
    const darkMode = window.Telegram.WebApp.themeParams.isDark;
    document.body.classList.toggle('dark-mode', darkMode);
    document.body.classList.toggle('light-mode', !darkMode);
    document.getElementById('dark-mode-toggle').checked = darkMode;

    window.Telegram.WebApp.onEvent('themeChanged', (theme) => {
        document.body.classList.toggle('dark-mode', theme.isDark);
        document.body.classList.toggle('light-mode', !theme.isDark);
        document.getElementById('dark-mode-toggle').checked = theme.isDark;
    });

    window.Telegram.WebApp.onEvent('settingsButtonClicked', () => {
        document.getElementById('settings-popup').classList.toggle('hidden');
    });

    document.getElementById('dark-mode-toggle').addEventListener('change', (e) => {
        document.body.classList.toggle('dark-mode', e.target.checked);
        document.body.classList.toggle('light-mode', !e.target.checked);
        window.Telegram.WebApp.themeParams.isDark = e.target.checked;
    });
});

function updateDisplay(value) {
    const display = document.getElementById('display');
    display.textContent = value;
}

function clearDisplay() {
    currentValue = '';
    currentOperation = null;
    resultDisplayed = false;
    updateDisplay('0');
}

function clearAll() {
    currentValue = '';
    currentOperation = null;
    resultDisplayed = false;
    updateDisplay('0');
}

function appendNumber(number) {
    if (resultDisplayed) {
        currentValue = number;
        resultDisplayed = false;
    } else {
        currentValue += number;
    }
    updateDisplay(currentValue || '0');
}

function appendDecimal() {
    if (!currentValue.includes('.')) {
        currentValue += '.';
        updateDisplay(currentValue);
    }
}

function appendSymbol(symbol) {
    if (resultDisplayed) {
        currentValue = symbol;
        resultDisplayed = false;
    } else {
        currentValue += symbol;
    }
    updateDisplay(currentValue || '0');
}

function setOperation(operation) {
    if (currentOperation && !resultDisplayed) {
        calculate();
    }
    currentOperation = operation;
    resultDisplayed = false;
    currentValue += ` ${operation} `;
    updateDisplay(currentValue);
}

function calculate() {
    try {
        const result = eval(currentValue.replace('×', '*').replace('÷', '/'));
        updateDisplay(result);
        currentValue = result.toString();
        resultDisplayed = true;
    } catch {
        updateDisplay('Error');
        currentValue = '';
    }
}

function deleteLast() {
    if (resultDisplayed) {
        clearDisplay();
    } else {
        currentValue = currentValue.slice(0, -1);
        updateDisplay(currentValue || '0');
    }
      }
                                       
