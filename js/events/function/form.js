import { useCash } from "./cash.js";
import UserSession from "../../classes/UserSession.js";
import { removeError, sendError } from "../../helpers/errors.js";
import { disableDiscountFields, enableDiscountsFields } from "../../helpers/discountFields.js";
import { generateProduct } from "../../helpers/product.js";

export function discountChanged({ target }) {
	if (target.checked) {
		storage("save", "session")("discount", target.id)
		enableDiscountsFields();
		for (let i = 0; i < 4; i++) {
			if(target.id === `${i}`) continue
			document.getElementById(`${i}`).setAttribute("disabled", "")
		}
	} else {
		disableDiscountFields({ reset: true });
	}
}

export function addProduct(e) {
	e.preventDefault();
	const user = UserSession.getInstance()[1];

  const checkboxUseCash = document.getElementById("use-cash");
	const currentCash = document.getElementById("current-cash");
		const expenses = document.getElementById("total-expenses");
	try {
		removeError()
		const item = generateProduct()
		const balance = user.addProductToOrder(item);
		expenses.innerText = `$${user.toPay}`;
		if (checkboxUseCash.checked && user._initialCash) currentCash.innerText = `$${user.availableCash}`;
		if(!balance) useCash(false)
		resetForm()
	} catch (error) {
		console.log(error)
		sendError(error)
	}
}

export function resetForm() {
	const checkboxs = Array.from(document.getElementsByClassName("typeDiscount"));
	const existDiscount = checkboxs.find((element) => element.checked === true);
	if(existDiscount) disableDiscountFields({ reset: true });
	document.getElementById("form-product").reset();
}