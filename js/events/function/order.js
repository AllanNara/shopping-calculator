import UserSession from "../../classes/UserSession.js";
import storage from "../../helpers/storage.js";

const user = UserSession.getInstance()[1]

export function cancelOrder() {
  const next = confirm("¿Estas seguro que deseas cancelar la orden?");
  if(next) {
    const canceled = user.closeOrder(false);
    storage("save", "session")("lastCanceled", canceled);
    window.location.reload()
  }
}

export function generateTicket() {
  const next = confirm("¿Confirmar orden?");
  if(next) {
    const orders = storage("get", "local")("orders") || [];
    const finished = user.closeOrder();
    orders.push(finished)
    storage("save", "local")("orders", orders)
    alert("¡Orden generada con exito!")
    window.location.reload()
  }
}

export function changeStore(e) {
  if(e.key === "Enter") {
    user.store = e.target.value
    document.getElementById("store-name").innerText = user.currentStore
    e.target.value = ""
  }
}