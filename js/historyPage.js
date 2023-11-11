import "./initializeSession.js"
import storage from "./helpers/storage.js";

const lastCanceled = storage("get", "session")("lastCanceled");
console.log({lastCanceled})