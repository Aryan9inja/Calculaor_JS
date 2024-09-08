const calculator = document.querySelector(".calculator");
const keys = calculator.querySelectorAll(".btn");
let lastkeyOperator = false;
let digitCount = 0;
let is_Result = false;
let expression = "";

keys.forEach((keys) => {
  keys.addEventListener("click", (e) => {
    if (e.target.matches("button")) {
      const key = e.target;
      const action = key.dataset.action;
      const display = calculator.querySelector(".display");
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
        const result = evaluateExpression(expression);
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
    }
  });
});

function evaluateExpression(exp) {
  try {
    let result = new Function("return " + exp)();
    return Math.floor(result * 100) / 100;
  } catch (e) {
    return "Error";
  }
}
