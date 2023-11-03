import UserSession from "../classes/UserSession.js";
import discountChanged from "../helpers/discountFields.js";
import { removeError, sendError } from "../helpers/errors.js";
import generateProduct from "../helpers/generateProduct.js";
import { resetForm } from "../helpers/reset.js";

const [ flag, user ] = UserSession.getInstance()
const form = document.getElementById("formProduct");
const checkboxs = Array.from(document.getElementsByClassName("typeDiscount"));

form.addEventListener("submit", (e) => {
	e.preventDefault();
  const useCash = document.getElementById("initializedCash");
	const currentCash = document.getElementById("currentCash");
	const expenses = document.getElementById("totalExpenses");
	try {
		removeError()
		const item = generateProduct()
		user.addProductToOrder(item);
		expenses.innerText = `$${user.toPay}`;
		if (useCash.checked) currentCash.innerText = `$${user.availableCash}`;
		resetForm(form, checkboxs)
	} catch (error) {
		sendError(error)
	}
});

checkboxs.forEach((checkbox) => {
	checkbox.addEventListener("change", discountChanged)
});

document.getElementById("cleanBtn").addEventListener("click", () => resetForm(form, checkboxs))
