import storage from "./storage.js";

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
			storage("save", "session")("discount", null)
		}
	}
}

export function enableDiscountsFields() {
	disableDiscountFields();
	const type = storage("get", "session")("discount")
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

export default function discountChanged({ target }) {
	if (target.checked) {
		storage("save", "session")("discount", target.id)
		enableDiscountsFields();
		for (let i = 0; i < 4; i++) {
			if(target.id === `${i}`) continue
			document.getElementById(`${i}`).setAttribute("disabled", "")
		}
	} else {
		disableDiscountFields({ reset: true });
	}
}

