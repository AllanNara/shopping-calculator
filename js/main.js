import initializeSession from "./initializeSession.js";
import setUserForm from "./helpers/setForm.js";
import "./events/index.js"
import "./events/userEvents.js"
import storage from "./helpers/storage.js";

initializeSession()
setUserForm()


document.getElementById("asdfg").addEventListener("click", () => {
  storage("delete", "session")("saveUser")
  storage("delete", "session")("discount")
  storage("delete", "session")("client")
  storage("delete", "session")("lastCanceled")
  storage("delete", "local")("userData")
  storage("delete", "local")("orders")
  window.location.reload()
})


console.log(storage("get", "session")("lastCanceled"))
console.log(storage("get", "local")("orders"))

