const display = document.getElementById('display');
const buttons = document.getElementById('buttons');

let operations = {
    '+': (a,b) => a+b,
    '-': (a,b) => a-b,
    '*': (a,b) => a*b,
    '/': (a,b) => a/b,
}

function operate(operator, a, b) {
    let operation = operations[operator];
    if (operation) return operation(a,b);
}