export function setDiscount(type) {
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

export function enableDiscountsFields(type) {
	disableDiscountFields();
	let discount, condition;
	switch (type) {
		case "0":
			discount = document.getElementById("discount0");
			condition = null;
			break;
		case "1":
			discount = document.getElementById("condition1");
			condition = document.getElementById("discount1");
			break;
		case "2":
			discount = document.getElementById("condition2");
			condition = document.getElementById("discount2");
			break;
		case "3":
			discount = document.getElementById("condition3");
			condition = document.getElementById("discount3");
			break;
		default:
			discount = null;
			condition = null;
			break;
	}

	if(discount) {
		discount.removeAttribute("disabled");
		discount.value = 1;
	}

	if(condition) {
		condition.removeAttribute("disabled");
		condition.value = 1;
	}
}

export function disableDiscountFields(props) {
	for (let i = 0; i < 4; i++) {
		const discount = document.getElementById(`discount${i}`);
		discount.setAttribute("disabled", "");
		discount.value = null;
		if (i !== 0) {
			const condition = document.getElementById(`condition${i}`);
			condition.setAttribute("disabled", "");
			condition.value = null;
		}
		if (props && props.reset) {
			document.getElementById(`${i}`).checked = false;
			document.getElementById(`${i}`).removeAttribute("disabled");
		}
	}
}

export function validateItem({ product, discount, quantity }) {
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
}


export function removeError(existError) {
	if (!existError) return;
	const errorMsg = document.getElementById("product").firstElementChild;
	errorMsg.removeAttribute("class");
	errorMsg.innerText = "";
}


export function resetForm(form, checkboxs) {
	const existDiscount = checkboxs.find((element) => element.checked === true)
	if(existDiscount) disableDiscountFields({ reset: true })
	form.reset()
}