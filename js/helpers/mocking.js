import { generateFakeCartProduct } from "../testing/utils/createMockProduct.js";
import { disableDiscountFields, enableDiscountsFields } from "./index.js";

const discountList = ["percentage", "percentPerQ", "inXUnity", "pricePerQ", "none"];
const categoryList = [
  "no-percederos",
  "frutas-verduras",
  "carnes-huevos-lacteos",
  "cereales-legumbres",
  "dulces-gaseosas",
  "cocina",
  "baño",
  "otros",
];
const randomNum = (num) => Math.floor(Math.random() * num);

export default function generateFakeProduct() {
	disableDiscountFields({ reset: true });
	const randomDiscount = randomNum(discountList.length)
	const randomCategory = randomNum(categoryList.length)
	const { discount, product, quantity } = generateFakeCartProduct(null, discountList[randomDiscount], categoryList[randomCategory]);
	document.getElementById("nameProd").value = product.name;
	document.getElementById("category").value = product.category;
	document.getElementById("price").value = product.price;
	document.getElementById("quantity").value = quantity;
	generateFakeDiscount(discount, randomDiscount);
	return randomDiscount.toString()
}

function generateFakeDiscount({ discountType, discount, discountCondition }, indexDiscount) {
  enableDiscountsFields(indexDiscount.toString());
  switch (discountType) {
    case "percentage":
			document.getElementById("0").checked = true;
      document.getElementById("1").checked = false;
			document.getElementById("2").checked = false;
			document.getElementById("3").checked = false;
			document.getElementById("1").setAttribute("disabled", "");
			document.getElementById("2").setAttribute("disabled", "");
			document.getElementById("3").setAttribute("disabled", "");
			document.getElementById("discount0").value = discount;
			break;
		case "percentPerQ":
			document.getElementById("0").checked = false;
			document.getElementById("1").checked = true;
			document.getElementById("2").checked = false;
			document.getElementById("3").checked = false;
      document.getElementById("0").setAttribute("disabled", "");
			document.getElementById("2").setAttribute("disabled", "");
			document.getElementById("3").setAttribute("disabled", "");
			document.getElementById("condition1").value = discountCondition;
			document.getElementById("discount1").value = discount;
			break;
		case "inXUnity":
      document.getElementById("0").checked = false;
			document.getElementById("1").checked = false;
			document.getElementById("2").checked = true;
			document.getElementById("3").checked = false;
			document.getElementById("0").setAttribute("disabled", "");
			document.getElementById("1").setAttribute("disabled", "");
			document.getElementById("3").setAttribute("disabled", "");
			document.getElementById("condition2").value = discountCondition;
			document.getElementById("discount2").value = discount;
			break;
		case "pricePerQ":
      document.getElementById("0").checked = false;
			document.getElementById("1").checked = false;
			document.getElementById("2").checked = false;
			document.getElementById("3").checked = true;
			document.getElementById("0").setAttribute("disabled", "");
			document.getElementById("1").setAttribute("disabled", "");
			document.getElementById("2").setAttribute("disabled", "");
			document.getElementById("condition3").value = discountCondition;
			document.getElementById("discount3").value = discount;
			break;
		default:
      document.getElementById("0").checked = false;
			document.getElementById("1").checked = false;
			document.getElementById("2").checked = false;
			document.getElementById("3").checked = false;
			break;
	}
}
