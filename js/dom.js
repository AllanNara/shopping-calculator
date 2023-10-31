import UserSession from "./classes/UserSession.js";
import {
	disableDiscountFields,
	enableDiscountsFields,
	resetFields,
	setDiscount,
	validateItem,
} from "./helpers/index.js";

let user = JSON.parse(sessionStorage.getItem("currentUser")) || new UserSession()
let orders = JSON.parse(localStorage.getItem("orders")) || [];

let typeDiscount = null;

const useCash = document.getElementById("initializedCash");
const inputCash = document.getElementById("availableCash");
const currentCash = document.getElementById("currentCash");

useCash.addEventListener("change", (e) => {
	if (!e.target.checked) {
		inputCash.setAttribute("disabled", "");
		inputCash.value = null;
		user._changeUseCashFlag();
		currentCash.innerText = "$ ...";
	} else {
		inputCash.removeAttribute("disabled");
		user._changeUseCashFlag();
		currentCash.innerText = `$${user.availableCash}`;
	}
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
				currentCash.innerText = `$${user.initialCash}`;
			}
		}
		target.value = null;
	}
});

const form = document.getElementById("formProduct");
const boxElements = document.getElementsByClassName("typeDiscount");
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
		expenses.innerText = `$${user.currentOrder.TOTAL}`;
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

form.addEventListener("keyup", (e) => {
	if (!existError) return;
	const errorMsg = document.getElementById("product").firstElementChild;
	errorMsg.removeAttribute("class");
	errorMsg.innerText = "";
});

const checkboxs = Array.from(boxElements);

checkboxs.forEach((checkbox) => {
	checkbox.checked = false;
	checkbox.addEventListener("change", function ({ target }) {
		if (target.checked) {
			typeDiscount = target.id;
			enableDiscountsFields(typeDiscount);
		} else {
			typeDiscount = null;
			disableDiscountFields(typeDiscount);
		}
		checkboxs.forEach((box) => {
			let getThisId = box.getAttribute("id");
			if (target.checked && getThisId !== target.id) {
				box.setAttribute("disabled", "");
			} else {
				box.removeAttribute("disabled");
			}
		});
	});
});
