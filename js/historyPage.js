import initializeSession from "./initializeSession.js";
import "./events/userEvents.js"
import storage from "./helpers/storage.js";

initializeSession()
const lastCanceled = storage("get", "session")("lastCanceled");
console.log({lastCanceled})


