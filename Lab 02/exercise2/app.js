var comparer = require('./comparer');
var calculator = require('./calculator');

const doTheMath = (num1, num2) => {
    console.log('comparing two numbers:', num1, ',', num2);

    var equal = comparer.AreNumbersEqual(num1, num2);

    if (equal) {
        console.log('numbers are equal');
        console.log('adding two numbers');
        console.log(calculator.Add(num1, num2));
    }
    else {
        console.log('numbers are not equal');
        console.log('subtracting two numbers');
        console.log(calculator.Subtract(num1, num2));
    }
}

doTheMath(5, 10);
doTheMath(5, 5);