import UserSession from "../classes/UserSession.js";

export default function updateExpenses() {
  const user = UserSession.getInstance()[1];
  const expenses = document.getElementById("total-expenses");
	expenses.innerText = `$${user.toPay}`;
  const checkboxUseCash = document.getElementById("use-cash");
  const currentCash = document.getElementById("current-cash");
  if (checkboxUseCash.checked && user._initialCash) currentCash.innerText = `$${user.availableCash}`;
}