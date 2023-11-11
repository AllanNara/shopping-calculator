import "./events/userEvents.js"
import storage from "./helpers/storage.js";
import { updateName } from "./events/function/user.js";

import UserSession from "./classes/UserSession.js";
import { cancelOrder } from "./events/function/order.js";
import { alertConfirmAction } from "./utils/alerts.js";

const [ flag, user ] = UserSession.getInstance()

storage("save", "session")("saveUser", true);
const existSession = storage("get", "session")("client");

export default async function initializeSession() {
  if(!flag) updateName()
  if(flag && !existSession) {
    document.getElementById("username").innerText = user.username
    const existCart = user.order.totalItems;
    if(existCart > 0) {
      const orderPrev = await alertConfirmAction("¿Desea recuperar el ultimo carrito pendiente?", "", true);
      if(!orderPrev) await cancelOrder(true);
    }
  }
  if(existSession) {
    document.getElementById("username").innerText = user.username
  } else {
    storage("save", "session")("client", true);
  }
}

initializeSession()

