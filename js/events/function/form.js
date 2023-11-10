import { useCash } from "./cash.js";
import UserSession from "../../classes/UserSession.js";
import { removeError, sendError } from "../../helpers/errors.js";
import { disableDiscountFields, enableDiscountsFields } from "../../helpers/discountFields.js";
import { generateProduct } from "../../helpers/product.js";
import storage from "../../helpers/storage.js";
import { updateItemsOrder } from "../../helpers/itemsOrder.js";
import { numberToPriceString } from "../../utils/index.js";
import { showProducts } from "../../helpers/showCart.js";
import updateCash from "../../helpers/updateCash.js";
import { toastError, toastSuccess } from "../../utils/toasty.js";

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

export async function addProduct(e) {
	e.preventDefault();
	const user = UserSession.getInstance()[1];

  const checkboxUseCash = document.getElementById("use-cash");
	const currentCash = document.getElementById("current-cash");
	try {
		removeError()
		const item = generateProduct()
		const balance = await user.addProductToOrder(item);
		document.getElementById("canceled-btn").removeAttribute("disabled");
		document.getElementById("generate-ticket-btn").removeAttribute("disabled");
		if (checkboxUseCash.checked && user._initialCash) {
			currentCash.innerText = `${numberToPriceString(user.availableCash)}`;
		}
		if(!balance && checkboxUseCash.checked) useCash(false)
		updateItemsOrder();
		showProducts();
		resetForm();
		updateCash();
		toastSuccess("¡Producto añadido al carrito!")
	} catch (error) {
		sendError(error)
		toastError(error)
	}
}

export function resetForm() {
	const checkboxs = Array.from(document.getElementsByClassName("typeDiscount"));
	const existDiscount = checkboxs.find((element) => element.checked === true);
	if(existDiscount) disableDiscountFields({ reset: true });
	document.getElementById("form-product").reset();
}