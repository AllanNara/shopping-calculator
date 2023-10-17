import UserSession from "./classes/UserSession.js";

const user = new UserSession();
sessionStorage.setItem("currentUser", JSON.stringify(user));
let orders = JSON.parse(localStorage.getItem("orders"));
// console.log({orders});

if (!orders) orders = [];
let typeDiscount = null;
let generalDiscount = null;

const useCash = document.getElementById("initializedCash");
const inputCash = document.getElementById("availableCash");
const currentCash = document.getElementById("currentCash");

const expenses = document.getElementById("totalExpenses");

useCash.addEventListener("change", (e) => {
	if (!e.target.checked) {
		inputCash.setAttribute("disabled", "");
		inputCash.value = null;
		user.changeInitializedCashFlag();
		currentCash.innerText = "$ ...";
	} else {
		inputCash.removeAttribute("disabled");
		user.changeInitializedCashFlag();
		currentCash.innerText = `$${user.availableCash}`;
	}
});

inputCash.addEventListener("keydown", ({ key, target }) => {
	if (key === "Enter") {
		const cash = Number(target.value);
		if (isNaN(cash) || !cash) {
			alert("Valor invalido");
		} else {
			const confirmCash = confirm(`Tu saldo inicial es de ${target.value}, es correcto?`);
			if (confirmCash) {
				user.updateCash(cash);
				currentCash.innerText = `$${user.initialCash}`;
			}
		}
		target.value = null;
	}
});

const form = document.getElementById("formProduct");
const boxElements = document.getElementsByClassName("typeDiscount");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	let name = document.getElementById("nameProd").value;
	let category = document.getElementById("category").value;
	let price = document.getElementById("price").value;
	let quantity = document.getElementById("quantity").value;
	const discountSetting = setDiscount();
	const producto = { name, category, price, quantity };
	user.currentOrder.addProductToCart(producto, discountSetting);
	user.updateToPay();	
	console.dir(user.current);
	const productos = JSON.parse(localStorage.getItem("orders"));
	// console.log({productos});
});

const checkboxs = Array.from(boxElements);

checkboxs.forEach((checkbox) => {
	checkbox.checked = false;
	checkbox.addEventListener("change", function ({ target }) {
		if (target.checked) typeDiscount = target.id;
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

const setDiscount = () => {
	let discountSetting = {};
	switch (typeDiscount) {
		case "0":
			discountSetting.discountType = "percentage";
			discountSetting.discountCondition = null;
			discountSetting.discount = document.getElementById("discount0").value;
			break;
		case "1":
			discountSetting.discountType = "percentPerQ";
			discountSetting.discountCondition = document.getElementById("condition1").value;
			discountSetting.discount = document.getElementById("discount1").value;
			break;
		case "2":
			discountSetting.discountType = "inXUnity";
			discountSetting.discountCondition = document.getElementById("condition2").value;
			discountSetting.discount = document.getElementById("discount2").value;
			break;
		case "3":
			discountSetting.discountType = "pricePerQ";
			discountSetting.discountCondition = document.getElementById("condition3").value;
			discountSetting.discount = document.getElementById("discount3").value;
			break;
		default:
			discountSetting.discountType = "none";
			break;
	}

	return discountSetting;
};
