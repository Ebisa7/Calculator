document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let firstOperand = '';

    const updateDisplay = (value) => {
        display.textContent = value || '0';
    };

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const value = e.target.dataset.value;

            if (value === 'C') {
                currentInput = '';
                operator = '';
                firstOperand = '';
                updateDisplay();
            } else if (value === '=') {
                if (firstOperand && operator && currentInput) {
                    try {
                        const result = eval(`${firstOperand} ${operator} ${currentInput}`);
                        updateDisplay(result);
                        currentInput = result;
                        operator = '';
                        firstOperand = '';
                    } catch {
                        updateDisplay('Error');
                    }
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                operator = value;
                firstOperand = currentInput;
                currentInput = '';
            } else {
                currentInput += value;
                updateDisplay(currentInput);
            }
        });
    });
});
                    
