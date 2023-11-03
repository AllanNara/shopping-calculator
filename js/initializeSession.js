import UserSession from "./classes/UserSession.js";
import storage from "./helpers/storage.js";

storage("save", "session")("saveUser", true)
const [ flag, user ] = UserSession.getInstance()

if(flag) {
  document.getElementById("initializedCash").checked = user._useCashFlag;
  console.log({useCash: user._useCashFlag})
	if(user._useCashFlag) document.getElementById("currentCash").innerText = `$${user.availableCash}`;
  console.log({available: user.availableCash})
  document.getElementById("totalExpenses").innerText = `$${user.toPay}`;
  console.log({toPay: user.toPay})
}