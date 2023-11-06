import UserSession from "../../classes/UserSession.js";
import storage from "../../helpers/storage.js";

export function resetSession() {
	const reset = confirm("Estas seguro que desea resetear su usuario? \n La informacion, como tickets de compras e historial no se podrán recuperar")
	if(reset) {
		storage("save", "session")("saveUser", false);
		window.location.reload()
	}
}
export function saveSession() {
	const user = UserSession.getInstance()[1];
	if(user.order.coupon[0]) {
		user.order.coupon[0]._applied = false
	} 
  const saveUser = storage("get", "session")("saveUser")
  if(saveUser) storage("save", "local")("userData", user)
  else storage("delete", "local")("userData", user)
}