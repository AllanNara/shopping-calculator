import UserSession from "../../classes/UserSession.js";
import { alertConfirmAction, alertError } from "../../utils/alerts.js";
import { numberToPriceString } from "../../utils/index.js";
import { toastInfo } from "../../utils/toasty.js";

export async function useCash(arg) {
	let checked = arg.constructor.name !== "Event" ? arg : arg.target.checked;
	const user = UserSession.getInstance()[1];
	const inputCash = document.getElementById("input-cash");
	const currentCash = document.getElementById("current-cash");
	if (!checked) {
		if(arg.constructor.name !== "Event") {
			document.getElementById("use-cash").checked = false
		} 
		if(user._initialCash) {
			const next = await alertConfirmAction("retirar el saldo inicial")
			if(!next) {
				document.getElementById("use-cash").checked = true;
				return
			}
		}
		inputCash.setAttribute("disabled", "");
		inputCash.value = null;
		currentCash.innerText = "$ ...";
	} else {
		inputCash.removeAttribute("disabled");
		inputCash.value = 0;
		currentCash.innerText = `${numberToPriceString(user.availableCash)}`;
	}
	await user._changeUseCashFlag(checked);
	checked ? toastInfo("Saldo habilitado") : toastInfo("Saldo removido");
}

export async function insertCash(event) {
	const user = UserSession.getInstance()[1];
	const currentCash = document.getElementById("current-cash");
	if (event.key === "Enter") {
		event.preventDefault()
		const cash = Number(event.target.value);
		event.target.value = 0
		if (isNaN(cash) || !cash) {
			await alertError("Valor invalido")
		} else {
			const balance = await user.addCash(cash);
			if(!balance) useCash(false);
			else currentCash.innerText = `${numberToPriceString(user.availableCash)}`;
		}
	}
}
