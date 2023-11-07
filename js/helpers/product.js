import { setProductName } from "./index.js";
import storage from "./storage.js";

export function generateProduct() {
	let name = document.getElementById("product-name").value;
	let category = document.getElementById("category").value;
	let price = Number(document.getElementById("price").value);

	const product = { name: setProductName(name), category, price };
	const discount = setDiscount();
	let quantity = Number(document.getElementById("quantity").value);

	return validateItem({ product, discount, quantity });
}

function setDiscount() {
	const type = storage("get", "session")("discount")
	let discountSetting = {};
	switch (type) {
		case "0":
			discountSetting.discountType = "percentage";
			discountSetting.discountCondition = null;
			discountSetting.discount = Number(document.getElementById("discount0").value);
			break;
		case "1":
			discountSetting.discountType = "percentPerQ";
			discountSetting.discountCondition = Number(document.getElementById("condition1").value);
			discountSetting.discount = Number(document.getElementById("discount1").value);
			break;
		case "2":
			discountSetting.discountType = "inXUnity";
			discountSetting.discountCondition = Number(document.getElementById("condition2").value);
			discountSetting.discount = Number(document.getElementById("discount2").value);
			break;
		case "3":
			discountSetting.discountType = "pricePerQ";
			discountSetting.discountCondition = Number(document.getElementById("condition3").value);
			discountSetting.discount = Number(document.getElementById("discount3").value);
			break;
		default:
			discountSetting.discountType = "none";
			break;
	}

	return discountSetting;
}

function validateItem({ product, discount, quantity }) {
	if (!product || !discount || !product.name.trim() || !product.category) {
		throw new Error("Debe completar los campos con información");
	}

	const areNumbers = [product.price, quantity];

	if (discount.discountType !== "none") areNumbers.push(discount.discount);
	if (["percentPerQ", "inXUnity", "pricePerQ"].includes(discount.discountType)) {
		areNumbers.push(discount.discountCondition);
	}
	for (let i = 0; i < areNumbers.length; i++) {
		if (areNumbers[i] <= 0)
			throw new Error("Precio, cantidad y descuentos deben ser mayores a 0");
		if (typeof areNumbers[i] !== "number" || isNaN(areNumbers[i]))
			throw new Error("Por favor, verifique que la información sea valida");
		continue;
	}

	return { product, discount, quantity }
}