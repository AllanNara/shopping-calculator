import UserSession from "../classes/UserSession.js";

const useCash = document.getElementById("initializedCash");
const inputCash = document.getElementById("availableCash");

const user = UserSession.getInstance()

useCash.addEventListener("change", (e) => {
	const currentCash = document.getElementById("currentCash");
	if (!e.target.checked) {
		inputCash.setAttribute("disabled", "");
		inputCash.value = null;
		currentCash.innerText = "$ ...";
	} else {
		inputCash.removeAttribute("disabled");
		currentCash.innerText = `$${user.availableCash.toLocaleString()}`;
	}
	user._changeUseCashFlag(e.target.checked);
});

inputCash.addEventListener("keydown", ({ key, target }) => {
	const currentCash = document.getElementById("currentCash");
	if (key === "Enter") {
		const cash = Number(target.value);
		if (isNaN(cash) || !cash) {
			alert("Valor invalido");
		} else {
			const confirmCash = confirm(
				`Tu saldo inicial es de ${target.value}, ¿Es correcto?`
			);
			if (confirmCash) {
				user.addCash(cash);
				currentCash.innerText = `$${user.availableCash.toLocaleString()}`;
			}
		}
		target.value = null;
	}
});

