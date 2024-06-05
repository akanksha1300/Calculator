document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let previousInput = '';
    let operator = '';

    document.querySelectorAll('.buttons input').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.value;
            if (button.hasAttribute('data-number')) {
                handleNumber(value);
            } else if (button.hasAttribute('data-operation')) {
                handleOperator(value);
            } else if (button.id === 'clear') {
                clearDisplay();
            } else if (button.id === 'delete') {
                deleteLast();
            } else if (button.id === 'equals') {
                calculate();
            }
        });
    });

    function handleNumber(number) {
        currentInput += number;
        updateDisplay(currentInput);
    }

    function handleOperator(op) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            calculate();
        }
        operator = op;
        previousInput = currentInput;
        currentInput = '';
    }

    function calculate() {
        let computation;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            case '%':
                computation = prev % current;
                break;
            default:
                return;
        }
        currentInput = computation.toString();
        operator = '';
        previousInput = '';
        updateDisplay(currentInput);
    }

    function clearDisplay() {
        currentInput = '';
        previousInput = '';
        operator = '';
        updateDisplay('');
    }

    function deleteLast() {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput);
    }

    function updateDisplay(value) {
        display.value = value;
    }
});