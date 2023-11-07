import storage from "./helpers/storage.js";
import { updateName } from "./events/function/user.js";

import UserSession from "./classes/UserSession.js";
import { cancelOrder } from "./events/function/order.js";
const [ flag, user ] = UserSession.getInstance()

storage("save", "session")("saveUser", true);
const existSession = storage("get", "session")("client");

export default function initializeSession() {
  if(!flag) updateName()
  if(flag && !existSession) {
    const existCart = user.order.totalItems;
    if(existCart > 0) {
      const orderPrev = confirm("¿Desea recuperar el ultimo carrito pendiente?");
      if(!orderPrev) cancelOrder();
    }
  }
  if(existSession) {
    document.getElementById("username").innerText = user.username
  } else {
    storage("save", "session")("client", true);
  }
}

