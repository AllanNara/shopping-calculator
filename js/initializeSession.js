import UserSession from "./classes/UserSession.js";
import storage from "./helpers/storage.js";
import cleanAll from "./helpers/reset.js";

cleanAll();
storage("save", "session")("saveUser", true)
const [ flag, user ] = UserSession.getInstance()

export default function initializeSession() {
  if(flag) {
    const existCart = user.order.cart.length;

    if(existCart > 0) {
      const orderPrev = confirm("¿Desea recuperar el ultimo carrito pendiente?");
      if(!orderPrev) return user.closeOrder(false);
    }

    document.getElementById("use-cash").checked = user._useCashFlag;
    if(user._useCashFlag) {
      document.getElementById("current-cash").innerText = `$${user.availableCash}`;
      document.getElementById("input-cash").value = 0;
      document.getElementById("input-cash").removeAttribute("disabled");
    }
    document.getElementById("total-expenses").innerText = `$${user.toPay}`;
  }
}