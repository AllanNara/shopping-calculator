import discountChanged from "../helpers/discountFields.js";
import addProduct from "../helpers/product.js";
import { resetForm } from "../helpers/reset.js";

const checkboxs = Array.from(document.getElementsByClassName("typeDiscount"));
const form = document.getElementById("form-product");
const cleaningBtn = document.getElementById("clean-btn")

checkboxs.forEach((checkbox) => checkbox.addEventListener("change", discountChanged));
form.addEventListener("submit", addProduct);
cleaningBtn.addEventListener("click", resetForm)
