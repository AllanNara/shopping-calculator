import UserSession from "../../classes/UserSession.js";
import storage from "../../helpers/storage.js";

const user = UserSession.getInstance()[1];

export function resetSession() {
	const reset = confirm("Estas seguro que desea resetear su usuario? \n La informacion, como tickets de compras e historial no se podrán recuperar")
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

export function updateName(update) {
	const newName = prompt("Ingrese su nombre")
	if(update && !newName) return
	if(!newName || !/^(?=[a-zA-Z0-9._]{2,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(newName)) return alert("Nombre invalido")
	user.username = newName
	document.getElementById("username").innerText = user.username
}