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
      document.getElementById("input-cash").removeAttribute("disabled");
      document.getElementById("input-cash").value = 0;
      document.getElementById("current-cash").innerText = `$${user._initialCash ? user.availableCash : 0}`;
    }
    document.getElementById("total-expenses").innerText = `$${user.toPay}`;

    if(user.order.generalDiscount) {
      document.getElementById("discount-general").innerText = user.order.generalDiscount;
      document.getElementById("btn-remove-disc").classList.remove("hidden")
    }
    if(user.order.coupon[0]) {
      document.getElementById("exists-coupon").innerText = "Cupon por: "
      document.getElementById("coupon").innerText = "$" + Number(user.order.coupon[0].discount).toLocaleString();
      document.getElementById("btn-remove-coupon").classList.remove("hidden")
    }
    console.log(user)
  }
}