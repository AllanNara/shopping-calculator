import UserSession from "../../classes/UserSession.js";
import storage from "../../helpers/storage.js";
import { alertConfirmAction, inputGeneric } from "../../utils/alerts.js";

const user = UserSession.getInstance()[1];

export async function resetSession() {
	const reset = await alertConfirmAction("resetear el usuario", "La informacion, como tickets de compras e historial no se podrán recuperar")
	if(reset) {
		storage("save", "session")("saveUser", false);
		window.location.reload()
	}
}
export function saveSession() {
	if(user.order.coupon[0]) {
		user.order.coupon[0]._applied = false
	} 
  const saveUser = storage("get", "session")("saveUser")
  if(saveUser) storage("save", "local")("userData", user)
  else storage("delete", "local")("userData", user)
}

export async function updateName(update) {
	const newName = await inputGeneric("Ingrese su nombre")
	console.log({newName})
	if(update && !newName) return
	user.username = newName ?? "usuario"
	document.getElementById("username").innerText = user.username
}