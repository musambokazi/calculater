
        let display = document.getElementById('display');
        let currentValue = '';
        let previousValue = '';
        let operation = null;

        function updateDisplay() {
            display.value = currentValue || '0'
        }

        function clearAll() {
            currentValue = ''
            previousValue = ''
            operation = null
            updateDisplay()
        }

        function deleteLast() {
            currentValue = currentValue.slice(0, -1)
            updateDisplay();
        }

        function appendNumber(num) {
            if (num === '.' && currentValue.includes('.')) return;
            currentValue += num;
            updateDisplay();
        }

        function setOperation(op) {
            if (currentValue === '') return;
            if (previousValue !== '') {
                calculate();
            }
            operation = op;
            previousValue = currentValue;
            currentValue = '';
        }

        function calculate() {
            if (!previousValue || !currentValue || !operation) return;
            let result;
            const prev = parseFloat(previousValue);
            const current = parseFloat(currentValue);

            switch(operation) {
            case '+': result = prev + current; break;
            case '−': result = prev - current; break;
            case '÷': result = prev / current; break;
            case '×': result = prev * current; break;
            default: return;
        }

            currentValue = result.toString()
            operation = null
            previousValue = ''
            updateDisplay()
        }

        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', () => {
                const text = button.textContent.trim();

                if (text === 'C') clearAll();
                else if (text === '←') deleteLast();
                else if (text === '=') calculate();
                else if (['+', '−', '÷', '×'].includes(text)) setOperation(text);
                else appendNumber(text);
            })
        })

        updateDisplay();
