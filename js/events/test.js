import { removeError } from "../helpers/errors.js";
import generateFakeProduct from "../helpers/mocks/mocking.js";

document.getElementById("testing").addEventListener("click", () => {
	removeError()
	generateFakeProduct()
})