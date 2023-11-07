import { resetSession, saveSession, updateName } from "./function/user.js";

document.getElementById("reset-session").addEventListener("click", resetSession);
document.getElementById("edit-username").addEventListener("click", updateName)
window.addEventListener('beforeunload', saveSession);

