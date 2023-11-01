import UserSession from "./classes/UserSession.js";
import cleanAll from "./helpers/reset.js";
import storage from "./helpers/storage.js";

cleanAll()

const orders = storage("get", "local")("orders") || [];
let lastOrderCanceled = storage("get", "session")("lastCanceled") || null;


window.addEventListener('beforeunload', () => {
  storage("set", "local")("currentUser", UserSession.instance)
});