// Currency Exchanger Functionality
async function fetchCurrencies() {
    const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await res.json();
    const currencies = Object.keys(data.rates);
    const fromSelect = document.getElementById('from-currency');
    const toSelect = document.getElementById('to-currency');

    currencies.forEach(currency => {
        const option1 = document.createElement('option');
        const option2 = document.createElement('option');
        option1.value = option2.value = currency;
        option1.text = option2.text = currency;

        fromSelect.appendChild(option1);
        toSelect.appendChild(option2);
    });
}

async function convertMoney() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;

    if (isNaN(amount) || !fromCurrency || !toCurrency) {
        document.getElementById('exchange-result').textContent = 'Conversion Result: --';
        return;
    }

    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await res.json();
    const rate = data.rates[toCurrency];
    const result = (amount * rate).toFixed(2);

    document.getElementById('exchange-result').textContent = `Conversion Result: ${result} ${toCurrency}`;
}

// Calculator Functionality
let currentOperand = '';
let operator = '';

function appendNumber(num) {
    currentOperand += num;
    updateCalcDisplay();
}

function setOperator(op) {
    operator = op;
    currentOperand += ` ${op} `;
    updateCalcDisplay();
}

function calculateResult() {
    try {
        currentOperand = eval(currentOperand).toString();
    } catch {
        currentOperand = 'Error';
    }
    updateCalcDisplay();
}

function clearCalc() {
    currentOperand = '';
    updateCalcDisplay();
}

function applyFormula(type) {
    const num = parseFloat(currentOperand);
    if (isNaN(num)) return;

    switch (type) {
        case 'sqrt':
            currentOperand = Math.sqrt(num).toString();
            break;
        case 'percent':
            currentOperand = (num / 100).toString();
            break;
        case 'square':
            currentOperand = Math.pow(num, 2).toString();
            break;
    }
    updateCalcDisplay();
}

function updateCalcDisplay() {
    document.getElementById('calc-display').textContent = currentOperand || '0';
}

// Initialize
fetchCurrencies();
