import { resetSession, saveSession } from "./function/user.js";

document.getElementById("reset-session").addEventListener("click", resetSession);

window.addEventListener('beforeunload', saveSession);

