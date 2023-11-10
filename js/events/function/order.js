import UserSession from "../../classes/UserSession.js";
import storage from "../../helpers/storage.js";
import { alertConfirmAction, alertSuccessResponse } from "../../utils/alerts.js";

const user = UserSession.getInstance()[1]

export async function cancelOrder(force = false) {
  if(!force) {
    const next = await alertConfirmAction("cancelar la orden")
    if(!next) return
  }
  const canceled = user.closeOrder(false);
  storage("save", "session")("lastCanceled", canceled);
  if(!force) await alertSuccessResponse("Orden cancelada")
  window.location.reload()
}

export async function generateTicket() {
  const next = await alertConfirmAction("confirmar la orden", "Recuerde que una vez finalizada no podra volver a hacer cambios en la misma")
  if(next) {
    const orders = storage("get", "local")("orders") || [];
    const finished = user.closeOrder();
    orders.push(finished)
    storage("save", "local")("orders", orders)
    await alertSuccessResponse("¡Orden generada con exito!")
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
