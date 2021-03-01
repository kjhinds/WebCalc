const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let operations = {
    '+': (a,b) => a+b,
    '-': (a,b) => a-b,
    '*': (a,b) => a*b,
    '/': (a,b) => a/b,
}

let value1 = null;
let value2 = null;
let operator = null;

buttons.forEach(button => {
    button.addEventListener('click', buttonClicked);
});

function buttonClicked() {
    if (value2 != null && this.innerText != '=') {
        display.innerText = '0';
        value2 = null;
    }
    if (this.innerText == 'C') {
        display.innerText = '0';
        value1 = null;
        value2 = null;
        operator = null;
    } 
    else if (this.innerText == 'CE') {
        display.innerText = '0';
    } 
    else if (this.innerText == 'Del' && display.innerText.length > 0) {
        display.innerText = display.innerText.slice(0, display.innerText.length-1);
    } 
    else if (this.innerText == '-/+') {
        if (display.innerText[0] == '-') {
            display.innerText = display.innerText.slice(1, display.innerText.length);
        } 
        else {
            display.innerText = '-' + display.innerText;
        }
    } 
    else if (this.innerText == '.') {
        if (!display.innerText.includes('.')) {
            display.innerText += this.innerText;
        }
    }
    else if (this.innerText == '0') {
        if (display.innerText.includes('.')) {
            display.innerText += this.innerText;
        }
        else if (display.innerText[0] == '-') {
            if (!(display.innerText[1] == '0')) {
                display.innerText += this.innerText;
            }
        } 
        else if (!(display.innerText[0] == '0')) {
            display.innerText += this.innerText;
        }
    }
    else if (this.className == 'number') {
        if (display.innerText.includes('.')) {
            display.innerText += this.innerText;
        }
        else if (display.innerText[0] == '-') {
            if (!(display.innerText[1] == '0')) {
                display.innerText += this.innerText;
            } 
            else {
                display.innerText = '-' + display.innerText.slice(2, display.innerText.length)
                                    + this.innerText;
            }
        }
        else if (display.innerText[0] == '0') {
            display.innerText = display.innerText.slice(1, display.innerText.length)
                                + this.innerText;
        } 
        else {
            display.innerText += this.innerText;
        }
    }
    else if (this.innerText == '=') {
        if (value1 != null) {
            if (value2 == null) {
                value2 = display.innerText;
            }
            display.innerText = operate(operator, value1, value2);
            value1 = display.innerText;
        }
    }
    else if (this.className == 'operator') {
        if (value1 == null) {
            value1 = display.innerText;
            operator = this.innerText;
            display.innerText = '0'
        } 
        else if (operator != null) {
            value2 = display.innerText;
            value1 = operate(operator, value1, value2);
            operator = this.innerText;
            display.innerText = value1;
        } 
    }
}

function operate(operator, a, b) {
    if (operator == '/' && b == '0') return 'Err: Div by 0';
    let operation = operations[operator];
    if (operation) {
        let result = operation(parseFloat(a),parseFloat(b)).toString();
        return result.length > 9 ? result.slice(0,10) : result;
    }
}

