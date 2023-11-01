export function removeError() {
	const errorMsg = document.getElementById("product").firstElementChild;
	errorMsg.removeAttribute("class");
	errorMsg.innerText = "";
}

export function sendError(error) {
	const errorMsg = document.getElementById("product").firstElementChild;
	errorMsg.className = "errorMsg";
	errorMsg.innerText = error.message;
}
