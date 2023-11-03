import UserSession from "../classes/UserSession.js";

export function useCash(e) {
	const user = UserSession.getInstance()[1];
	const inputCash = document.getElementById("input-cash");
	const currentCash = document.getElementById("current-cash");
	if (!e.target.checked) {
		inputCash.setAttribute("disabled", "");
		inputCash.value = null;
		currentCash.innerText = "$ ...";
	} else {
		inputCash.removeAttribute("disabled");
		inputCash.value = 0;
		currentCash.innerText = `$${user.availableCash}`;
	}
	user._changeUseCashFlag(e.target.checked);
}

export function insertCash({ key, target }) {
	const user = UserSession.getInstance()[1];
	const currentCash = document.getElementById("current-cash");
	if (key === "Enter") {
		const cash = Number(target.value);
		if (isNaN(cash) || !cash) {
			alert("Valor invalido");
		} else {
			const confirmCash = confirm(
				`Tu saldo inicial es de ${cash.toLocaleString()}, ¿Es correcto?`
			);
			if (confirmCash) {
				user.addCash(cash);
				currentCash.innerText = `$${user.availableCash}`;
			}
		}
	}
}
