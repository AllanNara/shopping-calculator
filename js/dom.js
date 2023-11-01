import UserSession from "./classes/UserSession.js";
import {
	disableDiscountFields,
	enableDiscountsFields,
	resetFields,
	setDiscount,
	validateItem,
} from "./helpers/index.js";
import generateFakeProduct from "./helpers/mocking.js";

// const existDiscount = checkboxs.find((element) => element.checked === true)

disableDiscountFields({ reset: true })


let user = JSON.parse(sessionStorage.getItem("currentUser")) || new UserSession()
let orders = JSON.parse(localStorage.getItem("orders")) || [];

let typeDiscount = null;

const useCash = document.getElementById("initializedCash");
const inputCash = document.getElementById("availableCash");
const currentCash = document.getElementById("currentCash");

document.getElementById("testing").addEventListener("click", () => {
	generateFakeProduct()
})


document.addEventListener("DOMContentLoaded", (e) => {
	useCash.checked = false
	inputCash.setAttribute("disabled", "");
	const buttons = Array.from(document.getElementsByClassName("btn"))
	buttons.forEach(btn => {
		btn.removeAttribute("disabled")
	})	
})


useCash.addEventListener("change", (e) => {
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

const form = document.getElementById("formProduct");
const expenses = document.getElementById("totalExpenses");
let existError = false;

form.addEventListener("submit", (e) => {
	e.preventDefault();
	let name = document.getElementById("nameProd").value;
	let category = document.getElementById("category").value;
	let price = Number(document.getElementById("price").value);

	const product = { name, category, price };
	const discount = setDiscount(typeDiscount);
	let quantity = Number(document.getElementById("quantity").value);

	const item = { product, discount, quantity };

	try {
		validateItem(item);
		user.addProductToOrder(item);
		expenses.innerText = `$${user.currentOrder.TOTAL.toLocaleString()}`;
		if (useCash.checked) currentCash.innerText = `$${user.availableCash}`;
	} catch (error) {
		existError = true;
		const errorMsg = document.getElementById("product").firstElementChild;
		errorMsg.className = "errorMsg";
		errorMsg.innerText = error.message;
	}
	resetFields(typeDiscount);
	typeDiscount = null;
});

form.addEventListener("keyup", () => {
	if (!existError) return;
	const errorMsg = document.getElementById("product").firstElementChild;
	errorMsg.removeAttribute("class");
	errorMsg.innerText = "";
});

const checkboxs = Array.from(document.getElementsByClassName("typeDiscount"));
checkboxs.forEach((checkbox) => {
	checkbox.addEventListener("change", function ({ target }) {
		if (target.checked) {
			typeDiscount = target.id;
			enableDiscountsFields(typeDiscount);
			for (let i = 0; i < 4; i++) {
				if(target.id === `${i}`) continue
				document.getElementById(`${i}`).setAttribute("disabled", "")				
			}
		} else {
			typeDiscount = null;
			disableDiscountFields({ reset: true });
		}
	});
});

document.getElementById("cleanBtn").addEventListener("click", (e) => {
	const existDiscount = checkboxs.find((element) => element.checked === true)
	if(existDiscount) disableDiscountFields({ reset: true })
})