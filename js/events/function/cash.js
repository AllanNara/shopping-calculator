import UserSession from "../../classes/UserSession.js";

export function useCash(arg) {
	let checked = arg.constructor.name !== "Event" ? arg : arg.target.checked;
	const user = UserSession.getInstance()[1];
	const inputCash = document.getElementById("input-cash");
	const currentCash = document.getElementById("current-cash");
	if (!checked) {
		if(arg.constructor.name !== "Event") {
			document.getElementById("use-cash").checked = false
		} 
		if(user._initialCash) {
			const next = confirm("¿Esta seguro que desea retirar su saldo inicial?")
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
		currentCash.innerText = `$${user.availableCash}`;
	}
	user._changeUseCashFlag(checked);
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
				const balance = user.addCash(cash);
				if(!balance) useCash(false);
				else currentCash.innerText = `$${user.availableCash}`;
			}
		}
	}
}
