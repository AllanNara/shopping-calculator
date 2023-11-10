import initializeSession from "./initializeSession.js";
import setUserForm from "./helpers/setForm.js";
import "./events/index.js"
import "./events/userEvents.js"
import { updateItemsOrder } from "./helpers/itemsOrder.js";
import { showProducts } from "./helpers/showCart.js";

initializeSession()
setUserForm()
updateItemsOrder()
showProducts()


// import storage from "./helpers/storage.js";
// document.getElementById("asdfg").addEventListener("click", () => {
//   storage("delete", "session")("saveUser")
//   storage("delete", "session")("client")
//   storage("delete", "session")("discount")
//   storage("delete", "session")("lastCanceled")
//   storage("delete", "local")("userData")
//   storage("delete", "local")("orders")
//   window.location.reload()
// })

import "./utils/toasty.js"
import "./utils/alerts.js"
