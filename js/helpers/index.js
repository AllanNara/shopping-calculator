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
};


export function resetFields(type) {
	document.getElementById("nameProd").value = "";
	document.getElementById("category").value = "no-percederos";
	document.getElementById("price").value = 0;
	document.getElementById("quantity").value = 0;
	switch(type) {
		case "0":
			document.getElementById("discount0").value = 0;
		case "1":
			document.getElementById("condition1").value = 0;
			document.getElementById("discount1").value = 0;
		case "2":
			document.getElementById("condition2").value = 0;
			document.getElementById("discount2").value = 0;
		case "3":
			document.getElementById("condition3").value = 0;
			document.getElementById("discount3").value = 0;
		default:
			break;
	}
	disableDiscountFields()
}


export function enableDiscountsFields(type) {
	disableDiscountFields()
	switch(type) {
		case "0":
			document.getElementById("discount0").removeAttribute("disabled");
			break
		case "1":
			document.getElementById("condition1").removeAttribute("disabled");
			document.getElementById("discount1").removeAttribute("disabled");
			break
		case "2":
			document.getElementById("condition2").removeAttribute("disabled");
			document.getElementById("discount2").removeAttribute("disabled");
			break
		case "3":
			document.getElementById("condition3").removeAttribute("disabled");
			document.getElementById("discount3").removeAttribute("disabled");
			break
		default:
			break;
	}
}

export function disableDiscountFields() {
	document.getElementById("discount0").setAttribute("disabled", "");
	document.getElementById("condition1").setAttribute("disabled", "");
	document.getElementById("discount1").setAttribute("disabled", "");
	document.getElementById("condition2").setAttribute("disabled", "");
	document.getElementById("discount2").setAttribute("disabled", "");
	document.getElementById("condition3").setAttribute("disabled", "");
	document.getElementById("discount3").setAttribute("disabled", "");
}

export function validateItem({ product, discount, quantity }) {
	if(!product || !discount || !product.name.trim() || !product.category) {
		throw new Error("Debe completar los campos con información")
	} 

	const areNumbers = [product.price, quantity];
	discount.discount && areNumbers.push(discount.discount)
	discount.discountCondition && areNumbers.push(discount.discountCondition)

	for (let i = 0; i < areNumbers.length; i++) {
		if(typeof areNumbers[i] === "number" && !isNaN(areNumbers[i])) continue
		else throw new Error("Por favor, verifique que la información sea valida")
	}
	
	if(!product.price || !quantity) {
		throw new Error("Precio y la cantidad deben ser mayores a 0")
	}
}