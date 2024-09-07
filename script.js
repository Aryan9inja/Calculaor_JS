const calculator = document.querySelector(".calculator");
const keys = calculator.querySelectorAll(".btn");
let lastkeyOperator = false;
let digitCount = 0;

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
          if (displayText === "0") {
            display.textContent = keyText;
          } else {
            display.textContent += keyText;
          }
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
        } else {
          display.textContent += keyText;
        }
        lastkeyOperator = true;
        digitCount = 0;
      }

      if (action === "Decimal") {
        display.textContent += keyText;
      }

      if (action === "Result") {
        const result = Math.floor(eval(displayText) * 100) / 100;
        display.textContent = result;
      }

      if (action === "Clear") {
        display.textContent = "0";
        lastkeyOperator = false;
        digitCount = 0;
      }
    }
  });
});
