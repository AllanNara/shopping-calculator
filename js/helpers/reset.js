import { disableDiscountFields } from "./discountFields.js";
import { removeError } from "./errors.js";

export default function cleanAll() {
	removeError()
	disableDiscountFields({ reset: true })
	document.getElementById("formProduct").reset()
	document.getElementById("initializedCash").checked = false
	document.getElementById("availableCash").setAttribute("disabled", "");
}

export function resetForm(form, checkboxs) {
	const existDiscount = checkboxs.find((element) => element.checked === true)
	if(existDiscount) disableDiscountFields({ reset: true })
	form.reset()
}
