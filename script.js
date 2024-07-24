const amountInput = document.querySelector(".amount-input-wrapper input");
const termInput = document.querySelector(".term-input-wrapper input");
const rateInput = document.querySelector(".rate-input-wrapper input");
const repaymentTypeInput = document.querySelector(".repayment-wrapper input");
const interestTypeInput = document.querySelector(".interest-wrapper input");

const inputsArr = [amountInput, termInput, rateInput];

const amountInputWrapper = document.querySelector(".amount-input-wrapper");
const termInputWrapper = document.querySelector(".term-input-wrapper");
const rateInputWrapper = document.querySelector(".rate-input-wrapper");
const typeWrapper = document.querySelector(".type-wrapper");

const inputWrapperArr = [
  amountInputWrapper,
  termInputWrapper,
  rateInputWrapper,
];


typeWrapper.addEventListener("click", ()=> {
  if(repaymentTypeInput.checked) {
    document.querySelector(".repayment-wrapper label").classList.add("checked")
    document.querySelector(".interest-wrapper label").classList.remove("checked")
  } else if(interestTypeInput.checked) {
    document.querySelector(".interest-wrapper label").classList.add("checked")
    document.querySelector(".repayment-wrapper label").classList.remove("checked")
  } 
})

// CLEAR BUTTON CLICKED ON
document.querySelector(".clear-btn").addEventListener("click", () => {
  inputsArr.forEach((input) => (input.value = "")); // clear all inputs value
  repaymentTypeInput.checked = false;
  interestTypeInput.checked = false;
});

// CALCULATE BUTTON CLICKED ON
document.querySelector(".calculate-btn").addEventListener("click", () => {
  let isValid = "";
  inputsArr.forEach((input, i) => {
    if (input.value == "") {
      inputWrapperArr[i].classList.add("error"); // if inputs have no value -> add error
      isValid = false;
    } else {
      inputWrapperArr[i].classList.remove("error"); // remove error
      isValid = true;
    }
    if (
      repaymentTypeInput.checked == false &&
      interestTypeInput.checked == false
    ) {
      typeWrapper.classList.add("error"); // if type radio input not checked -> add eror
      isValid = false;
    } else {
      typeWrapper.classList.remove("error"); // remove error
      isValid = true;
    }
    if (input.value < 1) {
      inputWrapperArr[i].classList.add("error"); // if input's' value smaller than 1 -> add error
      isValid = false;
    }
  });
  if (isValid) {
    calculateMortgage();
    document.querySelector(".empty-result").style.display = "none";
    document.querySelector(".completed-result").style.display = "initial";
  }
});

function calculateMortgage() {
  const loanAmount = amountInput.value;
  const interestRate = rateInput.value / 100 / 12; // convert to monthly insterest
  const loanTerm = termInput.value * 12; // convert to months

  let monthlyPayment;
  if (repaymentTypeInput.checked) {
    // repayment formula
    monthlyPayment =
      (loanAmount * (interestRate * Math.pow(1 + interestRate, loanTerm))) /
      (Math.pow(1 + interestRate, loanTerm) - 1);
  } else if (interestTypeInput.checked) {
    // interest-only formula
    monthlyPayment = loanAmount * interestRate;
  } else {
    // handle invalid mortgage type
    console.error("Invalid mortgage type!");
    return;
  }

  const formattedPayment = monthlyPayment.toFixed(2);
  const totalRepayment = monthlyPayment * loanTerm;
  const formattedTotalRepayment = totalRepayment.toFixed(2);

  const resultElement = document.querySelector(".large-number");
  resultElement.textContent = Number(formattedPayment).toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
  }); 

  const totalRepaidElement = document.querySelector(".medium-number");
  totalRepaidElement.textContent = Number(
    formattedTotalRepayment
  ).toLocaleString("en-GB", {
    style: "currency",
    currency: "GBP",
  });
}
