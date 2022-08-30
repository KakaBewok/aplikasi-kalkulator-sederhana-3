// INISIALISASI AWAL
const calculator = {
  displayNumber: "0",
  operator: null,
  firstNumber: null,
  waitingForSecondNumber: false,
};

// FUNGSI UPDATE
function updateDisplay() {
  document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

// FUNGSI CLEAR
function clearCalculator() {
  calculator.displayNumber = "0";
  calculator.operator = null;
  calculator.firstNumber = null;
  calculator.waitingForSecondNumber = false;
}

// FUNGSI MEMASUKAN ANGKA KE DISPLAY
function inputDigit(digit) {
  if (calculator.displayNumber === "0") {
    calculator.displayNumber = digit;
  } else {
    calculator.displayNumber += digit;
  }
}

// FUNGSI INISIALISASI NILAI SEMUA BUTTON DAN CLEAR
const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
  button.addEventListener("click", function (event) {
    // mendapatkan objek elemen yang diklik
    const target = event.target;

    if (target.classList.contains("clear")) {
      clearCalculator();
      updateDisplay();
      return;
    }

    if (target.classList.contains("negative")) {
      inverseNumber();
      updateDisplay();
      return;
    }

    if (target.classList.contains("equals")) {
      performCalculation();
      updateDisplay();
      return;
    }

    if (target.classList.contains("operator")) {
      handleOperator(target.innerText);
      return;
    }

    inputDigit(target.innerText);
    updateDisplay();
  });
}

// FUNGSI TOMBOL NEGATIVE
function inverseNumber() {
  if (calculator.displayNumber === "0") {
    return;
  }
  calculator.displayNumber = calculator.displayNumber * -1;
}

// FUNGSI OPERATOR
function handleOperator(operator) {
  if (!calculator.waitingForSecondNumber) {
    calculator.operator = operator;
    calculator.waitingForSecondNumber = true;
    calculator.firstNumber = calculator.displayNumber;

    // mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
    calculator.displayNumber = "0";
  } else {
    alert("Operator sudah ditetapkan");
  }
}

// FUNGSI SAMA DENGAN
function performCalculation() {
  if (calculator.firstNumber == null || calculator.operator == null) {
    alert("Anda belum menetapkan operator");
    return;
  }

  let result = 0;
  if (calculator.operator === "+") {
    result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
  } else {
    result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
  }

  // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
  const history = {
    firstNumber: calculator.firstNumber,
    secondNumber: calculator.displayNumber,
    operator: calculator.operator,
    result: result,
  };
  putHistory(history);
  calculator.displayNumber = result;
  renderHistory();
}
