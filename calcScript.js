const keyPad = document.querySelector(".key-pad");
const numbersBtns = document.querySelector(".btn-number");
const operationsBtns = document.querySelector(".btn-operation");
const resetBtns = document.querySelector(".btn-reset");
const deletesBtns = document.querySelector(".btn-delete");
const equalsBtns = document.querySelector(".btn-equal");
const switchLabels = document.querySelectorAll(".switch-label");
const preloader = document.querySelector(".preloader");
const switchLabelsArr = [...switchLabels];
const body = document.querySelector("body");
const sentenceEl = document.querySelector(".result");
let sentence = sentenceEl.textContent;

let className = "theme--1";
body.classList.add(className);
let lastChar;
let decemal = false;

// ---- ADD EventListener to toggle the project theme ----

switchLabelsArr.forEach((element) => {
  element.addEventListener("click", function (e) {
    body.classList.remove(className);
    className = `theme--${element.textContent}`;
    body.classList.add(className);
  });
});

function display(value) {
  sentence += value;
  sentenceEl.textContent = sentence;
}

function displayOperator(value) {
  if (!sentence || lastChar == value) return;

  decemal = false;
  if (isFinite(lastChar)) return display(value);

  removeLastChar();
  display(value);
}

function displayZero(value) {
  display(value);
}

function displayDot(value) {
  if (decemal) return;

  decemal = true;
  if (!sentence) return display("0.");
  if (isFinite(lastChar)) return display(value);
}

function removeLastChar() {
  if (sentence == "") return;
  sentence = sentence.slice(0, -1);
  sentenceEl.textContent = sentence;
}

function resetScreen() {
  sentence = "";
  sentenceEl.textContent = sentence;
  decemal = false;
}

function calculate() {
  if (!isFinite(lastChar)) return;
  try {
    const result = eval(sentence);
    sentence = "";
    sentenceEl.textContent = result;
  } catch (error) {
    sentenceEl.textContent = "Error";
    console.log(error);
  }
}

function handleDisplaying(el) {
  const mathEl = el.textContent;
  lastChar = sentence.slice(-1);

  if (el.classList.contains("btn-delete")) return removeLastChar();
  if (el.classList.contains("btn-reset")) return resetScreen();
  if (el.classList.contains("btn-equal")) return calculate();

  if (sentence.length >= 15) return;

  if (el.classList.contains("btn-operation")) return displayOperator(mathEl);
  if (el.classList.contains("zero")) return displayZero(mathEl);
  if (el.classList.contains("decemal")) return displayDot(mathEl);

  display(mathEl);
}

keyPad.addEventListener("click", function (e) {
  if (!e.target || e.target.classList.contains("key-pad")) return;

  handleDisplaying(e.target);
});

window.addEventListener("load", (e) => {
  preloader.style.display = "none";
});
