const calculator = document.querySelector(".calculator");
const keys = calculator.querySelectorAll(".btn");
let lastkeyOperator = false;
let digitCount = 0;
let is_Result = false;
let expression = "";
const display = calculator.querySelector(".display");

keys.forEach((keys) => {
  keys.addEventListener("click", (e) => {
    if (e.target.matches("button")) {
      const key = e.target;
      const action = key.dataset.action;
      const displayText = display.textContent;
      const keyText = key.textContent;

      if (!action) {
        if (digitCount < 6) {
          if (displayText === "0" || is_Result === true) {
            display.textContent = keyText;
            expression = keyText;
          } else {
            display.textContent += keyText;
            expression += keyText;
          }
          is_Result = false;
          lastkeyOperator = false;
          digitCount++;
        }
      }

      if (
        action === "Divide" ||
        action === "Multiply" ||
        action === "Subtract" ||
        action === "Addition"
      ) {
        if (lastkeyOperator) {
          display.textContent = displayText.slice(0, -1) + keyText;
          expression = expression.slice(0, -1) + keyText;
        } else {
          display.textContent += keyText;
          expression += keyText;
        }
        lastkeyOperator = true;
        digitCount = 0;
      }

      if (action === "Decimal") {
        display.textContent += keyText;
        expression += keyText;
      }

      if (action === "Result") {
        const evaluatedExpression = calculate_Power(expression);
        const result = evaluateExpression(evaluatedExpression);
        expression = result.toString();
        display.textContent = result;
        is_Result = true;
      }

      if (action === "Clear") {
        display.textContent = "0";
        lastkeyOperator = false;
        digitCount = 0;
        expression = "";
      }

      if (action === "Paranthesis") {
        const paranthesis = add_Paranthesis();
        if (displayText === "0") {
          display.textContent = paranthesis;
          expression = paranthesis;
        } else {
          display.textContent += paranthesis;
          expression += paranthesis;
        }
      }

      if (action === "Power") {
        display.textContent += keyText;
        expression += keyText;
      }
    }
  });
});

function evaluateExpression(exp) {
  console.log(exp);
  try {
    let result = new Function("return " + exp)();
    return Math.floor(result * 100) / 100;
  } catch (e) {
    return "Error";
  }
}

function add_Paranthesis() {
  let openCount = (display.textContent.match(/\(/g) || []).length;
  let closeCount = (display.textContent.match(/\)/g) || []).length;

  let lastChar = display.textContent[display.textContent.length - 1];

  if (openCount === closeCount || /[\+\-\*\/\(]$/.test(lastChar)) {
    return "(";
  } else if (openCount > closeCount || /[0-9\)]$/.test(lastChar)) {
    return ")";
  } else {
    return "";
  }
}

function calculate_Power(expression) {
  //Logic for power caculation
  const PowerRegex = /(\([^()]+\)|-?\d+\.?\d*)\^(\([^()]+\)|-?\d+\.?\d*)/;

  while (PowerRegex.test(expression)) {
    expression = expression.replace(PowerRegex, (match, base, exponent) => {
      let evaluatedBase = base;
      if (base.startsWith("(") && base.endsWith(")")) {
        evaluatedBase = evaluateExpression(base.slice(1, -1));
      }
      let evaluatedExponent = exponent;
      if (exponent.startsWith("(") && exponent.endsWith(")")) {
        evaluatedExponent = evaluateExpression(exponent.slice(1, -1));
      }
      return Math.pow(
        parseFloat(evaluatedBase),
        parseFloat(evaluatedExponent)
      );
    });
  }

  return expression;
}
