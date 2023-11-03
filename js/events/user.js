import storage from "../helpers/storage.js";

document.getElementById("reset-session").addEventListener("click", () => {
	storage("save", "session")("saveUser", false)
})