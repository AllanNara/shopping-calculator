import UserSession from "./classes/UserSession.js";
import cleanAll from "./helpers/reset.js";
import storage from "./helpers/storage.js";

cleanAll();

import "./events/user.js"
import "./events/cash.js"
import "./events/form.js"
import "./events/test.js"
import "./initializeSession.js"

// document.getElementById("initializedCash").checked = true

window.addEventListener('beforeunload', () => {
  const [ flag, user ] = UserSession.getInstance()
  const saveUser = storage("get", "session")("saveUser")
  if(saveUser) storage("save", "local")("userData", user)
  else storage("delete", "local")("userData", user)
});