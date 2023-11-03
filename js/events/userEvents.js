import UserSession from "../classes/UserSession.js";
import storage from "../helpers/storage.js";

document.getElementById("reset-session").addEventListener("click", () => {
	const reset = confirm("Estas seguro que desea resetear su usuario? \n La informacion, como tickets de compras e historial no se podrán recuperar")
	if(reset) {
		storage("save", "session")("saveUser", false);
		window.location.reload()
	}
})

window.addEventListener('beforeunload', () => {
	const user = UserSession.getInstance()[1];
  const saveUser = storage("get", "session")("saveUser")
  if(saveUser) storage("save", "local")("userData", user)
  else storage("delete", "local")("userData", user)
});