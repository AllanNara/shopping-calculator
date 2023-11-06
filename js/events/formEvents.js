import { resetForm, discountChanged, addProduct } from "./function/form.js";

const checkboxs = Array.from(document.getElementsByClassName("typeDiscount"));
const form = document.getElementById("form-product");
const cleaningBtn = document.getElementById("clean-btn")

checkboxs.forEach((checkbox) => checkbox.addEventListener("change", discountChanged));
form.addEventListener("submit", addProduct);
cleaningBtn.addEventListener("click", resetForm)
