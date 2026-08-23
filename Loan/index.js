/* Lendwell design: interactive illustrative loan estimate with immediate, transparent repayment updates. */
const amountRange = document.getElementById("amount-range");
const termRange = document.getElementById("term-range");
const amountOutput = document.getElementById("amount-output");
const termOutput = document.getElementById("term-output");
const monthlyOutput = document.getElementById("monthly-output");
const monthsOutput = document.getElementById("months-output");
const totalOutput = document.getElementById("total-output");
const interestOutput = document.getElementById("interest-output");

const money = new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency: "ZAR",
  maximumFractionDigits: 0,
});

function setRangeProgress(input) {
  const minimum = Number(input.min);
  const maximum = Number(input.max);
  const value = Number(input.value);
  const progress = ((value - minimum) / (maximum - minimum)) * 100;
  input.style.setProperty("--range-progress", `${progress}%`);
}

function updateEstimate() {
  const principal = Number(amountRange.value);
  const months = Number(termRange.value);
  const monthlyRate = 0.129 / 12;
  const monthlyPayment = principal * (monthlyRate * (1 + monthlyRate) ** months) / ((1 + monthlyRate) ** months - 1);
  const total = monthlyPayment * months;
  const totalInterest = total - principal;
  const years = months / 12;

  amountOutput.value = money.format(principal);
  termOutput.value = years === 1 ? "1 year" : `${years} years`;
  monthlyOutput.textContent = money.format(monthlyPayment);
  monthsOutput.textContent = `${months} months`;
  totalOutput.textContent = money.format(total);
  interestOutput.textContent = money.format(totalInterest);
  setRangeProgress(amountRange);
  setRangeProgress(termRange);
}

amountRange.addEventListener("input", updateEstimate);
termRange.addEventListener("input", updateEstimate);
updateEstimate();
