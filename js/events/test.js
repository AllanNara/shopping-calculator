import generateFakeProduct from "../helpers/mocks/mocking.js";
import cleanAll from "../helpers/reset.js";

document.getElementById("other-test").addEventListener("click", cleanAll)
document.getElementById("testing").addEventListener("click", () => {
	removeError()
	generateFakeProduct()
})