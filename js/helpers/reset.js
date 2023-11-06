import { disableDiscountFields } from "./discountFields.js";
import { removeError } from "./errors.js";

export default function cleanAll() {
	removeError()
	disableDiscountFields({ reset: true })
	document.getElementById("form-product").reset()
	document.getElementById("use-cash").checked = false
	document.getElementById("input-cash").value = null;
	document.getElementById("input-cash").setAttribute("disabled", "");
}